var mysql = require('mysql');
var bodyParser = require('body-parser');
var Parser = require('expr-eval').Parser;
var express = require('express');
var app = express();
var multiparty = require('multiparty');
var fs = require('fs');




app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// var connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '2131',
//   database: 'freelancer'
// });

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

  var bcrypt = require('bcrypt');
  //  // // // // // // // // // // // // // // // // // // //
  const saltRounds = 10;
  console.log(req.body)
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      var sql= "INSERT into users(name, username, password) values ('" + req.body.name + "', '" + req.body.username + "', '"+ hash+"')";
      connection.query(sql,function(err,rows){
        // if(err) throw err;
        res.json({logged_in:true});
      });
      // var get_user_query = "Select * from User where email = '" + request.body.email + "' and password = '" + hash + "'";
      // con.query(get_user_query,function(err,rows){
      //   if(err) throw err;
      //   request.session.name = rows[0].name;
      //   request.session.email = rows[0].email;    
      //   console.log(session);    
      //   response.json({rows: rows[0]})
      // });
    });
  });

  //  // // // // // // // // // // // // // // // // // // //


  // var user = req.body;
  // console.log(user);
  // var query = connection.query("INSERT INTO users(name,username,password) values('"+user.name+"', '"+user.usename+"', '"+user.password+"')",function(err, result) {
  //   //if(!err)
  //   res.json({logged_in:true});
  // });
});


app.post('/signinprocess', function(req, res) {


  var bcrypt = require('bcrypt');
      var sql= "SELECT password FROM users WHERE username = '"+req.body.username+"'";
      connection.query(sql,function(err,rows){
        if(rows.length>0 && bcrypt.compareSync(req.body.password,rows[0].password )){
              res.json({logged_in : true})
            }
            else{
              res.json({logged_in : false})
          }
      });

});

app.post('/addproject', function(req, res) {
    // console.log(req.body.username)
    let form = new multiparty.Form();
    form.parse(req, (err, fields, files) => {
    let { path: tempPath, originalFilename } = files.file[0];
    var fileType = originalFilename.split(".");
    var fileName = Date.now() + '.' + fileType[fileType.length - 1]

    var sql= "INSERT into projects(title, description, skills_required,employer, budget_range,file) values ('" + fields.name + "', '" + fields.description+ "', '" + 
    fields.skills+ "', '"+fields.username + "', '"+ fields.range+ "', '"+ fileName+ "')";
    connection.query(sql,  function(err, result) {
        res.json({project_added:true});
      })

    // var sql= "insert into projects(file) values('"+fileName+"')";
    // console.log(sql);
    // connection.query(sql,  function(err, result) {
    // // res.json({bidder_hired:true});
    // });
    let copyToPath = "./src/files/" + fileName;
    //add path (copyToPath) to database pending 
    
    fs.readFile(tempPath, (err, data) => {
      if (err) throw err;
      fs.writeFile(copyToPath, data, (err) => {
        if (err) throw err;
        // delete temp image
        fs.unlink(tempPath, () => {
        });
        // res.json({image_updated : true});
      });
    });

  })

});

app.post('/profilefetch', function(req, res) {
  connection.query("SELECT * from users where username = ?",req.body.username,function(err, rows) {
    if(rows.length>=1){
      res.json({rows : rows[0]})
    }
    else{
      res.json({logged_in:false})
    }
  });

});
app.post('/bidderfetch', function(req, res) {
  console.log(req.body.username)
  connection.query("SELECT * from users where username = ?",req.body.username,function(err, rows) {
    if(rows.length>=1){
      res.json({rows : rows[0]})
    }
    else{
      res.json({logged_in:false})
    }
  });

});

app.post('/profileupdate', function(req, res) {
  // console.log(req.body)
  var sql = "update users SET name = '"+req.body.name+"', phone_number = '"+req.body.phone_number+ "', skills = '"+req.body.skills + "', about_me = '"+req.body.about_me +"' WHERE username = '"+ req.body.username+"'";  
  connection.query(sql,  function(err, result) {
    res.json({data_inserted:true});
  });
});


