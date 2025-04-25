from flask import Flask, request, render_template, send_file, redirect, url_for
import pandas as pd
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
domains_output = "domains.txt"

@app.route('/', methods=['GET', 'POST'])
def upload_files():
    if request.method == 'POST':
        domain_set = set()
        files = request.files.getlist('files')

        for file in files:
            if file and file.filename.endswith('.xlsx'):
                filename = secure_filename(file.filename)
                xls = pd.ExcelFile(file)
                for sheet in xls.sheet_names:
                    df = xls.parse(sheet)
                    if "NOVOS DOMÍNIOS PARA BLOQUEIO" in df.columns:
                        col_data = df["NOVOS DOMÍNIOS PARA BLOQUEIO"].dropna().astype(str).tolist()
                        domain_set.update(col_data)

        # Garante que salvou corretamente
        with open(domains_output, 'w', encoding='utf-8') as f:
            for domain in sorted(domain_set):
                f.write(domain.strip() + '\n')

        # Redireciona para a rota de download
        return redirect(url_for('download_file'))

    return render_template('index.html')


@app.route('/download')
def download_file():
    if os.path.exists(domains_output):
        return send_file(domains_output, as_attachment=True)
    else:
        return "Arquivo não encontrado", 404


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
