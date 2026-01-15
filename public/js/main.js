
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportBtn');

    exportBtn.addEventListener('click', function() {
        window.print();
    });

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