app.post('/imageupdate', function(req, res) {
  // console.log(req.body)
  let form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    // console.log(files);
    let { path: tempPath, originalFilename } = files.file[0];
    var fileType = originalFilename.split(".");
    var username = fields.username[0];
    var fileName = Date.now() + '.' + fileType[fileType.length - 1]
    var sql= "update users SET profile_image = '"+fileName+"' where username = '"+username+"'";
    // console.log(sql);
    connection.query(sql,  function(err, result) {
    // res.json({bidder_hired:true});
    });
    let copyToPath = "./src/images/" + fileName;
    //add path (copyToPath) to database pending 
    
    fs.readFile(tempPath, (err, data) => {
      if (err) throw err;
      fs.writeFile(copyToPath, data, (err) => {
        if (err) throw err;
        // delete temp image
        fs.unlink(tempPath, () => {
        });
        res.json({image_updated : true});
      });
    });

  })
});

app.post('/checkemail', function(req, res) {
  connection.query("SELECT * from users where username = ?",req.body.username,function(err, rows) {
    if(rows.length>=1){
      res.json({user_exist : true})
    }
    else{
      res.json({user_exist:false})
    }
  });

});

var mysql = require('mysql');

var pool  = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : '2131',
  database : 'freelancer'
});

// pool.getConnection(function(err, connection) {
//   // connected! (unless `err` is set)
// });

app.post('/checkemailwithpool', function(req, res) {


  pool.getConnection(function(err, connection) {
    // Use the connection
    connection.query("SELECT * from users where username = ?",req.body.username, function (error, results, fields) {
      // And done with the connection.
      console.log("Fired")
      if(results.length>=1){
        res.json({user_exist : true})
      }
      else{
        res.json({user_exist:false})
      }
      connection.release();
  
      // Don't use the connection here, it has been returned to the pool.
    });
  });

});



app.post('/userprojects', function(req, res) {
  // console.log(req.body.username)
  connection.query("SELECT * from projects where employer = ?",req.body.username,function(err, rows) {
    if (err) return callback(err);
    var projects = rows;
    // console.log(rows);
    res.json({rows : rows, status: 200})
  });

});

app.post('/hirebidder', function(req, res) {
  // update users SET profile_image = 'IMG_3750.jpg' where username = 'a@gmail.com';
  var sql= "update projects SET hiredbidder = '"+req.body.bidder_name+"',status = 'ON GOING' where project_id = '"+req.body.project_id+"'";
  // console.log(sql);
  connection.query(sql,  function(err, result) {
  res.json({bidder_hired:true});
  });

});

app.post('/biddersfetch', function(req, res) {
  connection.query("SELECT * from project_bids where project_id = ?",req.body.project_id,function(err, rows) {
    if (err) return callback(err);
    var projects = rows;
    res.json({rows : projects})
  });

});

app.post('/userbids', function(req, res) {
  console.log(req.body.username)
  connection.query("SELECT * from project_bids where bidder_name = ?",req.body.username,function(err, rows) {
    if (err) return callback(err);
    var projects = rows;
    // console.log(rows);
    res.json({rows : rows})
  });

});



app.post('/projectsfetch', function(req, res) {
  connection.query("SELECT * from projects",function(err, rows) {
    if (err) return callback(err);
    else{
      // var projects = rows;

      connection.query("SELECT SUM(days)/count(*) as avg, project_id from project_bids group by project_id",function(err, result) {
        console.log(rows)
        console.log(result)
        res.json({rows:rows, result:result})
        })
      }
  })
    
});

app.post('/projectfetch', function(req, res) {
  connection.query("SELECT * from projects where project_id = ?",req.body.project_id,function(err, rows) {
    if (err) return callback(err);
    

    else{
      var projects = rows[0];
      console.log(projects);
      // res.json({rows:projects})
      connection.query("SELECT SUM(days)/count(*) as avg from project_bids where project_id = ?",req.body.project_id,function(err, result) {
        var average_days = result[0];
        console.log(result);
        res.json({rows : projects, average_days: average_days})
      });
       
      }
    })

});

app.post('/addbid', function(req, res) {
  var sql= "INSERT into project_bids(project_id, days, usd, bidder_name) values ('" + req.body.project_id + "', '" + req.body.days+ "', '" + 
  req.body.usd + "', '"+ req.body.bidder_name + "')";
  // console.log(sql);
  connection.query(sql,  function(err, result) {
  res.json({bid_added:true});
  });

});


var port = process.env.API_PORT || 3001;

app.listen(port, function() {
  console.log('SignUp process listening on port '+ port);
});
