from flask import Flask, request, render_template, send_file
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
        files = request.files.getlist('files[]')
        for file in files:
            if file and file.filename.endswith('.xlsx'):
                filename = secure_filename(file.filename)
                xls = pd.ExcelFile(file)
                for sheet in xls.sheet_names:
                    df = xls.parse(sheet)
                    if "NOVOS DOMÍNIOS PARA BLOQUEIO" in df.columns:
                        col_data = df["NOVOS DOMÍNIOS PARA BLOQUEIO"].dropna().astype(str).tolist()
                        domain_set.update(col_data)
        with open(domains_output, 'w') as f:
            for domain in sorted(domain_set):
                f.write(domain.strip() + '\n')
        return send_file(domains_output, as_attachment=True)
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
