# passformgs
Google Script library for creating password prompts and storing user passwords safely

## Install
Google Script Editor > Resources > Libraries...
Project key: 
`Mn_TkqLP19vqytbDY5sihkfUeoPss5KEk`

## Use
### One password per user


### More than one password per user

For multiple passwords in single project.

Save or ch

    // set key
    function setPasswordWithKey()
    {
      var nopass = PassForm.getPassword({key: 'Godfather'}, false);
      Logger.log(nopass);  // null
      PassForm.setPassword({value: 'Mike:Carleone', key: 'Godfather'});  
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
    
        

<!--stackedit_data:
eyJoaXN0b3J5IjpbLTQ5MzE1NDg3OF19
-->