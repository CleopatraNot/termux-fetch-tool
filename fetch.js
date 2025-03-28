const fetch = require('node-fetch');

async function fetchData(url) {
    try {
        const response = await fetch(url);
        const text = await response.text();
        console.log(decodeURIComponent(text)); // Otomatis decode hasilnya
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function decodeText(encodedText) {
    try {
        console.log(decodeURIComponent(encodedText));
    } catch (error) {
        console.error('Error decoding text:', error);
    }
}

const args = process.argv.slice(2);

if (args.length > 1) {
    const command = args[0];
    const value = args[1];

    if (command === 'fetch') {
        fetchData(value);
    } else if (command === 'decode') {
        decodeText(value);
    } else {
        console.log('Perintah tidak dikenali. Gunakan "fetch" atau "decode".');
    }
} else {
    console.log('Gunakan: node tool.js <command> <value>');
}
