const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;
// ==== Volume=====
const dataFilePath = '/apps/data/counter.txt';

const server = http.createServer((req, res) => {
  
    if (req.url === '/healthz') {
        res.statusCode = 200;
        res.end('OK');
        return;
    }

    if (req.url === '/') {
        let count = 0;
        try {
            if (fs.existsSync(dataFilePath)) {
                count = parseInt(fs.readFileSync(dataFilePath, 'utf8')) || 0;
            }
            count++;

            fs.writeFileSync(dataFilePath, count.toString());

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain; charset=utf-8');
            res.end(`Привіт! Це simple-app.\nЛічильник відвідувань: ${count}\nДані збережено у Volume.\n`);
        } catch (err) {
            res.statusCode = 500;
            res.end(`Помилка запису у Volume: ${err.message}`);
        }
        return;
    }

    res.statusCode = 404;
    res.end('Not Found');
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Сервер запущено на порту ${port}`);
});
