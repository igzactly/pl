/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* This JS File will contain following validations and operational functions 
 
 1. Backspace Key is pressed.
 2. Space Key is pressed.
 3. Tab is pressed.
 4. Whether the the character is HEX.
 5. Whether the character is ALPHABET.
 6. Whether the character is ALPHANUMERIC.
 7. Whether the character is a SPECIAL CHARACTER.
 8. Checks if element is Empty.
 9. Checks if string is valid Mobile No.
 10. Checks if string is valid Email ID.
 11. Checks if string is HEX.
 12. Checks if string is NUMERIC.
 13. Checks if string is ALPHA NUMERIC.
 14. Checks if string has any SPECIAL CHARACTER.
 15. Call Error Message Alerts, Error Pages.
 16. Call Success Message Alerts.
 17. Call Warning Message Alerts.
 18. Blocking & Unblocking Elements.
 19. Redirecting Operators.
 20. Applying Date & Time Pickers on Elements.
 21. Locking Screen
 22. Confirmation Message on Delete action.
 23. Setting default photo. 
 24. Check if 2 elements have same value
 25. Length validations - MIN, MAX, BETWEEN, EQUAL
 26. Case conversions - Captilaze, All Lower case, All Upper Case
 27. Convert Hexadecimal to Integer 
 
 */
var unsaved = false;
$(document).ready(function () {
    //applyVelocity();
    if ($.isFunction($.fn.maxlength)) {
        $('.maxlength').maxlength({
            alwaysShow: true,
            placement: 'centered-right',
            validate: true
        });
    }
    checkUnsavedForms();
});


function loadModal(action){
                  switch(action) {

                     case "Add":
                        $("#actionTb").html("Add ");
                        event ="add";
                        $("#entity_modal").modal('show');
                        break;
                      case "Update":
                        $("#actionTb").html("Update ");
                        event="update";
                        if(getEntityDetails()){
                            $("#entity_modal").modal('show');
                        }
                        break;

                  }
                  
               }

function base64ToBlob(base64, mime) 
{
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
        var slice = byteChars.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
}

function applyPhotoPopup()
{
    $('[data-popup="lightbox"]').fancybox({
        padding: 3
    });
}

function applyVelocity()
{

    $(".sidebar, .navbar, .navbar-brand, .navbar-text, .navbar-nav > li, .page-header, .page-title, .page-header .heading-elements, .breadcrumb, .breadcrumb-elements > li, .content > .panel, .content .row > [class*=col-], .footer")
            .css('opacity', 0);


    Pace.on('done', function () {

        // Layout parts
        $(".navbar, .navbar-brand, .navbar-text, .navbar-nav > li, .page-header, .page-title, .page-header .heading-elements, .breadcrumb, .breadcrumb-elements > li, .content > .panel, .content .row > [class*=col-], .footer")
                .css('opacity', 1)
                .velocity("transition.slideDownIn", {
                    stagger: 100,
                    duration: 150,
                    complete: function (elements) {
                        $(this).removeAttr('style');
                    }
                });


        // Sidebar
        $(".sidebar")
                .css({opacity: 0, borderColor: 'transparent'})
                .velocity("transition.slideUpIn", {
                    delay: 100,
                    duration: 500,
                    display: 'table-cell',
                    complete: function (elements) {
                        $(this).removeAttr('style');
                    }
                });


        // Navigation list on load
        $(".navigation > li")
                .css('opacity', 0)
                .velocity("transition.slideLeftIn", {
                    delay: 500,
                    stagger: 75,
                    duration: 200,
                    complete: function (elements) {
                        $(this).removeAttr('style')
                    }
                });


        // Navigation list on click
        $(".navigation .has-ul").on('click', function () {
            if ($(this).parent('li').hasClass('active')) {
                $(this).next('ul').children('li').css('opacity', 0).velocity("transition.fadeIn", {
                    delay: 150,
                    stagger: 30,
                    duration: 200,
                    complete: function (elements) {
                        $(this).removeAttr('style')
                    }
                });
            } else {
                $(this).next('ul').children('li').css('opacity', 0).velocity("transition.slideLeftOut", {
                    duration: 200,
                    complete: function (elements) {
                        $(this).removeAttr('style')
                    }
                });
            }
        });
    });
}

function checkUnsavedForms()
{
    $(".modal-content input").each(function () { //trigers change in all input fields including text type
        $(this).change(function () {
            unsaved = true;
        });

    });

    $(window).bind('beforeunload', function () {
        // do something, preferably ajax request etc
        if (unsaved) {
            return 'You have unsaved changes on this page. Do you want to close the page and discard your changes or stay on this page?';
        } else
            return;
    });
}

