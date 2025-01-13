function validateUser(){

  var userId=$('#userID').val();
  var userpass=$('#userPass').val();
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
					postBack("operator/doLogin","postdata="+postdata, function(response){
	                    console.log(response);
	                    var json = JSON.parse(response);

	                    if(json.status == true)
	                    {
	                        showSuccessMessage("Authentication Successful! Redirecting...");
	                        window.location = "home";
	                    }
	                    else {
	                    	unblockPage();
	                        showErrorMessage("Failed to login. " + json.message);
	                        //grecaptcha.reset();
	                    }
	                });


}
function getCaptcha(){
	postBack("operator/getcaptcha","", function(response){
							console.log(response);
							var json = JSON.parse(response);

							if(json.status == true)
							{
								$('#captcha').attr("src", json.image);
							}
							else {

									//grecaptcha.reset();
							}
					});

}
