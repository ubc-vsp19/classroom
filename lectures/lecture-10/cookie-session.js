// Warning: DO NOT RUN THIS in a public setting
// it is an example to demonstrate a xss vulnerability

const express = require('express');	// need express to run this example - i.e. npm i express
const cookie = require('cookie');       // need cookie for quickly parsing and serializing cookie
const uuid = require('uuid/v4');

const PORT = 3000;
const DISABLE_SESSION = true;

// lightweight session management
function getSessionManager(){
  if (!DISABLE_SESSION){

  let sessions = {};

  return (req, res, next)=> {
    //console.log(req.get('Cookie'));
    let cookies = cookie.parse(req.get('Cookie') || '');
    if (!cookies.demoSessionID || !sessions[cookies.demoSessionID]){
      console.log("Haven't seen client!");
      let id = uuid();
      sessions[id] = {};
      sessions[id][req.path] = 1;
      res.set('Set-Cookie', cookie.serialize('demoSessionID', id));
      console.log('Number of sessions: ' + Object.keys(sessions).length);
      req.sessionID = id;
      req.visited = 1;
    }
    else {
      console.log("Seen client " + cookies.demoSessionID);
      let id = cookies.demoSessionID;
      if (!sessions[id][req.path]) sessions[id][req.path] = 0;
      sessions[id][req.path] += 1;
      req.sessionID = id;
      req.visited = sessions[id][req.path];
    }
  
    next();
  };
  } else {
    let count = 0;
    return (req, res, next)=> {
      req.sessionID = '';
      req.visited = ++count;
      next();
    }
  }
}

let app = express();

app.use(getSessionManager());

app.get('*', (req, res, next)=> {
  let page = `<html>
  <head></head>
  <body>
    <h1>Session ID: ${req.sessionID}</h1>
    <p>Number of times visited ${req.path}: <b>${req.visited}</b></p>
  </body>
<html>`;
  res.status(200).send(page);
});

app.listen(PORT, ()=> console.log("server started\n-----\n"));
