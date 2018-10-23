
import {Request, Response} from "express";
// import { key } from "../config/secrett";
import * as jwt from "jsonwebtoken";
import { Controller } from "./InitController";
import { HttpServer } from '../server/HttpServer';
var mToken;

export class UserController implements Controller {
    public initialize(httpServer: HttpServer): void {
      httpServer.post('/login', this.login.bind(this));
    }

    private async login(req: Request, res: Response): Promise<void> {
      const user = {
        username : req.body.username,
        email : req.body.email,
        roles : req.body.roles
      }
      jwt.sign({user},"secret", { expiresIn: '2d' }, (err, token) => {
        res.json({
          token
        });
      setToken(token);
      userRole();
      });
    }
}

function setToken(token){
  mToken = token;
}
export function getToken(){
  return mToken;
}

export function userRole() {
    // console.log("token"+mToken);
    var authorization = mToken,
                        decoded;    
    decoded = jwt.verify(authorization, "secret");
    // console.log(decoded.user);           
    // console.log("admin"+decoded.user.roles);
    return decoded;
}



