/*******************************************************
 * json-client HTML/SPA client engine
 * June 2015
 * Mike Amundsen (@mamund)
 * Soundtrack : Ornette Coleman Six Classic Albums (2012)
 *******************************************************/

/*  
  NOTE:
  - has fatal dependency on dom-help.js
  - uses no external libs/frameworks
  - built/tested for chrome browser (YMMV on other browsers)
*/

function json() {

  /********************************
   DELCARATIONS
  ********************************/ 
  var d = domHelp();  
  var g = {};
  
  g.url = '';
  g.msg = null;
  g.title = "JSON Client";
  g.atype = "application/json";
  g.ctype = "application/json";
  g.object = "";
  
  // control objects
  g.fields = {};
  g.labels = {};
  g.actions = {};
  g.content = {};

  /********************************
    HOME CONTROLS
  ********************************/
  // home controls
  g.fields.home = [];
  
  // home object content
  g.content.home = "";
  g.content.home =  '<div class="ui segment">';
  g.content.home += '  <h3>Welcome to TPS at BigCo!</h3>';
  g.content.home += '  <p><b>Select one of the actions above</b></p>';
  g.content.home += '</div>';

  // home actions
  g.actions.home = {
    home:       {target:"app", func:httpGet, href:"/home/", prompt:"Home"}, 
    tasks:      {target:"app", func:httpGet, href:"/task/", prompt:"Tasks"}, 
    users:      {target:"app", func:httpGet, href:"/user/", prompt:"Users"}  
  };

  /********************************
    ACTIVITIES CONTROLS
  ********************************/
  // activities fields
  g.fields.activities = [
    "activityType",
    "ascent",
    "descent",
    "distance",
    "starttime",
    "time",
    "timestamp"
  ];

  g.labels.activities = [
    "Activity Type",
    "Ascent",
    "DSescent",
    "Distance",
    "Start",
    "Elapsed Time",
    "Time Stamp"
  ];
 
  // user object content
  g.content.activities = "";
  
  // user object actions
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
  

  /********************************
    MAIN CODE
  ********************************/
  // init library and start
  function init(url, title) {
    if(!url || url==='') {
      alert('*** ERROR:\n\nMUST pass starting URL to the library');
    }
    else {
      g.title = title||"JSON Client";
      g.url = url;
      req(g.url,"get");
    }
  }

  // process loop
  function parseMsg() {
    dump();
    setObject();
    items();
    actions();
    clearForm();
  }

  // set response object pointer
  function setObject() {
    g.object="activities";
  }
  
  // handle response dump
  function dump() {
    var elm = d.find("dump");
    elm.innerText = JSON.stringify(g.msg, null, 2);
  }
    
  // handle item collection
  function items() {
    var msg, flds, lbls;
    var elm, coll, link;
    var ul, li, dl, dt, dd, p;

    elm = d.find("items");
    d.clear(elm);
    
    msg = g.msg; //g.msg[g.object];
    flds = g.fields[g.object];
    lbls = g.labels[g.object];
    
    // handle returned objects
    if(msg) {
      coll = msg;
      segments = d.node("div");
      for(var item of coll) {
        segment = d.node("div");
        segment.className = "activity";

        table = d.node("table");
        table.className = "ui table";
        // emit the data elements
        for(var f of flds) {
          switch(f) {
            case "time":
              tr_data = d.data_row({className:"item "+f, text:f, value:formatTime(item[f])+"&nbsp;"});            
              break;
            case "ascent":
            case "descent":
              tr_data = d.data_row({className:"item "+f, text:f, value:metersToFeet(item[f])+"&nbsp;"+"feet"});            
              break;
            case "distance":
              tr_data = d.data_row({className:"item "+f, text:f, value:metersToMiles(item[f])+"&nbsp;"+"miles"});
              break;    
            case "starttime":
            case "timestamp":         
            tr_data = d.data_row({className:"item "+f, text:f, value:formatDate(item[f])+"&nbsp;"});
            break;  
            default:
              tr_data = d.data_row({className:"item "+f, text:f, value:item[f]+"&nbsp;"});            
              break;
          }
          d.push(tr_data,table);
        }
        d.push(table,segment);
        d.push(segment,segments);
      }
      if (segments.childElementCount > 0) {
        d.push(segments, elm);
      }
    }
  }
  
  // handle item-level actions
  function itemActions(el, item, single) {
    var act, actions, link, a;
    
    actions = g.actions[g.object];
    for(act in actions) {
      link = actions[act];
      if(link.target==="item") {
        a = d.anchor({
          href:link.href.replace(/{id}/g,item.id),
          rel:(link.rel||"item"),
          className:"ui basic blue link item action button",
          text:link.prompt
        });
        a.onclick = link.func
        a.setAttribute("method",(link.method||"GET"));
        a.setAttribute("args",(link.args?JSON.stringify(link.args):"{}"));
        d.push(a,el);
      }
    }
    
    // only when showing single record
    if(single===true) {
      for(act in actions) {
        link = actions[act];
        if(link.target==="single") {
          a = d.anchor({
            href:link.href.replace(/{id}/g,item.id),
            rel:(link.rel||"item"),
            className:"ui basic blue link item action button",
            text:link.prompt
          });
          a.onclick = link.func
          a.setAttribute("method",(link.method||""));
          a.setAttribute("args",(link.args?JSON.stringify(link.args):"{}"));
          d.push(a,el);
        }
      }
    }
    return el;
  }
  
  // handle list-level actions
  function actions() {
    var actions;   
    var elm, coll;
    var ul, li, a;

    elm = d.find("actions");
    d.clear(elm);
    menu = d.node("div");
    menu.className = "ui blue stackable menu";
    
    actions = g.actions[g.object];
    for(var act in actions) {
      link = actions[act];
      if(link.target==="list") {
        a = d.anchor({
          href:link.href,
          rel:"collection",
          className:"action item",
          text:link.prompt
        });
        a.onclick = link.func;
        a.setAttribute("method",(link.method||"GET"));
        a.setAttribute("args",(link.args?JSON.stringify(link.args):"{}"));
        d.push(a,menu);
      }
    }
    if (menu.childElementCount > 0) {
      d.push(menu, elm);
    }
  }
  
  /********************************
   JSON-CLIENT HELPERS
  ********************************/
  // function clear out any form
  function clearForm() {
    var elm;
    
    elm = d.find("form");
    d.clear(elm);
    elm.style.display = "none";
  }
  
  // generate a form for user input
  function jsonForm(e) {
    var msg;
    var elm, coll, link, val;
    var form, lg, fs, p, inp;
     
    msg = g.msg[g.object];
    
    elm = d.find("form");
    elm.style.display = "block";
    d.clear(elm);
    link = e.target;
    
    form = d.node("form");
    form.action = link.href;
    form.className = link.rel;
    form.className += " ui form";
    switch(link.getAttribute("method")) {
      case "POST":
        form.onsubmit = httpPost;
        break;
      case "PUT":
        form.onsubmit = httpPut;
        break;
      case "GET":
      default:
        form.onsubmit = httpQuery;
        break;
    }
    fs = d.node("div");
    fs.className = "ui form";
    lg = d.node("div");
    lg.innerHTML = link.title||"Form";
    lg.className = "ui dividing header";
    d.push(lg, fs);

    coll = JSON.parse(link.getAttribute("args"));
    for(var prop in coll) {
      val = coll[prop].value;
      if(msg[0][prop]) {
        val = val.replace("{"+prop+"}",msg[0][prop]);
      } 
      p = d.input({
        prompt:coll[prop].prompt,
        name:prop,
        value:val, 
        required:coll[prop].required,
        readOnly:coll[prop].readOnly,
        pattern:coll[prop].pattern
      });
      d.push(p,fs);
    }
    
    p = d.node("p");
    inp = d.node("input");
    inp.className = "ui mini positive submit button";
    inp.type = "submit";
    d.push(inp,p);

    inp = d.node("input");
    inp.className = "ui mini cancel button";
    inp.type = "button";
    inp.value = "Cancel";
    inp.onclick = clearForm;
    d.push(inp,p);

    d.push(p,fs);            
    d.push(fs,form);
    d.push(form, elm);
    
    return false;
  }
  
  /********************************
   AJAX HELPERS
  ********************************/  
  // mid-level HTTP handlers
  function httpGet(e) {
    req(e.target.href, "get", null);
    return false;
  }

  function httpQuery(e) {
    var form, coll, query, i, x, q;

    q=0;
    form = e.target;
    query = form.action+"/?";
    nodes = d.tags("input", form);
    for(i=0, x=nodes.length;i<x;i++) {
      if(nodes[i].name && nodes[i].name!=='') {
        if(q++!==0) {
          query += "&";
        }
        query += nodes[i].name+"="+escape(nodes[i].value);
      }
    }
    req(query,"get",null);
    return false;
  }

  function httpPost(e) {
    var form, nodes, data;

    data = {};
    form = e.target;
    nodes = d.tags("input",form);
    for(i=0,x=nodes.length;i<x;i++) {
      if(nodes[i].name && nodes[i].name!=='') {
        data[nodes[i].name]=nodes[i].value+"";
      }
    }
    req(form.action,'post',JSON.stringify(data));
    return false;
  }

  function httpPut(e) {
    var form, nodes, data;

    data = {};
    form = e.target;
    nodes = d.tags("input",form);
    for(i=0,x=nodes.length;i<x;i++) {
      if(nodes[i].name && nodes[i].name!=='') {
        data[nodes[i].name]=nodes[i].value+"";
      }
    }
    req(form.action,'put',JSON.stringify(data));
    return false;
  }

  function httpDelete(e) {
    if(confirm("Ready to delete?")===true) {
      req(e.target.href, "delete", null);
    }
    return false;
  }

  // low-level HTTP stuff
  function req(url, method, body) {
    var ajax = new XMLHttpRequest();
    ajax.onreadystatechange = function(){rsp(ajax)};
    ajax.open(method, url);
    ajax.setRequestHeader("accept",g.atype);
    if(body && body!==null) {
      ajax.setRequestHeader("content-type", g.ctype);
    }
    ajax.send(body);
  }

  function rsp(ajax) {
    if(ajax.readyState===4) {
      g.msg = JSON.parse(ajax.responseText);
      parseMsg();
    }
  }

  /********************************
    EXPORT FUNCTIONS
  *********************************/
  var that = {};
  that.init = init;
  return that;
}

// *** EOD ***
