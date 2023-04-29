from jwt import encode, decode
from jwt import exceptions
from os import getenv
from datetime import datetime , timedelta
from flask import jsonify

def expire_data(days: int):
    now = datetime.now()
    new_date = now + timedelta(days)
    return new_date


def write_token(data : dict):
    token = encode(payload={**data, "exp": expire_data(2)}, key=str(getenv("SECRET")), algorithm="HS256")

    return token.encode("UTF-8")

def validar_token(token, output=False):
    try:
        if output:
            return decode(token, key=str(getenv("SECRET")), algorithms=["HS256"])
        decode(token, key=str(getenv("SECRET")), alogorithms=["HS256"])
    except exceptions.DecodeError:
        response = jsonify({"message":"Invalid Token"})
        response.status_code = 401
        return response

    except exceptions.ExpiredSignatureError:
        response = jsonify({"message":"Token Expired"})
        response.status_code = 401
        return response