function closeEntityModal()
{
    if (unsaved) {
        swal({
            title: "Are you sure?",
            text: "There are some unsaved changes. Do you want to close the form and discard your changes or stay on this form?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, close it!",
            cancelButtonText: "No, dont close!",
            closeOnConfirm: true,
            closeOnCancel: true
        },
                function (isConfirm) {
                    if (isConfirm) {
                        $('#entity_modal').modal('hide');
                        $("#entity_modal input").each(function () {
                            $(this).val("");
                        });
                        unsaved = false;
                    }
                });
    } else
    {
        $('#entity_modal').modal('hide');
    }
}

function formSaved()
{
    unsaved = false;
}

function isBackspace(charCode)
{
    if (charCode == 8) {
        return true;
    }
    return false;
}
function isSpace(charCode)
{
    if (charCode == 32) {
        return true;
    }
    return false;
}
function isTab(charCode)
{
    if (charCode == 9) {
        return true;
    }
    return false;
}
function isHex(charCode)
{
    if ((charCode >= 65 && charCode <= 70) || (charCode >= 97 && charCode <= 102) || (charCode >= 48 && charCode <= 57)) {
        return true;
    }
    return false;
}
function isAlphabate(charCode)
{
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || isTab(charCode)) {
        return true;
    }
    return false;
}
function isNumeric(charCode)
{
    if ((charCode >= 48 && charCode <= 57) || isTab(charCode)) {
        return true;
    }
    return false;
}
function isAlphaNumeric(charCode)
{
    if ((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || isTab(charCode)) {
        return true;
    }
    return false;
}

function isSpecialCharacter(charCode)
{
    if ((charCode >= 32 && charCode <= 47)) {
        return true;
    }
    return false;
}

function isEmpty(value, message)
{
    if (!message)
        message = "This field is mandatory";

    if (value.length == 0)
    {
        showErrorMessage(message);
        return true;
    } else
    {
        return false;
    }
}

function validateMobileNo(mobileNo, message)
{
    if (!message)
        message = "Not a valid Mobile No";

    var filter = /^[7-9]{1}[0-9]{9}$/;
    if (!filter.test(mobileNo)) {
        showErrorMessage(message);
        return false;
    } else
        return true;
}

function validateEmail(email, message)
{
    if (!message)
        message = "Not a valid Email ID";

    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
        showErrorMessage(message);
        return false;
    } else
        return true;
}

function validatePANCard(pancard, message)
{
    if (!message)
        message = "Not a valid PAN Card";

    var regpan = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
    if (regpan.test(pancard))
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }
}

function isNotANumber(value, message)
{
    if (!message)
        message = "Not a valid value. It should be a number.";

    if (isNaN(value))
    {
        showErrorMessage(message);
        return true;
    } else
    {
        return false;
    }
}

function isHexValue(value)
{
    for (var i = 0; i < value.length; i++) {
        var charCode = value.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 70) || (charCode >= 97 && charCode <= 102) || (charCode >= 48 && charCode <= 57))) {
            return false;
        }
    }
    return true;
}

function isNumericValue(value)
{
    for (var i = 0; i < value.length; i++) {
        var charCode = value.charCodeAt(i);
        if (!(charCode >= 48 && charCode <= 57)) {
            return false;
        }
    }
    return true;
}

function isAlphaNumericValue(value)
{
    for (var i = 0; i < value.length; i++) {
        var charCode = value.charCodeAt(i);
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || (charCode == 32))) {
            return false;
        }
    }
    return true;
}

function isSpecialCharacterValue(value)
{
    for (var i = 0; i < value.length; i++) {
        var charCode = value.charCodeAt(i);
        if (charCode >= 32 && charCode <= 47) {
            return true;
        }
    }
    return false;
}

function showErrorMessage(message)
{
    //$.growl.error({ title: "Whoops !", message: message });
        new PNotify({
        title: 'Oh No!',
        text: message,
        icon: 'icon-blocked',
        type: 'error',

        text_escape: false
    });
}

function showErrorMessagePage(message, json)
{
    var msg;
    if (json.error == "")
        msg = message;
    else
        msg = message + "<button type=button onclick=showErrorPage('" + encodeURIComponent(json.error) + "') class='btn btn-sm btn-link'>Know More</button>";
    new PNotify({
        title: 'Oh No!',
        text: msg,
        icon: 'icon-blocked',
        type: 'error',

        text_escape: false
    });
}
function showErrorPage(error)
{
    var w = window.open();
    w.document.open();
    w.document.write(decodeURIComponent(error));
    w.document.close();
}
function showSuccessMessage(message)
{
    $.growl.notice({ title: "Success !", message: message });
}

