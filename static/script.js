document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const input = document.getElementById('fileElem');
    const form = document.getElementById('upload-form');

    // Impede múltiplos envios
    let alreadySubmitted = false;

    // Impede comportamento padrão
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, e => e.preventDefault(), false);
    });

    // Destaca área ao arrastar
    dropArea.addEventListener('dragover', () => dropArea.classList.add('highlight'), false);
    dropArea.addEventListener('dragleave', () => dropArea.classList.remove('highlight'), false);
    dropArea.addEventListener('drop', handleDrop, false);

    dropArea.addEventListener('click', () => input.click());

    input.addEventListener('change', () => {
        if (!alreadySubmitted) {
            alreadySubmitted = true;
            form.submit();
        }
    });

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        input.files = files;
        if (!alreadySubmitted) {
            alreadySubmitted = true;
            form.submit();
        }
    }
});
