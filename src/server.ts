import errorHandler from "errorhandler";
import { createConnection } from "typeorm";
//dotenv
import * as dotenv from "dotenv";
dotenv.config();

import app from "./app";

/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());
const dbConnectionName = process.env.DB_CONNECTION_NAME;
console.log("connecting to ",dbConnectionName);
createConnection(dbConnectionName).then(() => {
    // db is up and running 
    /**
 * Start Express server.
 */
    const server = app.listen(app.get("port"), () => {
        console.log(
            "  App is running at http://localhost:%d in %s mode",
            app.get("port"),
            app.get("env")
        );
        console.log("Press CTRL-C to stop\n");
    });
}).catch(err=>{
    console.log("Cannot connect database",err);

});


