const os = require("os");

 function getCon(){
  //Connecting - if the file does not exist it will be created
  var sqlite = require('sqlite-sync'); //requiring
 
  let path = os.homedir().replace(/\\/g , "/") + "/.test/db/test.db"

  sqlite.connect(path); 
  return sqlite;
}

   async function createDb(){
    let sqlite = getCon();
    //Creating table - you can run any command
    await sqlite.run("CREATE TABLE tbl_address(idAdd INTEGER PRIMARY KEY AUTOINCREMENT," + 
    " name VARCHAR(50) NOT NULL," + 
    " street VARCHAR(50) NOT NULL," + 
    " hnr INTEGER NOT NULL," + 
    " plz VARCHAR(5)," +
    " city VARCHAR(50) NOT NULL," +
    " createdOn DATE NOT NULL," + 
    " UNIQUE(name));" +
   
              " CREATE TABLE tbl_route(idRoute INTEGER PRIMARY KEY AUTOINCREMENT," +
                " startLocation INTEGER NOT NULL," + 
                " destination INTEGER NOT NULL," +
                " km DOUBLE NOT NULL," +
                " UNIQUE(startLocation, destination)," + 
                " FOREIGN KEY (startLocation) REFERENCES tbl_address(idAdd)," +
                " FOREIGN KEY (destination) REFERENCES tbl_address(idAdd));" + 
                
                      " CREATE TABLE tbl_driven_rout(idDrivenRoute INTEGER PRIMARY KEY AUTOINCREMENT," +
                      " idRoute INTEGER NOT NULL," +
                      " drivenAt DATE NOT NULL," +
                      " FOREIGN KEY (idRoute) REFERENCES tbl_route(idRoute));",function(res){
      if(res.error){
        alert(res.error);
        throw res.error;
       }
      console.log(res);
    });
    sqlite.close;
    console.log("DB Created")
  }

  exports.insertAddress =  function(address){
    let id
    console.log(address.name+" " + address.street + " " + address.hnr + " " + address.plz + " " + address.city + " " + address.createdOn);
    console.log(address);
    let sqlite = getCon();
    console.log(sqlite);
    sqlite.run("INSERT INTO tbl_address VALUES (?,?,?,?,?,?,?)", 
    [null,address.name, address.street, address.hnr,address.plz, address.city, address.createdOn], function(res){
    if(res.error){
      throw res.error;
    }id = res;
  console.log(res);
   });
    sqlite.close;
    return id;
 };


 

 //check if the database exist when not they will create
 exports.initDb = function(){
  const fs = require("fs");

  //= "./db/test.db";
  

let homedir = os.homedir().replace(/\\/g , "/") +  "/.test"

alert(homedir)
 

 if (fs.existsSync(homedir)) {
  // path exists
 alert("exists:", homedir);
} else {
 alert("DOES NOT exist:", homedir);
  fs.mkdirSync(homedir);
}

homedir += "/db"

if (fs.existsSync(homedir)) {
  // path exists
 alert("exists:", homedir);
} else {
 alert("DOES NOT exist:", homedir);
  fs.mkdirSync(homedir);
}


 let path = homedir+ "/test.db";
  if (fs.existsSync(path)) {
    // path exists
    console.log("exists:", path);
  } else {
    console.log("DOES NOT exist:", path);
    createDb();
  }
 };

 

 exports.getAllAddresses =  function() {

  let sqlite = getCon();
  let req;
  let values =  sqlite.runAsync("SELECT * FROM tbl_address", function(rows){
 req= rows;
   });
  
  sqlite.close;
 
  return req;
 }

 exports.getById = function(id) {
   let sqlite = getCon();
   let req;
   var values = sqlite.run("SELECT * FROM tbl_address WHERE id = ?",[id], function(rows){
     req  = rows;
   });
   sqlite.close;
   return req;
  
 }

 //Routes 
 //----------------------------------------------------------------
 exports.insertTrack = function(start,ziel, km){
  let id;
  let sqlite = getCon();
  sqlite.run("INSERT INTO tbl_route VALUES (?,?,?,?)",[null,start,ziel, km], function(res){
    if ( res.error){
      throw res.error;
    }id = res;
   });
   sqlite.close;
   return id;

  }

  exports.getAllRoutes =  function() {

    let sqlite = getCon();
    let req;
    let values =  sqlite.runAsync("SELECT * FROM tbl_route", function(rows){
   req= rows;
     });
    
    sqlite.close;
   console.log(req);
    return req;
   }
 


