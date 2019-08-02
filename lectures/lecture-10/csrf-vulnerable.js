// Warning: DO NOT RUN THIS in a public setting
// it is an example to demonstrate a xss vulnerability

const express = require('express');	// need express to run this example - i.e. npm i express
const cookie = require('cookie');       // need cookie for quickly parsing and serializing cookie
const uuid = require('uuid/v4');

const PORT = 3000;
const SECRET = 'blacksheepwall';	// this is a password for accessing POST endpoint

// lightweight session management
function getSessionManager(){
  let sessions = {};
  let parseSession = (req, res, next)=> {
    //console.log(req.get('Cookie'));
    let cookies = cookie.parse(req.get('Cookie') || '');
    if (!cookies.demoSessionID || !sessions[cookies.demoSessionID]){
      console.log("Haven't seen client!");
      let id = uuid();
      sessions[id] = {
        login: false,
        visits: {}
      };
      sessions[id].visits[req.path] = 1;
      res.set('Set-Cookie', cookie.serialize('demoSessionID', id));
      console.log('Number of sessions: ' + Object.keys(sessions).length);
      req.sessionID = id;
      req.login = false;
      req.visited = 1;
    }
    else {
      console.log("Seen client " + cookies.demoSessionID);
      let id = cookies.demoSessionID;
      if (!sessions[id].visits[req.path]) sessions[id].visits[req.path] = 0;
      sessions[id].visits[req.path] += 1;
      req.sessionID = id;
      req.login = sessions[id].login;
      req.visited = sessions[id].visits[req.path];
      req.username = sessions[id].username;
    }
  
    next();
  };

  let loginUser = (sessionID, username, password)=> {
    if (password === SECRET){
      sessions[sessionID].login = true;
      sessions[sessionID].username = username;
      return Promise.resolve(true);
    }
    else return Promise.reject(false);
  }
  let logoutUser = (sessionID)=> {
    delete sessions[sessionID].username;
    sessions[sessionID].login = false;
    return Promise.resolve(true);
  }

  let protectEndpoint = (req, res, next)=> {
    if (req.login) next();
    else res.redirect('/login');
  }

  return {
    loginUser: loginUser,
    logoutUser: logoutUser,
    parseSession: parseSession,
    protectEndpoint: protectEndpoint
  }
}

let app = express();
let sessionManager = getSessionManager();

app.use(express.urlencoded({ extended: true }));
app.use(sessionManager.parseSession);

app.get('/login', (req, res, next)=> {
  let form = `<form action="/login" method="POST">
<div><input name="username" placeholder="Username"/></div>
<div><input type="password" name="password" placeholder="Your password"/></div>
<input type="submit" value="Submit"/></form>`;

  let page = `<html>
  <head>
  </head>
  <body>
    <h1>Login</h1>
    <div>
      ${form}
    </div>
  </body>
</html>`

  res.status(200).send(form);
});

app.post('/login', (req, res, next)=> {
  console.log(req.body);
  if (req.body.username && req.body.password){
    sessionManager.loginUser(req.sessionID, req.body.username, req.body.password)
      .then(()=> res.redirect('/'), (err)=> res.status(403).send("Not Authorized to View"));
  }
  else res.status(403).send('Fill in both username and password');
});

app.get('/logout', (req, res, next)=> {
  sessionManager.logoutUser(req.sessionID)
  .then(()=> res.redirect('/'));
});

app.get('/transfer', sessionManager.protectEndpoint, (req, res, next)=> {

  let form = `<form action="/transfer" method="POST">
<div><input name="sender" placeholder="Sender Account"/></div>
<div><input name="receiver" placeholder="Receiver Account"/></div>
<div><input type="number" name="amount" min="0" value="0" placeholder="Amount"/></div>
<input type="submit" value="Submit"/></form>`;

  let page = `<html>
  <head></head>
  <body>
    <h1>User: ${req.username} <span><a href='/logout'>Log out</a></span></h1>
    <h3>Transfer Funds</h3>
    <div>${form}</div>
  </body>
<html>`;
  res.status(200).send(page);

});

// this is the CSRF-vulnerable endpoint
app.post('/transfer', sessionManager.protectEndpoint, (req, res, next)=> {
  console.log(req.body);
  if (req.body.sender && req.body.receiver && req.body.amount){
    res.status(200).send("$" + req.body.amount + " sent from [" + req.body.sender + "] to [" + req.body.receiver + "]");
  }
  else res.status(403).send("Fill in all the fields");
});

app.get('/', sessionManager.protectEndpoint, (req, res, next)=> {

  let form = `<form action="/transfer" method="POST">
<div><input name="sender" placeholder="Sender Account"/></div>
<div><input name="receiver" placeholder="Receiver Account"/></div>
<div><input type="number" name="amount" min="0" value="0" placeholder="Amount"/></div>
<input type="submit" value="Submit"/></form>`;

  let page = `<html>
  <head></head>
  <body>
    <h1>User: ${req.username} <span><a href='/logout'>Log out</a></span></h1>
    <!-- <p>Number of times visited ${req.path}: <b>${req.visited}</b></p> -->
    <ol>
      <li><a href="/transfer">Send Money</a></li>
      <li><a href="/">Check Balance</a></li>
    </ol>
  </body>
<html>`;
  res.status(200).send(page);
});

app.listen(PORT, ()=> console.log("server started\n-----\n"));
