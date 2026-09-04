const overlay = document.getElementById("popupmenu_hinzugfuegen");
const openbtn = document.getElementById("open_webbutton");
const closebtn = document.getElementById("closemodel");
const overlayedit = document.getElementById("popupmenu_edit");
const openbtnedit = document.getElementById("editbutton");
const closebtnedit = document.getElementById("closeedit");
const editmenuid = document.getElementById("popupmenu_edit")
let serverListe = [];
let urlinputhinzu = document.getElementById("urlinputhinzufuegen");
let nameinputhinzu = document.getElementById("nameinputhinzufuegen");
let hinzufuegenbuttonjaa = document.getElementById("hinzufuegenbuttonja");

let urlinputeditt = document.getElementById("urlinputedit");
let nameinputeditt = document.getElementById("nameinputedit");
let editbuttonjaa = document.getElementById("editbuttonja");



openbtn.addEventListener("click", () => overlay.classList.add("open"));
closebtn.addEventListener("click", () => overlay.classList.remove("open"));
overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.classList.remove("open");
});
//openbtnedit.addEventListener("click", () => overlayedit.classList.add("openedit"));
if (closebtnedit) {
    closebtnedit.addEventListener("click", () => overlayedit.classList.remove("openedit"));
}
overlayedit.addEventListener("click", (e) => {
    if (e.target === overlayedit) overlayedit.classList.remove("openedit");
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
        overlay.classList.remove("open");
    }
    if (e.key === "Escape" && overlayedit.classList.contains("openedit")) {
        overlayedit.classList.remove("openedit");
    }
});

function edit(id) {
    overlayedit.classList.add("openedit")
}

hinzufuegenbuttonjaa.addEventListener("click", () => {
    const url = urlinputhinzu.value.trim();
    const name = nameinputhinzu.value.trim();

    if (url === "" || name === "") {
        showPopup("Füge zuerst die Daten ein");
        return;
    }

    const daten = {url: url, name: name};

    fetch("http://localhost:3000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(daten)
    })
    .then(response => response.json())
    .then(data => {
        // Erst nachdem die Daten in der Datenbank sind:
        aktualisierungallee();
        removeclasss();
    })
    .catch(error => console.error('Fehler:', error));
});

async function ladeServerListe() {
const response = await fetch('http://localhost:3000');
const server = await response.json();
serverListe = server;

const tabelle = document.querySelector('.server_liste');
tabelle.innerHTML = ''; // Alte Zeilen löschen

server.forEach(s => {
    const zeile = document.createElement('tr');
    const statusclass = (s.status === "online") ? "online": "offline"
    const datum = new Date(s.aktualisierung);
    const formatiert = datum.toLocaleString('de-DE');
// z.B. "02.09.2026"
    zeile.innerHTML = `
        <td>${s.name}</td>
        <td>${s.url}</td>
        <td class= "${statusclass}">${s.status ?? '-'}</td>
        <td class= "fehler_hidden">${s.fehler ?? '-'}</td>
        <td>${s.ping ?? '-'} ms</td>
        <td><a href="${s.url}" target="_blank">Öffnen</a></td>
        <td>${formatiert ?? '-'}</td>
        <td><button class="edit_button" onclick="edit(${s.id})">Edit</button></td>
        <td><button class="custom_aktualisieren" onclick="aktualisierungalle() ">Aktualisieren</button></td>
    `;
tabelle.appendChild(zeile);
});
}

// Beim Laden der Seite automatisch ausführen
document.addEventListener('DOMContentLoaded', ladeServerListe);

// "Aktualisieren"-Button oben auf der Seite
document.getElementById('button_aktualisiseren')
.addEventListener('click', ladeServerListe);


function aktualisierungalle () {
    ladeServerListe();
    showPopup("Die Serverliste wurde Aktualisiert")

}
function aktualisierungallee () {
    ladeServerListe();
    showPopup("Der Server wurde hinzugefügt")
}
function showPopup(message) {
const popup = document.getElementById('popup');
popup.textContent = message;
popup.classList.add('show');

setTimeout(() => {
    popup.classList.remove('show');
}, 2000);
}


function edit(id) {
const server = serverListe.find(s => s.id === id);
if (!server) return console.error('Server nicht gefunden');

urlinputeditt.value = server.url;
nameinputeditt.value = server.name;
editbuttonjaa.dataset.id = id;

overlayedit.classList.add("openedit");
}

function removeclasss() {
    overlay.classList.remove("open");
    urlinputhinzu.value = "";
    nameinputhinzu.value = "";

}

function hinzufuegenprüfen() {

const feld1 = document.getElementById("urlinputhinzufuegen").value.trim();
const feld2 = document.getElementById("nameinputhinzufuegen").value.trim();


    if (feld1 === "" || feld2 === "") {
        showPopup("Füge zuerst die Daten ein")
        overlay.classList.remove("open");
        return;
    } else {
        aktualisierungallee(); 
    }
}