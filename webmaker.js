document.addEventListener('DOMContentLoaded', (event) => {
    const draggableElements = document.querySelectorAll('.draggable');
    draggableElements.forEach(elem => {
        elem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', e.target.id);
        });
    });

    const dropZone = document.getElementById('drop-zone');
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text');
        const draggableElement = document.getElementById(id);
        dropZone.appendChild(draggableElement);
    });
});
