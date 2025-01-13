import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    query="select id,name,ip_address,features,type from locations where id = '{}'"
    cur.execute(query.format(id))
    return cur.fetchone()
        
def getAllBuilding():
    try:
        query="select id,name from locations where type=1"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False


def getAllLocations():
    try:
        query="select id,name,ip_address,type from locations"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False
def add(name,ip,l_type,features):
    try:
        query="insert into locations(name,ip_address,features,type) values('{}','{}','{}','{}')"
        cur.execute(query.format(name,ip,json.dumps(features),l_type))
        return True
    except Exception as e:
        return False
        print(e.args)

def delete():
    return None
def permamentDelete():
    return None
def restore():
    return None
def update(name,ip,l_type,features,id):
    try:
        query="update locations set name='{}',ip_address ='{}',features='{}' ,type= '{}' where id='{}'"
        cur.execute(query.format(name,ip,json.dumps(features),l_type,id))
        return True
    except Exception as e: 
        print(e.args)
    
