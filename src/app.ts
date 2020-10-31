import express, { NextFunction } from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import path from "path";
import {createConnection} from "typeorm";
import cors =  require("cors");
import { IndexRouter } from "./controllers";

// Create Express server
const app = express();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.options("*", cors());
app.use(cors());

app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});

app.use(
    express.static(path.join(__dirname, "public"), { maxAge: 31557600000 })
);

/**
 * Primary app routes examples
 */
// app.get("/", homeController.index);
// app.get("/login", userController.getLogin);
// app.post("/login", userController.postLogin);
// app.get("/logout", userController.logout);
// app.get("/forgot", userController.getForgot);

/**
 * API examples routes.
 */
app.get("/", (req: express.Request, res: express.Response)=>{
    res.send("API working");
});
 app.use("/api", IndexRouter);
app.use("/test", (req, res, next) => {
    const body = req.body;
    body.date = new Date(req.body.date).toString();
    res.send(body);
});
//error handler, write all logic above this middleware
app.use(function (err: any, req: express.Request, res: express.Response, next: NextFunction) {
    res.status(500).send({ error: "Something went wrong" });
});

export default app;
