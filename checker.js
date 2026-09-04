const mysql = require('mysql2/promise');
const fetch = require('node-fetch');




async function getConnection() {
return mysql.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'webserver_status'
});
}

async function measurePing(url) {
const start = Date.now();
try {
await fetch(url, { method: 'HEAD', timeout: 5000 });
return { ping: Date.now() - start, fehler: null };
} catch (error) {
return { ping: null, fehler: error.message };
}
}

async function checkAllUrls() {
const connection = await getConnection();

// Alle Websites holen
const [websites] = await connection.execute('SELECT id, name, url FROM website');

for (const site of websites) {
const { ping, fehler } = await measurePing(site.url);
const status = fehler === null ? 'online' : 'offline';

// Prüfen, ob schon ein Status-Eintrag existiert
const [existing] = await connection.execute(
    'SELECT wid FROM status WHERE wid = ?',
    [site.id]
);

if (existing.length > 0) {
    // Update, falls schon vorhanden
    await connection.execute(
    'UPDATE status SET aktualisierung = NOW(), ping = ?, fehler = ?, status = ? WHERE wid = ?',
    [ping, fehler, status, site.id]
    );
} else {
    // Neu einfügen, falls noch kein Eintrag existiert
    await connection.execute(
    'INSERT INTO status (wid, aktualisierung, ping, fehler, status) VALUES (?, NOW(), ?, ?, ?)',
    [site.id, ping, fehler, status]
    );
}

console.log(`${site.name} (${site.url}) -> ${status} (${ping ?? '-'} ms) ${fehler ? '| Fehler: ' + fehler : ''}`);
}

await connection.end();
}

checkAllUrls();