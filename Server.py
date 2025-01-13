from flask import Flask,render_template,request,json
from flaskext.mysql import MySQL
import admin.admin_model as admin_model
from admin.admin import admin
from location.location import location
from flats.flats import flats
from residents.residents import residents
from visitor_management.visitor_management import visitor_management
import base64
STATIC_FOLDER = 'templates/includes/assets'

#this is a test comment

app = Flask(__name__,static_folder=STATIC_FOLDER)
app.register_blueprint(admin)
app.register_blueprint(location)
app.register_blueprint(residents)
app.register_blueprint(flats)
app.register_blueprint(visitor_management)
mysql = MySQL()
mysql.init_app(app)
#MSQL configurations
app.config['MYSQL_DATABASE_USER']='root'
app.config['MYSQL_DATABASE_PASSWORD']=''
app.config['MYSQL_DATABASE_DB']='v_m_s_v_1_0_0'
app.config['MYSQL_DATABASE_HOST']='localhost'


@app.route('/')
@app.route('/login')
def login():
	return render_template("login.html")


@app.route('/doLogin',methods=['POST'])
def doLogin():
	try:
		data=request.form["postdata"]
		userData=json.loads(data[1:-1])
		response={"data":admin_model.doLogin(userData["loginType"], userData["userId"], userData["pass"]),"message":"Login Successful !"}
		print(userData)
		return json.dumps(response)
	except Exception as e:
		print(e.message, e.args)
		return False
	
if(__name__=='__main__'):
	app.run(debug=True)
