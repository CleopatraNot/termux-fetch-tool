const axios = require('axios');
const fs = require('fs');

async function fetchData(url) {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        console.log('Harap awali URL dengan http:// atau https://');
        return;
    }

    try {
        const response = await axios.get(url, {
            headers: {
                "User-Agent": "Mozilla/5.0"
            },
            responseType: 'arraybuffer'
        });

        const contentType = response.headers['content-type'];
        console.log(`Content-Type: ${contentType}`);

        if (/json/i.test(contentType)) {
            console.log(JSON.parse(response.data.toString('utf8')));
        } else if (/text/i.test(contentType)) {
            console.log(response.data.toString('utf8'));
        } else {
            const ext = contentType.split('/')[1].split(';')[0];
            const filename = `downloaded.${ext}`;
            fs.writeFileSync(filename, response.data);
            console.log(`File disimpan sebagai: ${filename}`);
        }
    } catch (error) {
        console.error(`Terjadi kesalahan: ${error.message}`);
    }
}

const args = process.argv.slice(2);
if (args.length === 0) {
    console.log('Gunakan: node fetch.js <URL>');
} else {
    fetchData(args[0]);
          }
