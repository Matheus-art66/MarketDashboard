from flask import Blueprint, jsonify
from services.bcb_service import buscar_indicador

indicadores_bp = Blueprint(
    'indicadores',
    __name__
)

@indicadores_bp.route('/api/ipca', methods=['GET'])
def get_ipca():
    try:
        dados = buscar_indicador(433, 12)

        return jsonify(dados)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@indicadores_bp.route('/api/dolar', methods=['GET'])
def get_dolar():
    try:
        dados = buscar_indicador(1, 30)

        return jsonify(dados)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


@indicadores_bp.route('/api/selic', methods=['GET'])
def get_selic():
    try:
        dados = buscar_indicador(432, 10)

        return jsonify(dados)

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500