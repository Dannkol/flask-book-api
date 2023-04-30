import pymysql


def obtener_conexion():
    return pymysql.connect(host='containers-us-west-186.railway.app',
                                user='root',
                                password='FjBYcuadpk5oyhfxU24G',
                                db='railway')