var mysql = require('mysql');
var bodyParser = require('body-parser');
var Parser = require('expr-eval').Parser;
var express = require('express');
var app = express();
var multiparty = require('multiparty');

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
  console.log(req.body.username);
  connection.query("SELECT password FROM users WHERE username = ?", req.body.username,function(err, rows) {
    if(rows.length>0 && rows[0].password === req.body.password){
      res.json({logged_in : true})
    }
    else{
      res.json({logged_in : false})
    }
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
// var name;
app.post('/profilefetch', function(req, res) {
  connection.query("SELECT * from users where username = ?",req.body.username,function(err, rows) {
    if(rows.length>=1){
      res.json(rows[0])
    }
    else{
      res.json({logged_in:false})
    }
  });

});

app.post('/profileupdate', function(req, res) {
  var user = req.body;
  var sql = "update users SET name = '"+req.body.name+"', phone_number = '"+req.body.phone_number+ "', skills = '"+req.body.skills + "', about_me = '"+req.body.about_me +"' WHERE username = '"+ req.body.username+"'";  
  // console.log(sql);
  connection.query(sql,  function(err, result) {
    res.json({data_inserted:true});
  });


  let form = new multiparty.Form();
 form.parse(req, (err, fields, files) => {
 
 let { path: tempPath, originalFilename } = files.file[0];
 console.log(files);
 var fileType = originalFilename.split(".");
 console.log(originalFilename)
 let copyToPath = "./app/images/" + originalFilename;
 //add path (copyToPath) to database pending 
 console.log(copyToPath);
 try {
 fs.readFile(tempPath, (err, data) => {
 if (err) throw err;
 fs.writeFile(copyToPath, data, (err) => {
 if (err) throw err;
 // delete temp image
 fs.unlink(tempPath, () => {
 });
 res.json('Image Upload Success');
 });
 });
 } catch (e) {
 console.log('Catch');
 resultObject.errorMsg = 'Error Uploading Image';
 res.json(resultObject);
 return;
 }
 })


});


app.post('/projectsfetch', function(req, res) {
  connection.query("SELECT * from projects",function(err, rows) {
    if (err) return callback(err);
    var projects = rows;
    console.log(rows);
    res.json({rows : rows})
  });

});

app.post('/projectfetch', function(req, res) {
  connection.query("SELECT * from projects where project_id = ?",req.body.project_id,function(err, rows) {
    if (err) return callback(err);
    var projects = rows[0];
    console.log(rows);
    res.json({rows : projects})
  });

});

app.post('/addbid', function(req, res) {
  var sql= "INSERT into project_bids(project_id, days, usd, bidder_name) values ('" + req.body.project_id + "', '" + req.body.days+ "', '" + 
  req.body.usd + "', '"+ req.body.bidder_name + "')";
  console.log(sql);
  connection.query(sql,  function(err, result) {
  res.json({bid_added:true});
});

});



var port = process.env.API_PORT || 3001;

app.listen(port, function() {
  console.log('SignUp process listening on port '+ port);
});
