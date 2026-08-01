const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname), {
    maxAge: '1h',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  Boda Obed & Sofia Rendoza`);
    console.log(`  Página:  http://localhost:${PORT}`);
    console.log(`  QR:      http://localhost:${PORT}/qr\n`);
});
