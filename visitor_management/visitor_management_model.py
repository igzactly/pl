import pymysql
import hashlib
from flask import json
from datetime import datetime

db = pymysql.connect(host="localhost",user="root",password="",database="patientlens")
db.autocommit(True)
cur = db.cursor()

def getvisitinfo(id):
    query="SELECT v.visit_id,v.purpose_of_visit,l.name,IF(v.authorized_by=0,'UNAUTHORISED',a.name),v.visitor_info,v.`status`,v.visitor_photo FROM visit v LEFT JOIN locations l ON v.location = l.id  LEFT JOIN admin a ON a.id = v.authorized_by WHERE v.visit_id = {}"
    cur.execute(query.format(id))
    return cur.fetchone()

def getstatus():
    try:
        query=""
        cur.execute(query.format(id))
        output = cur.fetchall()
        return output
    except Exception:
        return False

def getallVisits():
    try:
        query="SELECT v.visit_id,v.purpose_of_visit,l.name,IF(v.authorized_by=0,'UNAUTHORISED',a.name),v.visitor_info,v.`status`,v.visitor_photo FROM visit v LEFT JOIN locations l ON v.location = l.id  LEFT JOIN admin a ON a.id = v.authorized_by"
        #query="select visit_id,purpose_of_visit,location,authorized_by,resident_id,status from visit order by in_time desc"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False

def getallVisitors():
    try:
        query="select visitor_id,name,phone,email from visitors"
        cur.execute(query)
        output = cur.fetchall()
        return output
    except Exception:
        return False

def add(visitor_info,location,purpose_of_visit,visitor_photo):
    try:
        #query="insert into visit(visitor_info,location,purpose_of_visit,visitor_photo) values('{}','{}','{}','"+visitor_photo+"')"
        query="insert into visit(visitor_info,location,purpose_of_visit,visitor_photo) values(%s,%s,%s,%s)"
        
        #print(query.format(json.dumps(visitor_info),location,purpose_of_visit,visitor_photo))
        #cur.execute(query.format(json.dumps(visitor_info),location,purpose_of_visit))
        cur.execute(query,((json.dumps(visitor_info),location,purpose_of_visit,visitor_photo)))
        return True
    except Exception as e:
        print(e.args)

def addvisitor(name,phone,email):
    try:
        query="insert into visitor(name,phone,email) values('{}','{}','{}')"
        cur.execute(query.format(name,phone,email))
        return True
    except Exception as e:
        print(e.args)