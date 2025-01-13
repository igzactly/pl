
from email.mime import image
from flask import Blueprint,render_template,request
import json
import time
import flats.flats_model as flats_model
import location.location_model as location_model
import residents.residents_model as residents_model
import visitor_management.visitor_management_model as visitor_management_model
import base64
import os
import uuid

visitor_management=Blueprint("visitor_management",__name__,url_prefix="/visitor")



def newvisitor(data):
    userData=json.loads(data[1:-1])
    response={"data":visitor_management_model.addvisitor(userData["name"],userData["email"],userData["phone"]),"message":"New Visitor submitted successfully !"}
    return json.dumps(response)

@visitor_management.route('/')
@visitor_management.route('/newvisit')
def chopsticks_view(chopstick_id=None):
    return render_template("newVisit.html")

@visitor_management.route('/allvisits')
def allvisits():
    return render_template("allVisits.html")

@visitor_management.route('/allvisitors')
def allvisitors():
    return render_template("allVisitors.html")

@visitor_management.route('/checkstatus')
def checkstatus():
    return render_template("checkstatus.html")

@visitor_management.route("/getstatus",methods=['POST'])
def getstatus():
    response={"data":visitor_management_model.getstatus(),"message":"visits fetched successfully !"}
    return json.dumps(response)

@visitor_management.route("/getallVisits",methods=['POST'])
def getallVisits():
    response={"data":visitor_management_model.getallVisits(),"message":"visits fetched successfully !"}
    return json.dumps(response)

@visitor_management.route("/getallVisitors",methods=['POST'])
def getallVisitors():
    response={"data":visitor_management_model.getallVisitors(),"message":"visitors fetched successfully !"}
    return json.dumps(response)

@visitor_management.route("/getAllBuildings",methods=['POST'])
def getAllBuildings():
    response={"data":location_model.getAllBuilding(),"message":"flats fetched successfully !"}
    return json.dumps(response)

@visitor_management.route("/getAllLocations",methods=['POST'])
def getAllLocations():
    response={"data":location_model.getAllLocations(),"message":"flats fetched successfully !"}
    return json.dumps(response)

@visitor_management.route("/newvisit",methods=["POST"])
def newvisit():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    visitor_info={"vaddress":userData["vaddress"],"name":userData["vname"],"email":userData["vemail"],"phone":userData["vphone"],"resident_phone":userData["resident_phone"],"resident_name":userData["resident_name"],"idProofType":userData["idProofType"],"idProof":userData["idProof"]}
    if(userData["saveVisitorData"]):
        newvisitor(data)
    response={"data":visitor_management_model.add(visitor_info,userData["location"],userData["purpose_of_visit"],userData["visitorPhoto"]),"message":"New Visit submitted successfully !"}
    return json.dumps(response)


@visitor_management.route("/getvisitinfo",methods=["POST"])
def getvisitinfo():
    try:
        data=request.form["postdata"]
        userData=json.loads(data[1:-1])
        print(userData)
        response={"data":visitor_management_model.getvisitinfo(userData["id"]),"message":"Login Successful !"}
        return json.dumps(response)
    except Exception as e:
        print(e.message, e.args)
        return False

@visitor_management.route("/savephoto")
def savephoto():
    photo_base64 = request.args.get('photo_cap')
    header, encoded = photo_base64.split(",", 1)
    binary_data = base64.b64decode(encoded)
    image_name = str(uuid.uuid4())+".jpg"
    photopath = "templates/includes/assets/userdata/visitorimages/"
    with open(os.path.join(photopath,image_name), "wb") as f:
        f.write(binary_data)
    photopath=(photopath+"/"+image_name).replace("templates/includes/","")
    response = {"photoPath":photopath}
    print(response)
    return json.dumps(response)