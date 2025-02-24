  /********************************
    ACTIVITIES CONTROLS
  ********************************/

  var activities = {}
  
  // activities fields
  /*
    {field:"timestamp",prompt:"Time Stamp",type:"datetime"},
    {field:"activityid",prompt:"ActivityID",type:""},
    {field:"descent",prompt:"Descent",type:"feet"},
    {field:"userid",prompt:"UserID",type:""},
    {field:"firstname", prompt:"First Name", type:""},
    {field:"lastname", prompt:"Last Name", type:""},
    {field:"distance",prompt:"Distance",type:"distance"},
    {field:"activitytype",prompt:"Activity",type:"activity"},
    {field:"starttime",prompt:"Start",type:"datetime"},
  */
  activities.fields = [
    {field:"name",prompt:"&nbsp;",type:"name"},
    {field:"starttime",prompt:"&nbsp;",type:"datewords"},
    {field:"stats",prompt:"&nbsp;", type:"stats"},
    {field:"time",prompt:"&nbsp;",type:"time"},
    {field:"ascent",prompt:"&nbsp;",type:"feet"},
    {field:"description",prompt:"&nbsp;",type:"wrap"},
    {field:"previewurl",prompt:"&nbsp;",type:"image"}
  ];
 
  // user object content
  activities.content = "";
  
  // user object actions
  /*
  g.actions.user = {
    home:       {target:"app", func:httpGet, href:"/home/", prompt:"Home"}, 
    tasks:      {target:"app", func:httpGet, href:"/task/", prompt:"Tasks"}, 
    users:      {target:"app", func:httpGet, href:"/user/", prompt:"Users"},  
    byNick:     {target:"list", func:jsonForm, href:"/user", prompt:"By Nickname", method:"GET",
                  args:{
                    nick: {value:"", prompt:"Nickname", required:true}
                  }
                }, 
    byName:     {target:"list", func:jsonForm, href:"/user", prompt:"By Name", method:"GET",
                  args:{
                    name: {value:"", prompt:"Name", required:true}
                  }
                }, 
    add:        {target:"list", func:jsonForm, href:"/user/", prompt:"Add User", method:"POST",
                  args:{
                    nick: {value:"", prompt:"Nickname", required:true, pattern:"[a-zA-Z0-9]+"},
                    password: {value:"", prompt:"Password", required:true, pattern:"[a-zA-Z0-9!@#$%^&*-]+"},
                    name: {value:"", prompt:"Full Name", required:true},
                  }
                },
    item:       {target:"item", func:httpGet, href:"/user/{id}", prompt:"Item"},
    edit:       {target:"single", func:jsonForm, href:"/user/{id}", prompt:"Edit", method:"PUT",
                  args:{
                    nick: {value:"{nick}", prompt:"Nickname", readOnly:true},
                    name: {value:"{name}", prompt:"Full Name",required:true}
                  }
                },
    changepw:   {target:"single", func:jsonForm, href:"/task/pass/{id}", prompt:"Change Password", method:"POST",
                  args:{
                    nick: {value:"{nick}", prompt:"NickName", readOnly:true},
                    oldPass: {value:"", prompt:"Old Password", required:true, pattern:"[a-zA-Z0-9!@#$%^&*-]+"},
                    newPass: {value:"", prompt:"New Password", required:true, pattern:"[a-zA-Z0-9!@#$%^&*-]+"},
                    checkPass: {value:"", prompt:"Confirm New", required:true, pattern:"[a-zA-Z0-9!@#$%^&*-]+"},
                  }
                },    
    assigned:   {target:"single", func:httpGet, href:"/task/?assignedUser={id}", prompt:"Assigned Tasks"}
  };
  */
