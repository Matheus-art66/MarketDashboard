from flask import Flask
from flask_cors import CORS

from routes.indicadores import indicadores_bp

app = Flask(__name__)
CORS(app)

app.register_blueprint(indicadores_bp)

if __name__ == '__main__':
    app.run(debug=True, port=5000)