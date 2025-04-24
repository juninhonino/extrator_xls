# Extrator de Domínios de Planilhas Excel

Este projeto é uma aplicação web simples feita com Flask para extrair automaticamente os domínios da coluna **NOVOS DOMÍNIOS PARA BLOQUEIO** de arquivos Excel (.xlsx). Os domínios extraídos são salvos em um arquivo `.txt`, um por linha.

## Funcionalidades

- Upload de múltiplos arquivos `.xlsx`
- Suporte a múltiplas abas por arquivo
- Interface amigável com arrastar e soltar
- Geração de um único arquivo `domains.txt` com todos os domínios encontrados

## Requisitos

- Python 3.7+
- pip

## Instalação

1. Clone o repositório ou baixe os arquivos.
2. Instale as dependências:

```bash
pip install -r requirements.txt
```

3. Execute o app:

```bash
python app.py
```

4. Acesse em seu navegador:

```
http://127.0.0.1:5000
```

## Estrutura de Pastas

```
extrator-dominios/
│
├── app.py
├── requirements.txt
├── README.md
├── /templates
│   └── index.html
└── /static
    └── style.css
```

## Autor

Desenvolvido com ❤️ por Selmar Junior