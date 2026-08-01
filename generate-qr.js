const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = process.argv[2] || 'https://boda-obed-sofia.onrender.com';

async function generate() {
    try {
        // QR PNG (alta resolución para impresión)
        await QRCode.toFile(
            path.join(__dirname, 'qr-boda.png'),
            url,
            {
                width: 1000,
                margin: 2,
                color: {
                    dark: '#1A1714',
                    light: '#FFFFFF'
                },
                errorCorrectionLevel: 'H'
            }
        );
        console.log(`QR PNG generado: qr-boda.png`);

        // QR SVG (escalable para impresión perfecta)
        const svg = await QRCode.toString(url, {
            type: 'svg',
            width: 800,
            margin: 2,
            color: {
                dark: '#1A1714',
                light: '#FFFFFF'
            },
            errorCorrectionLevel: 'H'
        });
        fs.writeFileSync(path.join(__dirname, 'qr-boda.svg'), svg);
        console.log(`QR SVG generado: qr-boda.svg`);

        console.log(`\nURL codificada: ${url}`);
        console.log('\nPara regenerar con otra URL:');
        console.log(`  node generate-qr.js https://tu-url-final.onrender.com`);
    } catch (err) {
        console.error('Error:', err);
    }
}

generate();
