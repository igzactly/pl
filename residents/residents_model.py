import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    query="select id,name,phone,type from residents where id = '{}'"
    cur.execute(query.format(id))
    return cur.fetchone()
        
def getAllOwners():
    query="select id,name from residents where type=0"
    cur.execute(query.format(id))
    return cur.fetchall()



def getAllresidents():
    try:
        query="select id,name,phone,type from residents"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False
def add(name,phone,r_type):
    try:
        query="insert into residents(name,phone,type) values('{}','{}','{}')"
        cur.execute(query.format(name,phone,r_type))
        return True
    except Exception as e:
        print(e.args)

def delete():
    return None
def permamentDelete():
    return None
def restore():
    return None
def update(id,name,phone,rtype):
    try:
        query="update residents set name='{}',phone ='{}',type='{}' where id='{}'"
        cur.execute(query.format(name,phone,rtype,id))
        return True
    except Exception:
        return False
    
