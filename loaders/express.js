/* imports */
require('dotenv').config();
const express = require('express');
const compression = require('compression');
const logger = require("../util/loggers");
const userRoute = require('../routes/users');
const articleRoute = require('../routes/article');
require('color');

/* class to initiate express middlewares*/
class ExpressLoader{
    constructor(){
        const app = express();

        //app.use(ExpressLoader.expressLoader);

        app.use(compression());
        app.use(express.json());
        app.use(express.urlencoded({ extended: false}));

        app.use((req, res, next) => {
          res.setHeader( "Access-Control-Allow-Origin", "*");
          res.setHeader( 
              "Access-Control-Allow-Methods", 
              "GET, POST, PATCH, DELETE, PUT, OPTIONS"
          );
          res.setHeader( 
              "Allow-Control-Allow-Headers", 
              "X-Requested-With, content-type, x-access-token, authorization"
          );
          res.setHeader( "Allow-Control-Access-Credentials", true);
          res.removeHeader("X-Powered-By");
          next();
      });

      app.get('/api', () => {
        return res.status(200).send("<h1> Welcome to Article Api Page </h1>")
      });

        /* routes calling */
        app.use("/api/users", userRoute);
        app.use("/api/article", articleRoute);

        /* ports variable */
        let port = process.env.PORT || 3000;

        /* notify user of express start */
        this.server = app.listen(port, () => {
            logger.info(`Express running, now listening on port ${port}`);
            console.log(`Express running, now listening on port ${port}`,);
        });
    }

    get Server () {
        return this.server;
    }

    static errorHandler ( error, req, res, next ){
        let parsedError;

            // Attempt to gracefully parse error object
      try {
        if ( error && typeof error === "object" ) {
          parsedError = JSON.stringify( error );
        } else {
          parsedError = error;
        }
      } catch ( e ) {
        logger.error( e );
      }
  
      // Log the original error
      logger.error( parsedError );
  
      // If response is already sent, don't attempt to respond to client
      if ( res.headersSent ) {
        return next( error );
      }
  
      res.status( 400 ).json( {
        success: false,
        error
      } );  
    }
}

/* exports*/
module.exports = ExpressLoader;