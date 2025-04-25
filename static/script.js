document.addEventListener('DOMContentLoaded', () => {
    const dropArea = document.getElementById('drop-area');
    const input = document.getElementById('fileElem');
    const progressBar = document.getElementById('progress-bar');
    const statusText = document.getElementById('status-text');

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    dropArea.addEventListener('dragover', () => dropArea.classList.add('highlight'), false);
    dropArea.addEventListener('dragleave', () => dropArea.classList.remove('highlight'), false);
    dropArea.addEventListener('drop', handleDrop, false);
    dropArea.addEventListener('click', () => input.click());

    input.addEventListener('change', () => {
        if (input.files.length > 0) {
            handleUpload(input.files);
        }
    });

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        input.files = files;
        if (files.length > 0) {
            handleUpload(files);
        }
    }

    function handleUpload(files) {
        const formData = new FormData();
        for (let file of files) {
            formData.append('files', file);
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/', true);

        xhr.upload.addEventListener('progress', e => {
            if (e.lengthComputable) {
                const percent = (e.loaded / e.total) * 100;
                progressBar.style.width = percent + '%';
                statusText.textContent = `Enviando... ${Math.round(percent)}%`;
            }
        });

        xhr.onload = () => {
            if (xhr.status === 200) {
                progressBar.style.width = '100%';
                statusText.textContent = 'Concluído! O arquivo foi processado.';
                window.location.href = '/download';
            } else {
                statusText.textContent = 'Erro no envio!';
            }
        };

        progressBar.style.width = '0%';
        statusText.textContent = 'Iniciando envio...';
        xhr.send(formData);
    }
});
