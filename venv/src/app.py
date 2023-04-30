from flask import Flask

from config import config

from routers.auth import routers_auth

from dotenv import load_dotenv
from flask import Flask

from flask_cors import CORS

from flask_sslify import SSLify



app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True )

sslify = SSLify(app)

app.register_blueprint(routers_auth, url_prefix="/api")

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.run(host="10.32.34.58")
