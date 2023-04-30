from flask import Blueprint, request
from jwtflask import write_token, validar_token
from flask import jsonify

from db import obtener_conexion

from flask_cors import cross_origin


routers_auth = Blueprint("routes_auth", __name__)



@routers_auth.route("/me")
@cross_origin(resources={r"/*": {"origins": "*"}}, supports_credentials=True)
def me_verify():
    token = request.headers['Authorization'].split(" ")[1]
    return validar_token(token , output=True)



@routers_auth.route("/cuidador")
@cross_origin(resources={r"/*": {"origins": "*"}}, supports_credentials=True)
def cuidador_verify():
    token = request.headers['Authorization'].split(" ")[1]
    user = validar_token(token , output=True)
    return user['username']



@routers_auth.route("/login", methods=["post"])
@cross_origin(resources={r"/*": {"origins": "*"}}, supports_credentials=True)
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
            jwt = write_token(data=user_dict)
            return jsonify({"jwt" : f"{jwt}" })
        
    return jsonify({"message" : "User not found"})


@routers_auth.route("/formula")
@cross_origin(resources={r"/*": {"origins": "*"}}, supports_credentials=True)
def formula_verify():
    token = request.headers['Authorization'].split(" ")[1]
    user = validar_token(token , output=True)
    
    print(user)

    id = user['id']
   
    """ SELECT data FROM formula WHERE id= """
    conexion = obtener_conexion()
    users = []
    with conexion.cursor() as cursor:
        cursor.execute("SELECT data FROM formula WHERE id=%s", (id,))
        users = cursor.fetchall()
    conexion.close()
    return jsonify(users)
   
    
