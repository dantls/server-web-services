
import http from './app';
import pool from './database/pgconnector';

http.listen(3335, () => {
  console.log("Server is running on port 3335");
  pool.connect(function (err, client, done) {
    if (err) 
      throw new Error();
  }); 
}); 

