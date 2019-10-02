/*
key: Mn_TkqLP19vqytbDY5sihkfUeoPss5KEk

funcs:
getOptions
setPassword
createPassword
getPassword
showPassword
changePassword
*/


// default options
function getOptions(options)
{
  if (!options) {     
    options = {};  
  }
  // defaults
  options.error = options.error || {check: true};
  options.cancelled = options.cancelled || {};
  options.success = options.success || {report: true};
  options.change = options.change || {};
  
  var result =  	
      {
        value: 'test:test', // initial defalult value for saving in User Properties 
        key: options.key || 'a!long"key#that$is%unlikely^to&repeat*in(my)project00.49v6+4/6',
        title: options.title || 'Save your password',
        message: options.message || "Please enter your Username and Password in format: 'username:password'" + '\\n'  + '\\n' +
        "Note. Do it only once, next time script will remember the choice." + '\\n'  + '\\n' +
        "Security note. \\nOnly you will have access to it by script service: User Properties.\\n\\n",
        buttons: options.buttons || Browser.Buttons.OK_CANCEL,
        error: 
        {
        check: options.error.check,
        message: options.error.message || "Wrong format. Please try again. Note: correct format uses semicololon: " +
        "\\n 'username:password'"
      },
      cancelled:
      {
        message: options.cancelled.message || 'Cancelled by a User'
      },
        success:
  {
    report: options.success.report,
      message: options.success.message || ['Username:\\n', '\\n\\nPassword:\\n']			
  },
    change:
  {
    title: options.change.title || 'Changing password',
      message: options.change.message || 'Enter new password for user\\n',
        buttons: options.change.buttons || Browser.Buttons.OK_CANCEL
  },
    showForm: options.showForm
};
return result;
}

// set passwordProgrammatically
function setPassword(options)
{
  PropertiesService.getUserProperties().setProperty(options.key, options.value);
}

// create new password. Assumes that passwort was not entered earlier
function createPassword(options) {
  options = getOptions(options); // use default options or preset...   
  var string = Browser.inputBox(options.title, options.message, options.buttons);  
  if (string == 'cancel') 
  {       
    Browser.msgBox(options.cancelled.message);   
    return -1; // user cancelled operation
  }   
  // check
  if (options.error.check)
  {
    var check = string.match(/\:/);
    if (check == null)
    {
      Browser.msgBox(options.error.message);   
      return -2;  // wrong format      
    }
  }
  var result = string;  
  PropertiesService.getUserProperties().setProperty(options.key, result);  
  if (options.success.report)
  {
    namePass = result.split(':');
    Browser.msgBox(options.success.message[0] + namePass[0] + options.success.message[1] + namePass[1]); 	
  }  
  return result;
}


// get password into script. If no password was found, will prompt for a new password
function getPassword(options)
{
  options = getOptions(options); // use default options or preset... 
  var pass = PropertiesService.getUserProperties().getProperty(options.key);
  if (pass == null && options.showForm) { return createPassword(options); }
  return pass;
}


// show password, remind it to user. If no password was found, will prompt for a new password
function showPassword(options)
{
  options = getOptions(options); // use default options or preset... 
  options.success.report = false; // do not repaet itself
  
  var currentPass = getPassword(options);
  if (currentPass === -1 || currentPass === -2) { return -1; }
  var UserPass = currentPass.split(':');  
  var user = UserPass[0];
  var userPwd = UserPass[1];
  
  Browser.msgBox(options.success.message[0] + user + options.success.message[1] + userPwd);
  return currentPass;
}

// change existing password. If no password was found, will prompt for a new password
function changePassword(options)
{
  options = getOptions(options); // use default options or preset... 
  var res = PropertiesService.getUserProperties().getProperty(options.key);
  if (res == null) { return createPassword(options); }
  var currentPass = res;
  var UserPass = res.split(':');  
  var user = UserPass[0];
  var userPwd = UserPass[1];  
  
  var password = Browser.inputBox(options.change.title, options.change.message + user, options.change.buttons);    
  if (password == 'cancel') 
  {       
    Browser.msgBox(options.cancelled.message);   
    return -1;
  } // user cancelled operation    
  PropertiesService.getUserProperties().setProperty(options.key, user + ':' + password);
  return currentPass;
}

// delete password
function deletePassword(options)
{
  options = getOptions(options); // use default options or preset... 
  PropertiesService.getUserProperties().deleteProperty(options.key);
  return 0;
}

