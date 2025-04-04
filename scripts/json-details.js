/*******************************************************
 * json-client HTML/SPA client engine
 * June 2015
 * Mike Amundsen (@mamund)
 *******************************************************/

/*  
  NOTE:
  - has dependency on dom-help.js
  - config file(s) [activities] holds details
  - uses no external libs/frameworks
*/

function json() {

  /********************************
   DELCARATIONS
  ********************************/ 
  var d = domHelp();  
  var g = {};
  
  g.userid = "";
  g.authString = "";
  g.url = '';
  g.msg = null;
  g.title = "JSON Client";
  g.atype = "application/json";
  g.ctype = "application/json";
  g.object = "";
  g.rootURL = "";
  
  // control 
  g.actions = {};
  g.content = {};
  g.activityList = [];
  g.activityTypeURL = "https://outsidely-geo-app.azurewebsites.net/api/validate/activitytype";


  /********************************
    MAIN CODE
  ********************************/
  // init library and start
  //args.url, args.title, args.rootURL)
  function init(args) {

    if(!args.url || args.url==='') {
      alert('*** ERROR:\n\nMUST pass starting URL to the library');
    }
    else {
      g.title = args.title||"JSON Client";
      g.url = args.url;
      g.rootURL = args.rootURL || "";

      getAuth();

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
  
  
  function getAuth() {
    var userid, password, auth;

    auth = getCookie("key");
    if(auth == "" ) {      
      userid = prompt("UserID:");
      if(userid) {
        password = prompt("Password:");
      }
      if(userid && password) {
        g.userid = userid;
        g.authString = window.btoa(userid+":"+password);
        setCookie("key",g.authString);
      }  
    } else {
      g.authString = auth;
    }
  }


  // handle response dump
  function dump() {
    var elm = d.find("dump");
    elm.innerText = JSON.stringify(g.msg, null, 2);
  }

  function loadData() {
    var url = g.activityTypeURL;
    req(url, "get", null, loadDataRsp);
  }
  function loadDataRsp(ajax) {
    if(ajax.readyState===4) {
      g.activityList = JSON.parse(ajax.responseText);
    }
    g.activityList.sort((a,b) => {
      if(a.sort < b.sort) {
        return -1;
      }
      if(a.sort > b.sort) {
        return 1;
      }
      return 0;
    });
    items();
  }

  // handle item collection
  function items() {
    var msg, flds, elm, coll;

    elm = d.find("items");
    d.clear(elm);
    
    msg = g.msg[g.object]; 
    flds = details.fields; //[g.object];
    
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
          switch(f.type) {
            case "user":
              tr_data = d.data_row({className:"item "+f.field, text:(f.prompt||f.field), 
                value:formatName(item["firstname"], item["lastname"], item["userid"])+"&nbsp;" +
                formatActivityType(item["activitytype"])+"&nbsp;"});            
              break;
            case "distance":
              if(item[f.field] && item[f.field].length>0 && item[f.field].substring(0,4)!=="0.00"){
                tr_data = d.data_row({className:"item "+f, text:(f.prompt||f.field), value:(item[f.field]+" distance" || "" )+"&nbsp;"});
              }
              break;    
            case "detailImage":         
              if(item[f.field] && item[f.field].length>0) {
                tr_data = d.data_row({className:"item "+f, text:(f.prompt||f.field), value:detailImageLink(item[f.field],g.rootURL,item["userid"], item["activityid"],item["media"])});
              }
              break;  
            case "image":         
              tr_data = d.data_row({className:"item "+f, text:(f.prompt||f.field), value:'<img src="' + g.rootURL + item[f.field]+'" alt="'+g.rootURL+item[f.field]+'" class="map">'});
              break;  
            case "media":         
              //if(item[f.field] && item[f.field].length>0) {
                tr_data = d.data_row({className:"item "+f, text:(f.prompt||f.field), value:mediaCollection(g.rootURL, item["media"])});
              //}
              break;  
            case "wrap":  
              if(item[f.field] && item[f.field].length>0) {
                tr_data = d.data_row({className:"item wrap "+f.field, text:(f.prompt||f.field), value:item[f.field]+"&nbsp;"});            
              }
              break;
            case "title":
              if(item[f.field] && item[f.field].length>0) {
                tr_data = d.data_row({className:"item "+f.field, text:(f.prompt||f.field), value:setTitle(item["name"])});            
              }
              break;
            case "ascent":
              if(item[f.field] && item[f.field].length>0 && item[f.field].substring(0,2)!=="0 ") {
                tr_data = d.data_row({className:"item "+f.field, text:(f.prompt||f.field), value:(item[f.field]+" elevation" || "")+"&nbsp;"});            
              }
              break;
            case "time":
              if(item[f.field] && item[f.field]!=="01h 00m 00s") {
                tr_data = d.data_row({className:"item "+f.field, text:(f.prompt||f.field), value:(item[f.field] || "")+"&nbsp;"});            
              }
              break;
            case "speed":
                if(item[f.field] && item[f.field].substring(0,3)!=="0.0") {
                  tr_data = d.data_row({className:"item "+f.field, text:(f.prompt||f.field), value:(item[f.field] || "")+"&nbsp;"});            
                }
                break;
            default:
              tr_data = d.data_row({className:"item "+f.field, text:(f.prompt||f.field), value:(item[f.field] || "")+"&nbsp;"});            
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
    if(elm) {
      elm.style.display = "none";
    }
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
  function req(url, method, body, next) {
    var ajax = new XMLHttpRequest();
    if(next) {
      ajax.onreadystatechange = function(){next(ajax)};
    } else {
      ajax.onreadystatechange = function(){rsp(ajax)};
    }
    ajax.open(method, url);
    ajax.setRequestHeader("accept",g.atype);
    ajax.setRequestHeader("Authorization","Basic "+g.authString);
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
