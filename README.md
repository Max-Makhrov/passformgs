# passformgs
Google Script library for creating password prompts and storing user passwords safely

## Install
Google Script Editor > Resources > Libraries...
Project key: 
`Mn_TkqLP19vqytbDY5sihkfUeoPss5KEk`

## Use

The code saves password in user properties. Only user has an access.
The code shows `Browser.msgBox` and mostry used for developing user interfaces. Plese see screenshots [here](https://sheetswithmaxmakhrov.wordpress.com/2019/10/02/sample-password-form-google-script/).


### One password per user

Use from `onOpen` menu. Sample menu code:

    function onOpen()
    {
      createMenu_();
    }
    
    function createMenu_()
    {
      var ui = SpreadsheetApp.getUi();
      ui 
      .createMenu('Libs')
      .addSubMenu(ui.createMenu('PassForm')
                  .addItem('Use password',    'connectToAppWithPassNoKey')
                  .addItem('Change password', 'changePassWordNoKey')
                  .addItem('Show password',   'showPassNoKey') 
                  .addItem('Delete password', 'deletePassNoKey') 
                 ) 
      .addToUi()
    }

Copy this code for tests:

    // save or change password
    function changePassWordNoKey()
    {
      var pass = PassForm.changePassword();
      
      if (pass === -1) { 
        // 'user cancelled operation'
        return -1;
      }
      else if (pass === -2)
      {
       // 'wrong forma'
        return -2;
      }
      // success
      return 0;  
    }
    
    
    // delete password
    function deletePassNoKey()
    {
      PassForm.deletePassword();  
    }
    
    
    // show password on screen
    function showPassNoKey()
    {
      PassForm.showPassword();  
    }

    
    // use passsword to connect your app
    function connectToAppWithPassNoKey()
    {
      var pass = PassForm.getPassword({showForm: true});  
      if (pass === -1) { 
        // 'user cancelled operation'
        return -1;
      }
      else if (pass === -2)
      {
       // 'wrong forma'
        return -2;
      }  
      else if (pass == null)
      {
        // 'pass was not defined'  
        return -3;
      }
      var username_password = pass.split(':');  
      var username = username_password[0];
      var password = username_password[1];   
      // connect to yuor app with pass 
      Browser.msgBox('Success!');
      return 0;   
    }




### More than one password per user

For multiple passwords in single project.

Save or change password:

    // set key
    function setPasswordWithKey()
    {
      var nopass = PassForm.getPassword({key: 'Godfather'}, false);
      PassForm.setPassword({value: 'Mike:Carleone', key: 'Godfather'});   
    }

Get password:

    function getPasswordWithKey()
    {  
      var pass = PassForm.getPassword({key: 'Godfather'}, false);  
      Logger.log(pass); // Mike:Carleone  
    }


## Advanced
Use options. Samle options:

      options = 
        { buttons: Browser.Buttons.OK_CANCEL, 
         title: 'Save your password', 
         message: 'Please enter your Username and Password...',
         value: 'test:test',
         key: 'string_key',
         success:{
           report:true, 
           message:['Username:\n', '\n\nPassword:\n']}, 
         change:{
           buttons: Browser.Buttons.OK_CANCEL, 
           title: 'Changing password', 
           message: 'Enter new password for user\n'}, 
         cancelled:{
           message: 'Cancelled by a User'}, 
         error:{
           check:true, 
           message: 'Wrong format. Please try again...'}, 
        }
    
        


# passformgs
Google Script library for creating password prompts and storing user passwords safely

## Install
Google Script Editor > Resources > Libraries...
Project key: 
`Mn_TkqLP19vqytbDY5sihkfUeoPss5KEk`

## Use

The code saves password in user properties. Only user has an access.
The code shows `Browser.msgBox` and mostry used for developing user interfaces. Plese see screenshots [here](https://sheetswithmaxmakhrov.wordpress.com/2019/10/02/sample-password-form-google-script/).


### One password per user

Use from `onOpen` menu. Sample menu code:

    function onOpen()
    {
      createMenu_();
    }
    
    function createMenu_()
    {
      var ui = SpreadsheetApp.getUi();
      ui 
      .createMenu('Libs')
      .addSubMenu(ui.createMenu('PassForm')
                  .addItem('Use password',    'connectToAppWithPassNoKey')
                  .addItem('Change password', 'changePassWordNoKey')
                  .addItem('Show password',   'showPassNoKey') 
                  .addItem('Delete password', 'deletePassNoKey') 
                 ) 
      .addToUi()
    }

Copy this code for tests:

    // save or change password
    function changePassWordNoKey()
    {
      var pass = PassForm.changePassword();
      
      if (pass === -1) { 
        // 'user cancelled operation'
        return -1;
      }
      else if (pass === -2)
      {
       // 'wrong forma'
        return -2;
      }
      // success
      return 0;  
    }
    
    
    // delete password
    function deletePassNoKey()
    {
      PassForm.deletePassword();  
    }
    
    
    // show password on screen
    function showPassNoKey()
    {
      PassForm.showPassword();  
    }

    
    // use passsword to connect your app
    function connectToAppWithPassNoKey()
    {
      var pass = PassForm.getPassword({showForm: true});  
      if (pass === -1) { 
        // 'user cancelled operation'
        return -1;
      }
      else if (pass === -2)
      {
       // 'wrong forma'
        return -2;
      }  
      else if (pass == null)
      {
        // 'pass was not defined'  
        return -3;
      }
      var username_password = pass.split(':');  
      var username = username_password[0];
      var password = username_password[1];   
      // connect to yuor app with pass 
      Browser.msgBox('Success!');
      return 0;   
    }




### More than one password per user

For multiple passwords in single project.

Save or change password:

    // set key
    function setPasswordWithKey()
    {
      var nopass = PassForm.getPassword({key: 'Godfather'}, false);
      PassForm.setPassword({value: 'Mike:Carleone', key: 'Godfather'});   
    }

Get password:

    function getPasswordWithKey()
    {  
      var pass = PassForm.getPassword({key: 'Godfather'}, false);  
      Logger.log(pass); // Mike:Carleone  
    }


## Advanced
Use options. Samle options:

      options = 
        { buttons: Browser.Buttons.OK_CANCEL, 
         title: 'Save your password', 
         message: 'Please enter your Username and Password...',
         value: 'test:test',
         key: 'string_key',
         success:{
           report:true, 
           message:['Username:\n', '\n\nPassword:\n']}, 
         change:{
           buttons: Browser.Buttons.OK_CANCEL, 
           title: 'Changing password', 
           message: 'Enter new password for user\n'}, 
         cancelled:{
           message: 'Cancelled by a User'}, 
         error:{
           check:true, 
           message: 'Wrong format. Please try again...'}, 
        }
    
 
