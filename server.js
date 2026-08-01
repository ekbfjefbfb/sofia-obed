const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname), {
    maxAge: '1h',
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache');
        }
    }
}));

// PDF route - explicit with correct headers
app.get('/pdf', (req, res) => {
    const pdfPath = path.join(__dirname, 'Encuentra tu mesa.pdf');
    if (fs.existsSync(pdfPath)) {
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="Lista de Mesas.pdf"');
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Cache-Control', 'no-cache');
        fs.createReadStream(pdfPath).pipe(res);
    } else {
        res.status(404).send('PDF no encontrado');
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/qr', (req, res) => {
    res.sendFile(path.join(__dirname, 'qr.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n  Boda Obed & Sofia`);
    console.log(`  Página:  http://localhost:${PORT}`);
    console.log(`  QR:      http://localhost:${PORT}/qr`);
    console.log(`  PDF:     http://localhost:${PORT}/pdf\n`);
});