function showWarningMessage(message)
{
    new PNotify({
        title: 'Warning',
        text: message,
        icon: 'icon-warning2',
        type: 'success',
        addclass: 'bg-warning',
        text_escape: true
    });
}


function setDefaultOperatorPhoto(id)
{
    $('#' + id).attr("src", "assets/images/operator/nophoto.jpg");
}
function logoff(op)
{
    postBack("AccountOperations", "postdata={operation:" + op + "}", function (json) {
        var jsonobj = JSON.parse(json);
        if (jsonobj.status)
        {
            window.location = "system.jsp";
        }
    });
}
function logout(op)
{
    postBack("AccountOperations", "postdata={operation:" + op + "}", function (json) {
        var jsonobj = JSON.parse(json);
        if (jsonobj.status)
        {
            window.location = "index.jsp";
        }
    });
}
function lockScreen(lock, unlock)
{
    postBack("AccountOperations", "postdata={operation:" + lock + "}", function () {});
    swal({
        title: "Account Locked!",
        text: "Due to inactivity, your account is locked. Please type your password to relogin",
        type: "input",
        inputType: "password",
        showCancelButton: false,
        confirmButtonColor: "#2196F3",
        confirmButtonText: "Login",
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Type your password",
        allowEscapeKey: false,
        showLoaderOnConfirm: true
    },
            function (inputValue) {

                if (inputValue === "")
                {
                    swal.showInputError("Please type your password");
                    return false
                } else
                {
                    var objArray = new Array();
                    var newObj = new Object();
                    newObj.password = '' + CryptoJS.MD5(inputValue);
                    objArray.push(newObj);
                    var postdata = "{operation:" + unlock + ",data:" + JSON.stringify(objArray) + "}";

                    postBack("AccountOperations", "postdata=" + postdata, function (json) {
                        var jsonobj = JSON.parse(json);
                        if (jsonobj.status)
                        {
                            swal({
                                title: "Welcome Back!",
                                type: "success",
                                showConfirmButton: false,
                                timer: 1500
                            });
                            return true;
                        } else
                        {
                            swal.showInputError("Incorect Password");
                            return false;
                        }

                    });
                }
            });
}
function operatorRedirect(status)
{
    if (status == 1)//"UNAUTHERISED"
    {
        window.location = "index.jsp";
        return false;
    } else if (status == 6)//"NO_PRIVILEGE"
    {
        window.location = "home.jsp";
        return false;
    } else if (status == 3)//"ACCOUNT_LOCKED"
    {
        lockScreen();
        return true;
    } else if (status == 4)//"LOGIN"
    {
        return true;
    } else
        return false;
}
function isActiveWindow()
{
    if (document.hasFocus())//||(document.visibilityState=="visible"))
    {
        return true;
    } else
    {
        return false;
    }
}

function confirmDelete(message, handler)
{
    var notice = new PNotify({
        title: 'Confirmation',
        text: '<p>' + message + '</p>',
        hide: false,
        type: 'warning',
        icon: 'icon-warning2',
        confirm: {
            confirm: true,
            buttons: [
                {
                    text: 'Yes',
                    addClass: 'btn-sm btn-success'
                },
                {
                    addClass: 'btn-sm btn-danger'
                }
            ]
        },
        buttons: {
            closer: false,
            sticker: false
        },
        history: {
            history: false
        }
    });

    notice.get().on('pnotify.confirm', handler);
}

function selectAllCheckBox(menu, parent)
{
    var checkboxes = document.getElementsByName(menu);
    for (var i = 0, n = checkboxes.length; i < n; i++) {
        if (parent.checked)
            checkboxes[i].checked = true;
        else
            checkboxes[i].checked = false;
    }
}

function blockForm(element)
{
    $(element).block({
        message: '<span class="text-semibold"><i class="fa fa-cog fa-spin"></i> Please Wait...</span>',
        overlayCSS: {
            backgroundColor: '#8a8a8a',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: '10px 15px',
            color: '#fff',
            width: 'auto',
            '-webkit-border-radius': 2,
            '-moz-border-radius': 2,
            backgroundColor: '#333'
        }
    });
}

