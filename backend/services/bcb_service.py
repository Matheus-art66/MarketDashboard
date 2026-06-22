import requests
from datetime import datetime, timedelta

SGS_ULTIMOS_URL = (
    "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados/ultimos/{quantidade}?formato=json"
)

SGS_PERIODO_URL = (
    "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados?formato=json&dataInicial={inicio}&dataFinal={fim}"
)

def buscar_indicador(codigo, quantidade):
    try:

        if codigo == 1:
            hoje = datetime.now()
            inicio = hoje - timedelta(days=30)

            url = SGS_PERIODO_URL.format(
                codigo=codigo,
                inicio=inicio.strftime("%d/%m/%Y"),
                fim=hoje.strftime("%d/%m/%Y")
            )

        else:
            url = SGS_ULTIMOS_URL.format(
                codigo=codigo,
                quantidade=quantidade
            )

        response = requests.get(url, timeout=10)
        response.raise_for_status()

        dados = response.json()

        if not dados:
            raise Exception("Nenhum dado retornado pelo Banco Central")

        return dados

    except requests.exceptions.Timeout:
        raise Exception("Tempo de resposta do Banco Central excedido")

    except requests.exceptions.ConnectionError:
        raise Exception("Não foi possível conectar ao Banco Central")

    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao consultar Banco Central: {str(e)}")