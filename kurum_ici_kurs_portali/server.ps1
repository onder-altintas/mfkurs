# Kurum Ici Sifir Kurulum Yerel Ag Test Sunucusu
# Standart TCP Socket uzerinde calisir - YONETICI (ADMIN) IZNI GEREKTIRMEZ!

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
Clear-Host

$port = 3000
$publicDir = Join-Path $PSScriptRoot "public"

# Yerel IP Adreslerini Bul
$localIps = [System.Net.Dns]::GetHostAddresses([System.Net.Dns]::GetHostName()) | 
    Where-Object { $_.AddressFamily -eq 'InterNetwork' -and $_.IPAddressToString -notmatch '^127\.' }

Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   KURUM ICI YEREL AG TEST SUNUCUSU CALISIYOR!                  " -ForegroundColor Green
Write-Host "   (Sifir Kurulum & Admin Yetkisi Gerektirmez)                   " -ForegroundColor Yellow
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host " [1] Bu Bilgisayardan Test Etmek Icin:" -ForegroundColor White
Write-Host "     http://localhost:$port" -ForegroundColor Green
Write-Host ""
Write-Host " [2] DIGER BILGISAYARLARDAN (Agdaki herhangi bir PC):" -ForegroundColor White
if ($localIps) {
    foreach ($ip in $localIps) {
        Write-Host "     -> http://$($ip.IPAddressToString):$port" -ForegroundColor Yellow
    }
} else {
    Write-Host "     -> http://localhost:$port" -ForegroundColor Yellow
}
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host " * Sunucuyu kapatmak icin bu pencereyi kapatabilirsiniz." -ForegroundColor Gray
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Canli Senkronizasyon Verisi
$global:counter = 0
$global:logs = [System.Collections.ArrayList]::new()

try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $port)
    $listener.Start()
} catch {
    Write-Host "Port $port baslatilamadi: $_" -ForegroundColor Red
    pause
    exit
}

function Send-HttpResponse {
    param(
        [System.Net.Sockets.NetworkStream]$stream,
        [int]$statusCode,
        [string]$statusText,
        [string]$contentType,
        [byte[]]$bodyBytes
    )
    $headerStr = "HTTP/1.1 $statusCode $statusText`r`n" +
                 "Content-Type: $contentType`r`n" +
                 "Content-Length: $($bodyBytes.Length)`r`n" +
                 "Access-Control-Allow-Origin: *`r`n" +
                 "Access-Control-Allow-Methods: GET, POST, OPTIONS`r`n" +
                 "Access-Control-Allow-Headers: Content-Type`r`n" +
                 "Connection: close`r`n`r`n"
    $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($headerStr)
    $stream.Write($headerBytes, 0, $headerBytes.Length)
    if ($bodyBytes.Length -gt 0) {
        $stream.Write($bodyBytes, 0, $bodyBytes.Length)
    }
    $stream.Flush()
}

while ($true) {
    try {
        $client = $listener.AcceptTcpClient()
    } catch {
        break
    }

    [System.Threading.ThreadPool]::QueueUserWorkItem({
        param($tcpClient)
        try {
            $stream = $tcpClient.GetStream()
            $stream.ReadTimeout = 5000
            $buffer = New-Object byte[] 8192
            $bytesRead = $stream.Read($buffer, 0, $buffer.Length)
            if ($bytesRead -le 0) {
                $tcpClient.Close()
                return
            }

            $requestText = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $bytesRead)
            $lines = $requestText -split "`r`n"
            if ($lines.Length -eq 0) { $tcpClient.Close(); return }

            $reqLineParts = $lines[0] -split " "
            if ($reqLineParts.Length -lt 2) { $tcpClient.Close(); return }

            $method = $reqLineParts[0].ToUpper()
            $rawUrl = $reqLineParts[1]
            $url = ($rawUrl -split "\?")[0]
            $remoteIp = $tcpClient.Client.RemoteEndPoint.ToString() -replace ":\d+$", ""

            # OPTIONS (CORS)
            if ($method -eq "OPTIONS") {
                Send-HttpResponse -stream $stream -statusCode 204 -statusText "No Content" -contentType "text/plain" -bodyBytes @()
                $tcpClient.Close()
                return
            }

            # API: /api/status
            if ($url -eq "/api/status") {
                $statusObj = @{
                    status = "OK"
                    serverTime = (Get-Date).ToString("HH:mm:ss")
                    clientIp = $remoteIp
                    counter = $global:counter
                    logs = $global:logs
                }
                $jsonStr = $statusObj | ConvertTo-Json -Depth 5
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($jsonStr)
                Send-HttpResponse -stream $stream -statusCode 200 -statusText "OK" -contentType "application/json; charset=utf-8" -bodyBytes $bodyBytes
                $tcpClient.Close()
                return
            }

            # API: /api/interact
            if ($url -eq "/api/interact" -and $method -eq "POST") {
                # Body ayrıştır
                $bodyIndex = $requestText.IndexOf("`r`n`r`n")
                $reqBody = ""
                if ($bodyIndex -ge 0) {
                    $reqBody = $requestText.Substring($bodyIndex + 4)
                }
                $sender = $remoteIp
                try {
                    $parsed = $reqBody | ConvertFrom-Json
                    if ($parsed.sender) { $sender = $parsed.sender }
                } catch {}

                $global:counter++
                $logEntry = @{
                    time = (Get-Date).ToString("HH:mm:ss")
                    from = $sender
                    action = "Islem Gonderdi"
                    totalCount = $global:counter
                }
                [void]$global:logs.Add($logEntry)
                if ($global:logs.Count -gt 30) { [void]$global:logs.RemoveAt(0) }

                $reply = @{ success = $true; counter = $global:counter; latestLog = $logEntry } | ConvertTo-Json
                $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($reply)
                Send-HttpResponse -stream $stream -statusCode 200 -statusText "OK" -contentType "application/json; charset=utf-8" -bodyBytes $bodyBytes
                $tcpClient.Close()
                return
            }

            # Statik Dosyalar (index.html vb.)
            $rel = $url.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
            if ([string]::IsNullOrWhiteSpace($rel)) { $rel = "index.html" }
            $filePath = Join-Path $publicDir $rel

            if (-not (Test-Path $filePath -PathType Leaf)) {
                $filePath = Join-Path $publicDir "index.html"
            }

            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $mime = "text/plain"
                switch ($ext) {
                    ".html" { $mime = "text/html; charset=utf-8" }
                    ".css"  { $mime = "text/css; charset=utf-8" }
                    ".js"   { $mime = "application/javascript; charset=utf-8" }
                    ".json" { $mime = "application/json; charset=utf-8" }
                    ".png"  { $mime = "image/png" }
                }
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                Send-HttpResponse -stream $stream -statusCode 200 -statusText "OK" -contentType $mime -bodyBytes $bytes
            } else {
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Bulunamadi")
                Send-HttpResponse -stream $stream -statusCode 404 -statusText "Not Found" -contentType "text/plain; charset=utf-8" -bodyBytes $errBytes
            }
        } catch {
            # Hata yutulur
        } finally {
            try { $tcpClient.Close() } catch {}
        }
    }, $client) | Out-Null
}