exports.getFullRoutes = function(){
  let sqlite = getCon();
  let req;
  var values = sqlite.run("SELECT idRoute,  startId, startName, startStr, startHnr,startPlz, startOrt, zielId, zielName, zielStr, zielHnr, zielPlz, zielOrt ,km" +
  " FROM tbl_route, (SELECT idAdd as startId ,name as startName, street as startStr, hnr as startHnr, plz as startPlz, city as startOrt from tbl_address)," +
  " (SELECT idAdd as zielId, name as zielName, street as zielStr, hnr as zielHnr, plz as zielPlz, city as zielOrt from tbl_address)" +
  " WHERE startLocation = startID and destination = zielId;" 
  , function(rows){
  if (rows.error){
    alert (rows.error);
    throw rows.error;
  }
   req  = rows;
 });
 sqlite.close;

 return req;
}

  
//Driven Routes
//-------------------------------------------------------------

exports.insertDrivenRoute = function(array, date){
  let sqlite = getCon();
  for (let i = 0; i < array.length; i++){
   
    sqlite.run("INSERT INTO tbl_driven_rout VALUES (?,?,?)",[null,array[i],date], function(res){

        if ( res.error){
          throw res.error;
        }
    }
   );
  
 }
 sqlite.close
   
  }

exports.getDrivenRoutesByDate = function( date){
  aler("getDrivenRoutesByDate");
  let sqlite = getCon();
  let req;
  sqlite.run("Select idRoute from tbl_driven_rout WHERE drivenAt = ?;",[date], function(res){
    if ( res.error){
      throw res.error;
    }
    req = row;
  });
  sqlite.close;
  return req;
}

exports.getDrivenTracksByMonthAndYear = function(string){
  let array = string.split("-");

  alert("getDrivenTracksByMonthAndYear\n y: " + array[0] + "\nm: " + array[1])

  let sqlite = getCon();
  let req;
  var values = sqlite.run("SELECT idDrivenRoute, km FROM tbl_driven_rout,tbl_route WHERE strftime('%Y',drivenAt)= ? AND strftime('%m',drivenAt)= ? AND tbl_driven_rout.idRoute = tbl_route.idRoute",[array[0],array[1]], function(rows){
  if (rows.error){
    alert (rows.error);
    throw rows.error;
  }
   req  = rows;
 });
 sqlite.close;

 return req;
}

exports.getDrivenTracksByYear = function(string){
 let sqlite = getCon();
 let req;
 var values = sqlite.run("SELECT * FROM tbl_driven_rout WHERE strftime('%Y',drivenAt)= ?",[string], function(rows){
 if (rows.error){
   alert (rows.error);
   throw rows.error;
 }
  req  = rows;
});
sqlite.close;

return req;
}





exports.getFullDrivenTracksByDate = function(date){
 let arry = date.split(".");
 date = arry[2] + "-" + arry[1] + "-" + arry[0];
 let sqlite = getCon();
 let req;
 var values = sqlite.run("SELECT tbl_driven_rout.idRoute, startId, startStr, startHnr,startPlz, startOrt, zielId, zielStr, zielHnr, zielPlz, zielOrt ,km" +
 " FROM tbl_route,tbl_driven_rout, (SELECT idAdd as startId ,street as startStr, hnr as startHnr, plz as startPlz, city as startOrt from tbl_address)," +
 " (SELECT idAdd as zielId ,street as zielStr, hnr as zielHnr, plz as zielPlz, city as zielOrt from tbl_address)" +
 " WHERE startLocation = startID and destination = zielId AND tbl_route.idRoute = tbl_driven_rout.idRoute and drivenAt = ?;" ,[date]
 , function(rows){
 if (rows.error){
   alert ("getFullDrivenTracksByDate(date) " + rows.error );
   throw rows.error;
 }
  req  = rows;
});
sqlite.close;

return req;
}

  /*
  //Inserting - this function can be sync to, look the wiki
  sqlite.insert("COMPANYS",{NAME:"My COMPANY"}, function(res){
    if(res.error)
      throw res.error;
    console.log(res);
  });
  
  //Updating - returns the number of rows modified - can be async too
  var rows_modified = sqlite.update("COMPANYS",{NAME:"TESTING UPDATE"},{ID:1});
  
  //Create your function
  function test(a,b){
    return a+b;
  }
  
  //Add your function to connection
  sqlite.create_function(test);
  
  // Use your function in the SQL
  console.log(sqlite.run("SELECT ID, test(NAME, ' Inc') as NAME FROM COMPANYS"));
  
  // Closing connection 
  sqlite.close();
  }

*/



