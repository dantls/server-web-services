
import http from './app';
import pool from './database/pgconnector';

http.listen(3333, () => {
  console.log("Server is running on port 3333");
  pool.connect(function (err, client, done) {
    if (err) 
      throw new Error();
  }); 
}); 

