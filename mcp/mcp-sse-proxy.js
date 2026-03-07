const https = require('https');
const readline = require('readline');

const targetUrl = process.argv[2];
const clientId = process.env['CF_ACCESS_CLIENT_ID'];
const clientSecret = process.env['CF_ACCESS_CLIENT_SECRET'];

if (!targetUrl || !clientId || !clientSecret) {
    console.error("Missing URL or CF Access credentials.");
    process.exit(1);
}

let messageEndpoint = null;
const messageQueue = [];

const req = https.get(targetUrl, {
    headers: {
        'Accept': 'text/event-stream',
        'CF-Access-Client-Id': clientId,
        'CF-Access-Client-Secret': clientSecret
    }
}, (res) => {
    let buffer = "";
    res.on('data', (chunk) => {
        buffer += chunk.toString();
        let i;
        while ((i = buffer.indexOf('\n\n')) >= 0) {
            const block = buffer.slice(0, i);
            buffer = buffer.slice(i + 2);

            const lines = block.split('\n');
            let eventType = 'message';
            let data = '';
            for (const line of lines) {
                if (line.startsWith('event:')) {
                    eventType = line.slice(6).trim();
                } else if (line.startsWith('data:')) {
                    data += line.slice(5).trim();
                }
            }

            if (eventType === 'endpoint') {
                // In MCP SSE, the endpoint event contains the path to POST to.
                messageEndpoint = new URL(data, targetUrl).toString();
                // Flush queued messages now that we have the endpoint
                while (messageQueue.length > 0) {
                    sendMessage(messageQueue.shift());
                }
            } else if (eventType === 'message' && data) {
                console.log(data); // Send back to IDE stdio
            }
        }
    });
});

req.on('error', (e) => {
    console.error("Initialization error:", e);
    process.exit(1);
});

function sendMessage(msg) {
    if (!messageEndpoint) {
        messageQueue.push(msg);
        return;
    }
    const url = new URL(messageEndpoint);
    const postReq = https.request({
        method: 'POST',
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        headers: {
            'Content-Type': 'application/json',
            'CF-Access-Client-Id': clientId,
            'CF-Access-Client-Secret': clientSecret
        }
    });
    postReq.on('error', (e) => {
        console.error("POST error:", e);
    });
    postReq.write(msg);
    postReq.end();
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

rl.on('line', (line) => {
    if (line.trim()) {
        sendMessage(line);
    }
});
