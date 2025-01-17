import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    query="select a.id, a.name,a.email,a.phone, pg.priv_id from admin a inner join privilege_group pg on a.privilege_id = pg.priv_id where a.id = '{}'"
    cur.execute(query.format(id))
    return cur.fetchone()
        


def doLogin(loginType,name,password):
    try:
        # password = hashlib.md5(bytes(password),encoding='utf-8')
        result = bytes(password,'utf-8')
        query="select * from admin where email='"+name+"' or phone  ='"+name+"'  and password=MD5('"+password+"')"
        print(query)
        cur.execute(query)
        output = cur.fetchall()
        print(output)
        if(len(output)<1):
            return False
        else:
            return get(output[0][0])
    except Exception as e:
        print(e.args)
        return False
def getAllAdmin():
    try:
        query="select a.id, a.name, pg.priv_name from admin a inner join privilege_group pg on a.privilege_id = pg.priv_id"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception as error:
        return str(error)
def add(name,phone,email,privilege_id):
    try:
        defaultPass="abcd1234"
        query="insert into admin(name,phone,email,password,privilege_id) values('{}','{}','{}',(SELECT MD5('{}')),'{}')"
        cur.execute(query.format(name,phone,email,defaultPass,privilege_id))
        return True
    except Exception as e:
        print(e.args)

def delete():
    return None
def permamentDelete():
    return None
def restore():
    return None
def update(id,name,phone,email,privilege_id):
    try:
        query="update admin set name='{}',phone ='{}',email='{}',privilege_id='{}' where id='{}'"
        cur.execute(query.format(name,phone,email,privilege_id,id))
        return True
    except Exception:
        return False
    

    #Privilege Group Functions

def addPrivilegeGroup(name,privilegeBits):
    try:
        query="insert into privilege_group(name,privilege_bits) values('{}','{}')"
        cur.execute(query.format(name,privilegeBits))
        return True
    except Exception as e:
        print(e.args)

def getAllPrivilegeGroups():
    try:
        query="select id,name from privilege_group;"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False

def getAllActivePrivilegeGroups():
    try:
        query="select priv_id,priv_name from privilege_group where priv_disabled = 0"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False
    
def getPrivilegeGroupDetails(id):
    query="select id,name,privilege_bits from privilege_group where id = '{}'"
    cur.execute(query.format(id))
    return cur.fetchone()

def updatePrivilegeGroup(id,name,privilegeBits):
    try:
        query="update privilege_group set name='{}',privilege_bits ='{}' where id='{}'"
        print(query.format(name,privilegeBits,id))
        cur.execute(query.format(name,privilegeBits,id))
        return True
    except Exception:
        return False