function blockPage()
{
    $.blockUI({
        message: '<i class="icon-spinner4 spinner"></i> Please Wait...',
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}

function unblockPage()
{
    $.unblockUI();
}

function unblockForm(element)
{
    $(element).unblock();
}

function applyDatePicker(element)
{
    $(element).datetimepicker({
        closeOnDateSelect: true,
        scrollMonth: false,
        scrollInput: false,
        timepicker: false,
        format: 'Y-m-d',
        formatDate: 'Y-m-d'
    });
}

function applyTimePicker(element)
{
    $(element).datetimepicker({
        datepicker: false,
        format: 'H:i:s'
    });
}

function applyDateTimePicker(element)
{
    $(element).datetimepicker({
        closeOnDateSelect: true,
        scrollMonth: false,
        scrollInput: false,
        timepicker: true,
        format: 'Y-m-d H:i',
        formatDate: 'Y-m-d H:i'
    });
}

function applyDatePickerRange(fromDateElement, toDateElement)
{
    $(toDateElement).datetimepicker({
        closeOnDateSelect: true,
        scrollMonth: false,
        scrollInput: false,
        timepicker: false,
        format: 'Y-m-d',
        formatDate: 'Y-m-d',
        onShow: function (ct) {
            this.setOptions({
                minDate: jQuery(fromDateElement).val() ? jQuery(fromDateElement).val() : false
            })
        }
    });

    $(fromDateElement).datetimepicker({
        closeOnDateSelect: true,
        scrollInput: false,
        scrollMonth: false,
        timepicker: false,
        format: 'Y-m-d',
        formatDate: 'Y-m-d',
        onShow: function (ct) {
            this.setOptions({
                maxDate: jQuery(toDateElement).val() ? jQuery(toDateElement).val() : false
            })
        }
    });
}

function applyDateTimePickerRange(fromDateElement, toDateElement)
{
    $(toDateElement).datetimepicker({
        closeOnDateSelect: true,
        scrollMonth: false,
        scrollInput: false,
        timepicker: true,
        format: 'Y-m-d H:i:s',
        formatDate: 'Y-m-d H:i:s',
        onShow: function (ct) {
            this.setOptions({
                minDate: jQuery(fromDateElement).val() ? jQuery(fromDateElement).val() : false
            })
        }
    });

    $(fromDateElement).datetimepicker({
        closeOnDateSelect: true,
        scrollInput: false,
        scrollMonth: false,
        timepicker: true,
        format: 'Y-m-d H:i:s',
        formatDate: 'Y-m-d H:i:s',
        onShow: function (ct) {
            this.setOptions({
                maxDate: jQuery(toDateElement).val() ? jQuery(toDateElement).val() : false
            })
        }
    });
}

function isEqual(value1, value2, message)
{
    if (!message)
        message = "The values does not match.";

    if (value1.trim() == value2.trim())
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }
}

function isLength(value, length, message)
{
    if (!message)
        message = "The length must be exactly equal to " + length;

    if (value.length == Number(length))
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }
}

function minLength(value, length, message)
{
    if (!message)
        message = "The length cannot be less than " + length;

    if (value.length < Number(length))
    {
        showErrorMessage(message);
        return false;
    } else
        return true;
}

function maxLength(value, length, message)
{
    if (!message)
        message = "The length cannot be more than " + length;

    if (value.length > Number(length))
    {
        showErrorMessage(message);
        return false;
    } else
        return true;
}

function lengthBetween(value, startLength, endLength, message) {

    if (!message)
        message = "The length must be between " + startLength + " and " + endLength;

    if (value.length >= Number(startLength) && value.length <= Number(endLength))
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }

}

function valueBetween(value, minVal, maxVal, message) {

    if (!message)
        message = "The value must be between " + minVal + " and " + maxVal;

    if (value >= Number(minVal) && value <= Number(maxVal))
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }

}

function capitalize(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function allLowerCase(value) {
    return value.toLowerCase();
}

function allUpperCase(value) {
    return value.toUpperCase();
}

function navigateTo(url) {
    window.location.href = url;
}

function validateTime(time, message) {
    if (!message)
        message = "Not a valid Time. It should be in HH:MM:SS format";

    var regpan = /^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/;
    if (regpan.test(time))
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }
}
function resetForm(){
    unsaved=false;
    $('#entityForm').trigger("reset");

}
function validateIPaddress(ipaddress, message) 
{
    if (!message)
        message = "Not a valid IP Address";

 var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

     if(ipaddress.match(ipformat))
        return true;
     else
     {
        showErrorMessage(message);
        return false;
     }
        
     
}

function validateMACaddress(macAddress, message)
{
    if (!message)
        message = "Not a valid MAC Address";

    var macFormat = /^([0-9A-F]{2}[:-]){7}([0-9A-F]{2})$/;

    if (macAddress.match(macFormat))
        return true;
    else
    {
        showErrorMessage(message);
        return false;
    }
}

function convertImageToBase64(element) {  
    var file = element.files[0];  
    var reader = new FileReader();
    var imageString ="";  
    reader.onloadend = function() {  
        imagebase64 = reader.result;  
        imageString=imagebase64;
    }  
    reader.readAsDataURL(file);  
    console.log(imageString);
}  