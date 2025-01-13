from flask import Blueprint,render_template,request
import json
import location.location_model as location_model
location=Blueprint("location",__name__,url_prefix="/location")

#page Loaders
@location.route("/")
def dashboard():
    return render_template("alllocations.html")

@location.route("/alllocations")
def alllocations():
    return render_template("alllocations.html")

#operations

@location.route("/addlocation",methods=["POST"])
def addlocation():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    features={"gateNo":userData["gateNo"],"buildingNo":userData["buildingNo"],"wing":userData["wing"],"floors":userData["floors"],"no_of_flats":userData["no_of_flats"]}
    response={"data":location_model.add(userData["name"],userData["ip_address"],userData["type"],features),"message":"location Added successfully !"}
    return json.dumps(response)

@location.route("/updatelocation",methods=["POST"])
def updatelocation():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    features={"gateNo":userData["gateNo"],"buildingNo":userData["buildingNo"],"wing":userData["wing"],"floors":userData["floors"],"no_of_flats":userData["no_of_flats"]}
    response={"data":location_model.update(userData["name"],userData["ip_address"],userData["type"],features,userData["id"]),"message":"location Added successfully !"}
    return json.dumps(response)

@location.route("/getAllLocations",methods=['POST'])
def getAllLocations():
    response={"data":location_model.getAllLocations(),"message":"location fetched successfully !"}
    return json.dumps(response)

@location.route("/getlocationDetails",methods=['POST'])
def getlocationDetails():
    try:
        data=request.form["postdata"]
        userData=json.loads(data[1:-1])
        print(userData)
        response={"data":location_model.get(userData["id"]),"message":"Login Successful !"}
        return json.dumps(response)
    except Exception as e:
        print(e.message, e.args)
        return False
@location.route("/getAllBuildings",methods=['POST'])
def getAllBuildings():
    try:
        location_model.getAllBuildings()
    except Exception as e:
        print(e.message, e.args)
        return False
@location.route("/disablelocation",methods=['POST'])
def disablelocation():
    return "Disable location"

@location.route("/enablelocation",methods=['POST'])
def enablelocation():
    return "Enable location"

@location.route("/permanentlyDeletelocation",methods=['POST'])
def permanentlyDeletelocation():
    return "Delete  location"