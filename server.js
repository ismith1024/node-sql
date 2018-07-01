// server.js

var http = require('http'),
    express = require('express'),
    app = express(),
    sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('/home/ian/Data/engineering.db');
var path = require('path');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: "We need a better secret!",
    resave: false,
    saveUninitialized: true
  }));
  
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());  
	
// Database initialization
/*db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='Contracts'",
  function(err, rows) {
	if(err !== null) {
		console.log(err);
	} else if(rows === undefined) {
		db.run('CREATE TABLE "Contracts" ' +
			'("ContractNumber" TEXT PRIMARY KEY, ' +
			'"Client" TEXT, ' +
			'Description TEXT', function(err) {
				if(err !== null) {
					console.log(err);
				} else {
					console.log("SQL Table 'Contracts' initialized.");
				}
			});
	} else {
		console.log("SQL Table 'Contracts' already initialized.");
	}
});*/	

app.set('views', __dirname + '/public');
app.engine('.html', require('jade').__express);

var port = process.env.PORT || 9250;
var host = process.env.HOST || "127.0.0.1";

// Starts the server itself
var server = http.createServer(app).listen(port, host, function() {
  console.log("Server listening to %s:%d within %s environment",
              host, port, app.get('env'));
  
  var contracts = [];
  db.all("SELECT * FROM contracts",
      function(err, rows){
        var i;  
        for(i = 0; i < rows.length; ++i){ 
            console.log(rows[i]);          
            contracts.push(rows[i];
        }
    });
});

var contracts = [];
var components = [];
var users = [];

// We render the templates with the data
app.get('/', function(req, res, next) {

  db.all('SELECT * FROM contracts', function(err, row) {
    if(err !== null) {
        next(err);
    }
    else {
        res.sendfile('/index.html', {root: __dirname })
    }
    });

});


app.get('/reports', function(req, res, next) {

  res.sendfile('/report.html', {root: __dirname })

});

app.post('/login', function(req, res) {
    var username = req.body.userID;
	console.log(req.body);

	var sqlString = 'SELECT * FROM Contracts WHERE Client = "' + username + '";';
	console.log(sqlString);	
	db.all(sqlString, function(err, row) {
		if(err !== null) {
		  next(err);
		}
		else {
		  if(row.length === 0){
			console.log(username + 'not found');
			res.redirect("/");  
		  } else {
			console.log("login " + username);  
			req.session.username = username;
			res.redirect("/reports")  
		  }
		}
  });

});

app.post('/logout', function(req, res) {
    req.session.destroy(function(err){
        if (err) {
            console.log("Error: %s", err);
        }
    });
    res.redirect("/");
});

app.get('/getUsers', function(req, res){
	console.log('/getUsers route');
	users = [];
	db.serialize(function(){
		db.all('SELECT * FROM Contracts', function(err, row) {
		if(err !== null) {
		  next(err);
		} else {

		  var j;
		  for(j = 0; j < row.length; j++){
			  users.push(row[j]);
			  console.log("Push: row[" + j + "]");
			  console.log(row[j]);
		  }

		}  res.send(users); });
	});
	
  	//res.send([]);
	
});

app.get('/getContracts', function(req, res) {
    var username = req.session.username;
	contracts = [];
 
    if (username) {
		var SQLstring = 'SELECT * FROM Contracts WHERE Client = "' + username + '";';
		console.log(SQLstring);
		
		db.all(SQLstring, function(err, row) {
			if(err !== null) {
			  next(err);
			}
			else {
			  console.log("/getcontracts Route...");
			  //console.log(row);
			  //contracts.push(row);
			  
			  	var j;
				for(j = 0; j < row.length; j++){
				  contracts.push(row[j]);
				  console.log("Push: row[" + j + "]");
				  console.log(row[j]);
				}
			}
			res.send(contracts);  
		  });
		  

    } else {
		res.redirect("/");
    }
	//Now do whatever DOM maniplulation is needed
    
});

app.get('/getComponents', function(req, res) {
    var username = req.session.username;
	console.log(req.query.id);
	var contractname = req.query.id; 
	components = [];
    
    if (username) {
        /////////
		var SQLstring = 'SELECT * FROM ContractsComponents JOIN Components ON ContractsComponents.MFR = Components.MFR AND ContractsComponents.MPN = Components.MPN WHERE ContractTitle = "' + contractname + '";';
		
		console.log(SQLstring);
		
		db.all(SQLstring, function(err, row) {
			if(err !== null) {
			  //next(err);
			  console.log(err);
			}
			else {
			  //console.log(row);
			  components.push(row);
			}
			res.send(components);  
		  });
		/////////
    } else {
		res.redirect("/");
    }
    
});