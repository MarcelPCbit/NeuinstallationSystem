
const checkboxTexts = [
    'Grundinstallation Betriebssystem',
    'Windows Apps updaten',
    'Windowsupdates durchführen',
    'Startmenü und Taskleiste anpassen',
    'Desktopsymbole anlegen (Computer, Benutzerdateien)',
    'Energieeinstellungen bei Netzbetrieb ändern',
    'Erweiterungen bei bekannten Dateitypen nicht ausblenden',
    'Einstellungen>System>Benachrichtigungen>zusätzl. Einstell.>alles deaktivieren',
    'Unnötige Software & Apps entfernen',
    'Unnötige Software aus dem Autostart entfernen',
    'Medienwiedergabe, Wetter, Edge und Fotos starten',
    'Gerätenamen ändern',
    'Windows Aktivieren',
    'PCbit-Verzeichnis kopieren',
    'Adobe Reader installieren und als Standard setzen',
    'Google Earth installieren',
    'IrfanView inkl. Plugins installieren',
    'Mozilla installieren an Taskleiste anheften und als Standard setzen',
    'TeamViewer Installieren',
    'WinRAR Installieren',
    'Office bei Bedarf installieren',
    'Virenschutz bei Bedarf installieren: Eset',
    'Treiber installieren',
    'Neustart und finale Updates',
    'Laufwerke trennen',
    'Drucker deinstallieren',
    'Lautsprecher anschalten und auf 80%',
    'Wiederherstellung konfigurieren auf 20%',
    'Wdh-Pkt. "PCbit Auslieferungszustand" erstellen',
    'Alle Dateien, Ordner und Suchen aus dem Schnellzugriff löschen',
    'PCbit Aufkleber',
    'Installationsdoku einscannen'
];

document.addEventListener('DOMContentLoaded', function() {

    const exportBtn = document.getElementById('exportBtn');

    exportBtn.addEventListener('click', function() {
        window.print();
    });

    // Dynamische Erstellung der Checkboxen
    checkboxTexts.forEach(text => {
        const checkboxElement = createCheckbox(text);
        checkboxesContainer.appendChild(checkboxElement);
    });

    // signature pad
    const canvas = document.getElementById('signature-pad');
    const ctx = canvas.getContext('2d');
    const clearBtn = document.getElementById('clear');

    let writing = false;

    // Linien-Stil definieren
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Startpunkt setzen
    function startPosition(e) {
        writing = true;
        draw(e);
    }

    // Zeichnen beenden
    function finishedPosition() {
        writing = false;
        ctx.beginPath(); // Verhindert, dass Linien miteinander verbunden werden
    }

    // Die Zeichen-Logik
    function draw(e) {
        if (!writing) return;

        // Korrektur der Koordinaten relativ zum Canvas
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    // Pointer Events (Maus & Touch kombiniert)
    canvas.addEventListener('pointerdown', startPosition);
    canvas.addEventListener('pointermove', draw);
    window.addEventListener('pointerup', finishedPosition);

    // Canvas leeren
    clearBtn.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    });

function createCheckbox(text) {
    const container = document.createElement('div');
    container.className = 'checkboxContainer';

    const checkboxDiv = document.createElement('div');
    checkboxDiv.className = 'checkbox';

    const boxSpan = document.createElement('span');
    boxSpan.className = 'material-symbols-outlined';
    boxSpan.textContent = 'check_box_outline_blank';

    const checkSpan = document.createElement('span');
    checkSpan.className = 'material-symbols-outlined hidden';
    checkSpan.textContent = 'select_check_box';

    const textP = document.createElement('p');
    textP.textContent = text;

    checkboxDiv.appendChild(boxSpan);
    checkboxDiv.appendChild(checkSpan);
    container.appendChild(checkboxDiv);
    container.appendChild(textP);

    // Event-Listener für Toggle
    container.addEventListener('click', () => {
        boxSpan.classList.toggle('hidden');
        checkSpan.classList.toggle('hidden');
    });

    return container;
}


