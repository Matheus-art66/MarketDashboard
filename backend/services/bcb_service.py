import requests
from datetime import datetime, timedelta

# Endpoint para os últimos registros
SGS_ULTIMOS_URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados/ultimos/{quantidade}?formato=json"

# Endpoint por período para a tratação de erro do dolar.
SGS_PERIODO_URL = "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados?formato=json&dataInicial={inicio}&dataFinal={fim}"

def buscar_indicador(codigo, quantidade):
    try:
        if codigo == 1:
            hoje = datetime.now()
            trinta_dias_atras = hoje - timedelta(days=30)
            
            data_inicio = trinta_dias_atras.strftime("%d/%m/%Y")
            data_fim = hoje.strftime("%d/%m/%Y")
            
            url = SGS_PERIODO_URL.format(codigo=codigo, inicio=data_inicio, fim=data_fim)
        else:
            url = SGS_ULTIMOS_URL.format(codigo=codigo, quantidade=quantidade)

        response = requests.get(url)
        response.raise_for_status()
        return response.json()

    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao consultar Banco Central: {str(e)}")