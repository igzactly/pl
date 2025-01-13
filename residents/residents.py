from flask import Blueprint,render_template,request
import json
import residents.residents_model as residents_model
residents=Blueprint("residents",__name__,url_prefix="/residents")

@residents.route("/")
def dashboard():
    return render_template("allresidents.html")

#operations

@residents.route("/addresidents",methods=["POST"])
def addresidents():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    response={"data":residents_model.add(userData["name"],userData["phone"],userData["type"]),"message":"residents Added successfully !"}
    return json.dumps(response)

@residents.route("/updateresidents",methods=["POST"])
def updateresidents():
    data=request.form["postdata"]
    userData=json.loads(data[1:-1])
    response={"data":residents_model.update(userData["id"],userData["name"],userData["phone"],userData["type"]),"message":"residents Updated successfully !"}
    return json.dumps(response)

@residents.route("/getAllresidents",methods=['POST'])
def getAllresidentss():
    response={"data":residents_model.getAllresidents(),"message":"residents fecthed successfully !"}
    return json.dumps(response)

@residents.route("/getresidentsDetails",methods=['POST'])
def getresidentsDetails():
    try:
        data=request.form["postdata"]
        userData=json.loads(data[1:-1])
        response={"data":residents_model.get(userData["id"]),"message":"Got Data Successfully!"}
        return json.dumps(response)
    except Exception as e:
        print(e.message, e.args)
        return False

@residents.route("/disableresidents",methods=['POST'])
def disableresidents():
    return "Disable residents"

@residents.route("/enableresidents",methods=['POST'])
def enableresidents():
    return "Enable residents"

@residents.route("/permanentlyDeleteresidents",methods=['POST'])
def permanentlyDeleteresidents():
    return "Delete  residents"