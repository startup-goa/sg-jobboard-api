import passport from "passport";
import passportLocal from "passport-local";
import passportFacebook from "passport-facebook";
import _ from "lodash";

// import { User, UserType } from '../models/User';
import { Request, Response, NextFunction } from "express";

const LocalStrategy = passportLocal.Strategy;


