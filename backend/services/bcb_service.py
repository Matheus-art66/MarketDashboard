import requests

SGS_BASE_URL = (
    "https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados/ultimos/{quantidade}?formato=json"
)

def buscar_indicador(codigo, quantidade):
    try:
        response = requests.get(
            SGS_BASE_URL.format(
                codigo=codigo,
                quantidade=quantidade
            )
        )

        response.raise_for_status()

        return response.json()

    except requests.exceptions.RequestException as e:
        raise Exception(f"Erro ao consultar Banco Central: {str(e)}")