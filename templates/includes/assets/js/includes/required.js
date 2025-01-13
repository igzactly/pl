function reqLogin(){

  var userId=$('#username').val();
  var userpass=$('#userpass').val();
  ;
  if(!userId){
    showErrorMessage('Please Enter Your User ID !');
    return false;
  }
  if(!userpass){
    showErrorMessage('You did not  enter a password !');
    return false;
  }
  var objArray=new Array();
  var newObj=new Object();
  newObj.userId=userId;
  newObj.pass=userpass;
  objArray.push(newObj);
  var postdata = JSON.stringify(objArray);
	            	blockPage();
					postBack("administrator/doLogin","postdata="+postdata, function(response){
	                    console.log(response);
	                    var json = JSON.parse(response);

	                    if(json.status == true)
	                    {
	                        showSuccessMessage("Authentication Successful! Redirecting...");
	                        window.location = "administrator/adminpage";
	                    }
	                    else {
	                    	unblockPage();
	                        showErrorMessage("Failed to login. " + json.message);
	                        //grecaptcha.reset();
	                    }
	                });


}







