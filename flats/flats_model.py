import pymysql
import hashlib
from flask import json



db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()
def get(id):
    query="select id,name,owner_id,occupants,location from flats where id = '{}'"
    cur.execute(query.format(id))
    return cur.fetchone()
        



def getAllFlats():
    try:
        query="SELECT f.id,l.name AS 'location_name',o.name,f.name FROM flats f LEFT JOIN  locations l ON l.id=f.location LEFT JOIN residents o ON o.id=f.owner_id"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False
def add(name,occupant,location,owner):
    try:
        query="SELECT features FROM app_config"
        cur.execute(query)
        features=json.loads((cur.fetchone()[0]))
        query="insert into flats(name,owner_id,occupants,location) values('{}','{}','{}','{}')"
        cur.execute(query.format(name,occupant,location,owner))
        return True
    except Exception as e:
        print(e.args)

def delete():
    return None
def permamentDelete():
    return None
def restore():
    return None
def update(id,name,occupant,location,owner):
    try:
        query="update flats set name='{}',occupants='{}',owner_id='{}',location='{}' where id='{}'"
        cur.execute(query.format(name,occupant,owner,location,id))
        return True
    except Exception:
        return False
    
