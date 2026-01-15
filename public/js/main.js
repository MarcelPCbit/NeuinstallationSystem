
document.addEventListener('DOMContentLoaded', function() {
    const exportBtn = document.getElementById('exportBtn');

    exportBtn.addEventListener('click', function() {
        window.print();
    });
});