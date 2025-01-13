from flask import Blueprint,render_template,request
import json
import flats.flats_model as flats_model
import location.location_model as location_model
import residents.residents_model as residents_model
flats=Blueprint("flats",__name__,url_prefix="/flats")


@flats.route("/")
def dashboard():
    return render_template("allflats.html")
#operations

@flats.route("/addflats",methods=["POST"])
def addflats():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    response={"data":flats_model.add(userData["name"],userData["occupants"],userData["location"],userData["owner"]),"message":"flats Added successfully !"}
    return json.dumps(response)

@flats.route("/updateflats",methods=["POST"])
def updateflats():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    response={"data":flats_model.update(userData["id"],userData["name"],userData["occupants"],userData["location"],userData["owner"]),"message":"flats Updated successfully !"}
    return json.dumps(response)

@flats.route("/getAllflats",methods=['POST'])
def getAllflats():
    response={"data":flats_model.getAllFlats(),"message":"flats fecthed successfully !"}
    return json.dumps(response)

@flats.route("/getAllBuildings",methods=['POST'])
def getAllBuildings():
    response={"data":location_model.getAllBuilding(),"message":"flats fecthed successfully !"}
    return json.dumps(response)

@flats.route("/getAllOwners",methods=['POST'])
def getAllOwners():
    response={"data":residents_model.getAllOwners(),"message":"flats fecthed successfully !"}
    return json.dumps(response)
@flats.route("/getflatsDetails",methods=['POST'])
def getflatsDetails():
    try:
        data=request.form["postdata"]
        userData=json.loads(data[1:-1])
        print(userData)
        response={"data":flats_model.get(userData["id"]),"message":"Login Successful !"}
        return json.dumps(response)
    except Exception as e:
        print(e.message, e.args)
        return False

@flats.route("/disableflats",methods=['POST'])
def disableflats():
    return "Disable flats"

@flats.route("/enableflats",methods=['POST'])
def enableflats():
    return "Enable flats"

@flats.route("/permanentlyDeleteflats",methods=['POST'])
def permanentlyDeleteflats():
    return "Delete  flats"