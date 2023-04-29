import pymysql


def obtener_conexion():
    return pymysql.connect(host='localhost',
                                user='campus',
                                password='campus2023',
                                db='asistente2')