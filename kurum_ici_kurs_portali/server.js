// Kurum İçi Yerel Ağ Test Sunucusu
// Sıfır Harici Bağımlılık (Node.js yerleşik modülleri ile çalışır)
const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

// Yerel Ağ IPv4 Adreslerini Tespit Et
function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push({ name, address: iface.address });
      }
    }
  }
  return ips;
}

// Canlı Test Verisi (İki bilgisayarın birbirini anlık görmesi için)
let testData = {
  counter: 0,
  logs: []
};

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS başlıkları (Yerel ağdaki tüm istemcilere izin ver)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const clientIp = req.socket.remoteAddress || req.headers['x-forwarded-for'] || 'Bilinmiyor';
  const urlParts = req.url.split('?');
  const pathname = urlParts[0];

  // API: Durum Kontrolü
  if (pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({
      status: 'OK',
      serverTime: new Date().toLocaleTimeString('tr-TR'),
      clientIp: clientIp,
      ips: getLocalIpAddresses(),
      counter: testData.counter,
      logs: testData.logs.slice(-10)
    }));
    return;
  }

  // API: Eşzamanlılık Testi (Sayaç Artır & Mesaj Bırak)
  if (pathname === '/api/interact' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const payload = JSON.parse(body || '{}');
        testData.counter += 1;
        const logEntry = {
          time: new Date().toLocaleTimeString('tr-TR'),
          from: payload.sender || clientIp,
          action: payload.action || 'Tıklama Yapıldı',
          totalCount: testData.counter
        };
        testData.logs.push(logEntry);
        if (testData.logs.length > 50) testData.logs.shift();

        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, counter: testData.counter, latestLog: logEntry }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Geçersiz veri' }));
      }
    });
    return;
  }

  // Statik Dosyalar (HTML / CSS / JS)
  let safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\') safePath = '/index.html';
  let filePath = path.join(PUBLIC_DIR, safePath);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(PUBLIC_DIR, 'index.html');
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'text/plain; charset=utf-8';
    const content = fs.readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  } catch (err) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 - Sayfa Bulunamadı');
  }
});

server.listen(PORT, '0.0.0.0', () => {
  const localIps = getLocalIpAddresses();
  console.clear();
  console.log('================================================================');
  console.log('   KURUM ICI YEREL AG TEST SUNUCUSU BASARIYLA CALISIYOR!        ');
  console.log('================================================================');
  console.log(' [1] Bu Bilgisayardan Test Etmek Icin:');
  console.log(`     http://localhost:${PORT}`);
  console.log('');
  console.log(' [2] DIGER BILGISAYARLARDAN (Agdaki herhangi bir PC):');
  if (localIps.length === 0) {
    console.log('     Ag baglantisi tespit edilemedi.');
  } else {
    localIps.forEach(ip => {
      console.log(`     -> http://${ip.address}:${PORT}  (${ip.name})`);
    });
  }
  console.log('================================================================');
  console.log(' * Sunucuyu kapatmak icin bu siyah pencereyi kapatabilir veya');
  console.log('   Ctrl + C tuslarina basabilirsiniz.');
  console.log('================================================================');
});
