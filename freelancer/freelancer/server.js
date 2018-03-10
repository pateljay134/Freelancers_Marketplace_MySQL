var mysql = require('mysql');
var bodyParser = require('body-parser');
var Parser = require('expr-eval').Parser;
var express = require('express');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// app.use(function(req, res, next) {
// 	res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Credentials', 'true');
// 	res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
// 	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
// 	//and remove cacheing so we get the most recent comments
// 	res.setHeader('Cache-Control', 'no-cache');
// 	next();
// });

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2131',
  database: 'freelancer'
});

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});  

app.post('/signupprocess', function(req, res) {
  var user = req.body;
  console.log(user);
  var query = connection.query('INSERT INTO users SET ?' ,user,  function(err, result) {
    //if(!err)
    res.json({data_inserted:true});
  });
  
  res.json({data_inserted:true});
});

app.post('/signinprocess', function(req, res) {
  var user = {
    email : req.body.email,
    password : req.body.password
  }
  console.log(req.body.email);
  connection.query("SELECT password FROM users WHERE email = ?", user.email,function(err, rows) {
    if (err) return callback(err);
    var retrieved_password = rows[0].password;
    res.json({logged_in : retrieved_password === user.password ? true : false})
  });

});

app.post('/addproject', function(req, res) {
    var sql= "INSERT into projects(title, description, skills_required, budget_range) values ('" + req.body.name + "', '" + req.body.description+ "', '" + 
    req.body.skills + "', '"+ req.body.range + "')";
    console.log(sql);
    connection.query(sql,  function(err, result) {
    res.json({project_added:true});
  });
  
});
//  });
var name;
app.post('/profilefetch', function(req, res) {
  console.log(req.body.email);
  var email = req.body.email;
  connection.query("SELECT * from users where email = ?",email,function(err, rows) {
    if (err) return callback(err);
    var user_data = rows[0];
    // // console.log(retrieved_password);
    console.log(user_data);
    res.json(user_data)
  });

});

app.post('/profileupdate', function(req, res) {
  var user = req.body;
  var sql = "update users SET name = '"+req.body.name+"', phone_number = '"+req.body.phone_number+ "', skills = '"+req.body.skills + "', about_me = '"+req.body.about_me + "' WHERE email = '"+ req.body.email+"'";  
  console.log(sql);
  connection.query(sql,  function(err, result) {
    res.json({data_inserted:true});
  });
});

app.post('/projectsfetch', function(req, res) {
  connection.query("SELECT * from projects",function(err, rows) {
    if (err) return callback(err);
    var projects = rows;
    console.log(rows);
    res.json({rows : rows})
  });

});



var port = process.env.API_PORT || 3001;

app.listen(port, function() {
  console.log('SignUp process listening on port '+ port);
});
