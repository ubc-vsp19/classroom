// Warning: DO NOT RUN THIS in a public setting
// it is an example to demonstrate a xss vulnerability

const fs = require('fs');
const util = require('util');
const express = require('express');	// need express to run this example - i.e. npm i express

const PORT = 3000;
const DATAFILE = './temp-bad.data';

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

let app = express();
let data = {
  comments: [{
    username: 'Alice',
    content: "Hey guys! Let's all hang out!"
  },
  {
    username: 'Bob',
    content: "Yeah! I don't know you, but let's hang!"
  }]
};

// This server does not sanitize the content given by the user.
// The content could be something like <script>steal(document.cookie)</script>
// and this will be rendered by the web server as-is.
// The attack will impact everyone who visits the website.
function addComment(username, content){
  data.comments.push({
    username: username,
    content: content
  });
  return writeFile(DATAFILE, JSON.stringify(data))
}

// asynchronously read a file and load data
// if it doesn't exist create it
readFile(DATAFILE)
.then((raw)=> {
  data = JSON.parse(raw);
  return 'Loaded File'
}, (err)=> (err.code === 'ENOENT' ? writeFile(DATAFILE, '{}').then(()=> 'Created File') : 'Unknown Error while loading file'))
.then(console.log);

app.use(express.urlencoded({ extended: true }));

// need to disable XSS-Protection to mitigate XSS Auditor
app.use((req, res, next)=> {
  res.set('X-XSS-Protection', 0);
  next();
});

app.get('/', (req, res, next)=> {
  
  // This web server simply renders the user-given content
  // without sanitizing it. Any user with the ability to post
  // to this page can inject malicious code, which would be
  // executed in every visitor's browser
  let comments = data.comments.map((item)=> `<div>
  <span><b>${item.username}</b> says:</span>  ${item.content}
</div>`).join('\n');

  let form = `<form action="/add" method="POST">
<div><input name="username" placeholder="Username"/></div>
<textarea name="content" placeholder="Content"></textarea>
<input type="submit" value="Submit"/></form>`;

  let page = `<html>
  <head>
  </head>
  <body>
    <h1>Comments</h1>
    ${comments}
    <div>
      ${form}
    </div>
  </body>
</html>`;

  res.status(200).send(page);
});

app.post('/add', (req, res, next)=> {
  console.log(req.body);
  if (req.body.username && req.body.content){
    addComment(req.body.username, req.body.content)
      .then(()=> res.redirect('/'));
  }
  else res.status(403).send('Fill in both username and content');
});

app.listen(PORT, ()=> console.log("server started\n-----\n"));
