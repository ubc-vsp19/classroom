// Warning: DO NOT RUN THIS in a public setting
// it is an example to demonstrate a xss vulnerability

const express = require('express');	// need express to run this example - i.e. npm i express

const PORT = 3000;

let app = express();

// need to disable XSS-Protection to mitigate XSS Auditor
app.use((req, res, next)=> {
  res.set('X-XSS-Protection', 0);
  next();
});

app.get('/search', (req, res, next)=> {
  console.log(req.query);
  if (req.query.text){
    // if req.query.text is something like <script>sendToBadServer(document.cookie)</script>
    // i.e., http://example.com/search?text=<script>sendToBadServer(document.cookie)</script>
    // and the attacker sends this link to a victim, then upon the victim accessing this page,
    // the cookie on the victim's browser will be stolen by the attacker
    res.status(200)
      .send(req.query.text + " could not be found");
  }
  else res.status(200).send("Enter a query string to exploit this page. E.g., /search?text=Foo");
});

app.get('/', (req, res, next)=> {
	res.status(200).send('Go to: <b>/search?text=Foo</b> to access the vulnerable page.<br/>Try: <b>/search?text=&lt;script&gt;alert("HAHA")&lt;/script&gt;</b>');
});

app.listen(PORT, ()=> console.log("server started\n-----\n"));
