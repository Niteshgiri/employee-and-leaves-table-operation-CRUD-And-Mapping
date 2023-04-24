const mysql=require('mysql');
const config=require("../DB/config");

const connection=mysql.createConnection({

    host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
})

connection.connect(err => {
    if(err) throw err;
    console.log("Mysql connected");
});



class Database {
  constructor( config ) {
      this.connection = mysql.createConnection( config );
  }
  query( sql, args ) {
      return new Promise( ( resolve, reject ) => {
          this.connection.query( sql, args, ( err, rows ) => {
              if ( err )
                  return reject( err );
              resolve( rows );
          } );
      } );
  }
  close() {
      return new Promise( ( resolve, reject ) => {
          this.connection.end( err => {
              if ( err )
                  return reject( err );
              resolve();
          } );
      } );
  }
}

module.exports=connection;