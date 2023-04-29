from flask import Blueprint, request
from jwtflask import write_token, validar_token
from flask import jsonify

from db import obtener_conexion




routers_auth = Blueprint("routes_auth", __name__)



@routers_auth.route("/me")
def me_verify():
    token = request.headers['Authorization'].split(" ")[1]
    return validar_token(token , output=True)



@routers_auth.route("/cuidador")
def cuidador_verify():
    token = request.headers['Authorization'].split(" ")[1]
    user = validar_token(token , output=True)
    return user['username']



@routers_auth.route("/login", methods=["post"])
def login_verificar():
    conexion = obtener_conexion()
    users = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT formula_id, nombre, password FROM paciente")
        users = cursor.fetchall()
    conexion.close()
    return login(users)


def login(users):
    data = request.get_json()

    for user in users:
        user_dict = {'id': str(user[0]), 'username': user[1], 'password': user[2]}
        if user[1] == data['username'] and user[2] == data['password']:
            return write_token(data=user_dict)
        
    return jsonify({"message" : "User not found"})


@routers_auth.route("/formula")
def formula_verify():
    token = request.headers['Authorization'].split(" ")[1]
    user = validar_token(token , output=True)
    id = user['id']
    """ SELECT data FROM formula WHERE id= """
    conexion = obtener_conexion()
    users = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT data FROM formula WHERE id={}".format(id))
        users = cursor.fetchall()
    conexion.close()
    return jsonify(users)
