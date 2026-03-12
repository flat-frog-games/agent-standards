const https = require('https');
const readline = require('readline');

const targetUrl = process.argv[2];
const clientId = process.env['CF_ACCESS_CLIENT_ID'];
const clientSecret = process.env['CF_ACCESS_CLIENT_SECRET'];

if (!targetUrl) {
    console.error("Missing URL.");
    process.exit(1);
}

const headers = { 'Accept': 'text/event-stream' };
if (clientId && clientSecret) {
    headers['CF-Access-Client-Id'] = clientId;
    headers['CF-Access-Client-Secret'] = clientSecret;
}

let messageEndpoint = null;
const messageQueue = [];

let isClosing = false;

const req = https.get(targetUrl, { headers }, (res) => {
    if (res.statusCode !== 200) {
        console.error(`Initialization error: HTTP ${res.statusCode} from ${targetUrl}`);
        process.exit(1);
    }

    let buffer = "";
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        buffer += chunk;
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
                messageEndpoint = new URL(data, targetUrl).toString();
                while (messageQueue.length > 0) {
                    sendMessage(messageQueue.shift());
                }
            } else if (eventType === 'message' && data) {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.jsonrpc === "2.0") {
                        console.log(data); // Send back to IDE stdio
                    } else {
                        // console.error("Ignored JSON without jsonrpc=2.0:", data);
                    }
                } catch (e) {
                    // console.error("Ignored non-JSON message from SSE:", data);
                }
            }
        }
    });

    res.on('end', () => {
        if (!isClosing) {
            console.error("SSE stream ended unexpectedly.");
            process.exit(1);
        }
    });
});

req.on('error', (e) => {
    console.error("Initialization request error:", e);
    process.exit(1);
});

function sendMessage(msg) {
    if (!messageEndpoint) {
        messageQueue.push(msg);
        return;
    }
    const url = new URL(messageEndpoint);
    const postHeaders = { 'Content-Type': 'application/json' };
    if (clientId && clientSecret) {
        postHeaders['CF-Access-Client-Id'] = clientId;
        postHeaders['CF-Access-Client-Secret'] = clientSecret;
    }
    
    const postReq = https.request({
        method: 'POST',
        hostname: url.hostname,
        port: url.port,
        path: url.pathname + url.search,
        headers: postHeaders
    }, (postRes) => {
        if (postRes.statusCode < 200 || postRes.statusCode >= 300) {
            console.error(`POST error: HTTP ${postRes.statusCode}`);
            // If POST fails, we can't communicate with the server. Exit to break IDE hang.
            process.exit(1);
        }
        // Drain the response to let the socket be reused
        postRes.on('data', () => {});
    });
    
    postReq.on('error', (e) => {
        console.error("POST network error:", e);
        process.exit(1);
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

process.on('SIGINT', () => { isClosing = true; process.exit(0); });
process.on('SIGTERM', () => { isClosing = true; process.exit(0); });
