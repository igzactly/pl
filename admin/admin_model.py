import pymysql
import hashlib
from flask import json

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    query="select id,name,phone,email,privilege_id,location_access from admin where id = '{}'"
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
        query="select id,name,phone,email from admin where id not in(1)"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False
def add(name,phone,email,privilege_id,location):
    try:
        query="SELECT features FROM app_config"
        cur.execute(query)
        features=json.loads((cur.fetchone()[0]))
        query="insert into admin(name,phone,email,password,privilege_id,location_access) values('{}','{}','{}',(SELECT MD5('{}')),'{}','{}')"
        cur.execute(query.format(name,phone,email,features["defaultAdminPassword"]+phone,privilege_id,location))
        return True
    except Exception as e:
        print(e.args)

def delete():
    return None
def permamentDelete():
    return None
def restore():
    return None
def update(id,name,phone,email,privilege_id,location_access):
    try:
        query="update admin set name='{}',phone ='{}',email='{}',privilege_id='{}',location_access='{}' where id='{}'"
        cur.execute(query.format(name,phone,email,privilege_id,location_access,id))
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
        query="select id,name from privilege_group"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False

def getAllActivePrivilegeGroups():
    try:
        query="select id,name from privilege_group where disabled = 0"
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