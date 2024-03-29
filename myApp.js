let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config()

absolutePath = __dirname + '/views/index.html'

app.use((req, res, next) =>{
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(method + " " + path + " - " + ip);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get('/now', (req, res, next)=> {
  req.time = new Date().toString();
  next();
}, (req, res)=> {
  res.send({time: req.time});
});

app.get('/', (req, res) =>{
        res.sendFile(absolutePath);
      })
      
app.use('/public', express.static(__dirname + "/public"));

app.get("/json", (req, res) =>{
  message = "Hello json";

  if(process.env.MESSAGE_STYLE != 'uppercase'){
    res.send({"message": message.toUpperCase()})
  }else{
    res.send({"message": message})
  }
})

app.use((req, res, next) =>{
  const method = req.method;
  const path = req.path;
  const ip = req.ip;
  console.log(`${method} ${path} - ${ip} karl`);
  next();
})

app.get("/:word/echo", (req, res)=>{
  res.send({echo: req.params.word});
});

app.get("/name", (req, res)=> {
  firstname = req.query.first;
  lastname = req.query.last;
  res.send({name: `${firstname} ${lastname}`})
});

app.post("/name", (req, res)=>{
  firstName = req.body.first;
  lastName = req.body.last;
  
  res.send({name: `${firstName} ${lastName}`});
});
































 module.exports = app;
