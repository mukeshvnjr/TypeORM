import { Controller } from "./InitController";
import { HttpServer } from '../server/HttpServer';
import { Request, Response } from 'restify'
import { getToken, userRole } from  "./UserController";
import { accountServices } from "../services/AccountServices";

import {getManager} from "typeorm";
import { Account } from '../entity/Account';

const validatorColumn = require('node-input-validator');

export class AccountController implements Controller {

    public initialize(httpServer: HttpServer): void {
        httpServer.post('/accounts', this.accountSaveAction.bind(this));
        httpServer.get('/accounts', this.accountGetAllAction.bind(this));
        httpServer.get('/accounts/:id', this.accountGetByIdAction.bind(this));
        httpServer.put('/accounts/:id', this.accountUpdateByIdAction.bind(this));
        httpServer.del('/accounts/:id', this.accountDeleteByIdAction.bind(this));
        httpServer.post('/accounts/page/:id', this.accountGetByPageAction.bind(this));
    }

    /**
     * Saves given account.
    */
    private async accountSaveAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token] = authorizationHeader;
    
        if (typeof authorizationHeader !== 'undefined') {
    
            if (token != getToken()) {
                res.json(400);
                console.log("User not logged in");
            } else {

                if(userRole().user.roles === "ADMIN"){

                    let validator = new validatorColumn(req.body,{name:'required|string'});
                    validator.check().then(function (matched){
        
                        if(matched) {
                            const newAccount = accountServices.createNewAccount(req.body);
                            res.json({
                                success: true,
                                message:"Successfully Inserted",
                                result: newAccount
                            });
                        }else{
                            res.json({
                                success: false,
                                message:"Please Enter the Name"
                            })
                        }
                    });
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        }else{
            res.json(400);
        }   
    }

    /**
     * Loads all accounts from the database.
    */
    private async accountGetAllAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token]  = authorizationHeader;

        if (typeof authorizationHeader !== 'undefined') {
            if (token != getToken()) {
                res.json({
                    message: "User not logged in"
                });
            } else {

                if(userRole().user.roles === "ADMIN" || "GUEST"){

                    const allAccount = await accountServices.getAllAccount();
                    res.json({
                        success: true,
                        result: allAccount,
                    });
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        } else {
            res.json(400);
        }
    }

    /**
     * Loads account by a given id.
    */
    private async accountGetByIdAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token]  = authorizationHeader;

        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                res.status(400);
                return res.send('User not logged in');
            } else {
                
                if(userRole().user.roles === "ADMIN" || "GUEST"){

                    const accountByID = await accountServices.getAccountById(req.params.id);
                    if(!accountByID){
                        res.status(400);
                        // res.end();
                        res.send('User does not exist');
                        return;
                    }else{
                        res.json({
                            success: true,
                            result: accountByID,
                        });
                    }
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        } else {
            res.json(400);
        }
    }

    /**
    * Loads account by a given id.
    */
    private async accountUpdateByIdAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token]  = authorizationHeader;
        
        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                res.status(400);
                return res.send('User not logged in');
            } else {

                if(userRole().user.roles === "ADMIN"){

                    const accountUpdateByID = await accountServices.updateAccountById({...req.body, id: req.params.id});
                    if(!accountUpdateByID){
                        res.status(404);
                        // res.end();
                        res.send('User does not exist');
                        return;
                    }else{
                        res.json({
                            success: true,
                            message: "Updated Successfully",
                            result: accountUpdateByID
                        });
                    }
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        }else{
            res.json(400);
        }
    }
    
    /**
     * Delete account by a given id.
    */
    private async accountDeleteByIdAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token]  = authorizationHeader;

        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                res.status(400);
                return res.send('User not logged in');
            } else {

                if(userRole().user.roles === "ADMIN"){

                    const deleteAccountByID = await accountServices.deleteAccountById(req.params.id);
                    if (!deleteAccountByID) {
                        res.status(404);
                        // res.end();
                        res.send('User does not exist');
                        return;
                    }else{
                        res.json({
                            success: true,
                            message:"Deleted Successfully"
                        });
                    }
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        }else{
            res.status(400);
        }
    }

    /**
    * Get Account pagination by id.
    */ 
    private async accountGetByPageAction(req: Request, res: Response): Promise<void> {
        var size, skip, pagenumber, pagetotal, fieldlist, filter;
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token] = authorizationHeader;

        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                res.json(400);
                console.log("User not logged in");
            } else{

                if(userRole().user.roles === "ADMIN"){

                    // validator for all fields
                    let validator = new validatorColumn(req.body,{
                        size:'required|integer',
                        page:'required|integer',
                        fieldlist:'required|string',
                        filter:'object'
                    });

                    let validatorf = new validatorColumn(req.body.filter, {
                        wherecondition:'array',
                        wherefilter:'array',
                        ordercondition:'array',
                        havecondition:'array',
                        groupfilter:'array',
                        'wherecondition.*':'string',
                        'wherefilter.*':'string',
                        'orderfilter.*':'string',
                        'havefilter.*':'string',
                        'groupfilter.*':'string'
                    });

                    // console.log("Validations equals: " + req.body.page + "\n" + req.body.size + "\n" + req.body.fieldlist + "\n" + req.body.filter);

                    // validator check
                    validator.check().then(function (matched) {
                        if(!matched) {
                            res.json({
                                message:"Please Check To Make Sure Page, Size, SELECT, And/Or Filter Object Are Correct"
                            });
                            res.end();
                        }
                    })
                    validatorf.check().then(function (matched) {
                        if(!matched) {
                            res.json({
                                message:"Please Check To Make Sure Filter Object Array Is Correct"
                            });
                            res.end();
                        }
                    })

                    filter = req.body.filter;
                    if (filter.wherecondition.length !== filter.wherefilter.length) {
                        res.json({
                            message:"Please Check To Make Sure WHERE Condition/Filter Is Correct"
                        });
                        res.end();
                    }

                    if (filter.ordercondition.length !== filter.orderfilter.length) {
                        res.json({
                            message:"Please Check To Make Sure ORDER Condition/Filter Is Correct"
                        });
                        res.end();
                    }

                    if (filter.havecondition.length !== filter.havefilter.length) {
                        res.json({
                        message:"Please Check To Make Sure HAVE Condition/Filter Is Correct"
                        });
                        res.end();
                    }
                    // get a account repository to perform operations with account
                    const accountRepository = getManager().getRepository(Account);
                    //variables for retry logic
                    var maxNoOfRetries = 3; // maximum 3 retries
                    var timeDelayBetweenRetry = 20000; //20 seconds
                    var currentRetryCount = 0;
                    var currentStatus = "";

                    do {
                        try {
                            console.log("CurrentRetryCount= ", currentRetryCount);
                            // getting account list for help in pagination
                            const acclist = await accountRepository.find();
                            // if account was not found return 404 to the client
                            currentStatus = "success";
                            if (acclist) {
                                console.log("Account Lookup Success");
                                // return loaded accounts
                                const qb = accountRepository.createQueryBuilder("accounts");
                                var acctotal = Object.keys(acclist).length;
                                // pulling page size information
                                size = parseInt(req.body.size);
                                // determines by how many items to skip based on page selection
                                pagenumber = parseInt(req.body.page);
                                pagetotal = Math.ceil(acctotal/size);
                                // logic for page number range
                                if ((pagenumber <= pagetotal) && (pagenumber >= 1)) {
                                    skip = (pagenumber - 1) * size;
                                } else {
                                    res.json({
                                        message: "Requested Page is Unavailable"
                                    })
                                    res.end();
                                    return;
                                }
                                // fieldset criteria
                                fieldlist = String(req.body.fieldlist).split(" ");
                                var datafl = [];
                                for (var i = 0; i < fieldlist.length; i++) {
                                    datafl.push(fieldlist[i]);
                                }
                                // Forming the QueryBuilder
                                qb.select(datafl)
                                // Adding the filter criteria
                                if (filter) {
                                    // checking where filter
                                    if ((filter.wherefilter) && (filter.wherefilter.length !== 0)) {
                                        qb.where(filter.wherefilter[0]);
                                        if (filter.wherecondition.length >= 2) {
                                            for (var i = 1; i < filter.wherefilter.length; i++) {
                                                if (filter.wherecondition[i] === "AND") {
                                                    qb.andWhere(filter.wherefilter[i]);
                                                } else {
                                                    qb.orWhere(filter.wherefilter[i]);
                                                }
                                            }
                                        }
                                    }
                                    // // checking group filter
                                    // if ((filter.groupfilter) && (filter.groupfilter.length !== 0)) {
                                    //   console.log("=======================================");
                                    //   console.log("Group RECOGNIZED: " + filter.groupfilter);
                                    //   console.log("=======================================");
                                    //   qb.groupBy(filter.groupfilter[0]);
                                    //   if (filter.groupfilter.length >= 2) {
                                    //     for (var i = 1; i < filter.orderfilter.length; i++) {
                                    //       qb.addGroupBy(filter.groupfilter[i]);
                                    //     }
                                    //   }
                                    // }
                                    // // checking have filter
                                    // if ((filter.havefilter) && (filter.havefilter.length !== 0)) {
                                    //   qb.having(filter.havefilter[0]);
                                    //   if (filter.havecondition.length >= 2) {
                                    //     for (var i = 1; i < filter.havefilter.length; i++) {
                                    //       if (filter.havecondition[i] === "AND") {
                                    //         qb.andHaving(filter.havefilter[i]);
                                    //       } else {
                                    //         qb.orHaving(filter.havefilter[i]);
                                    //       }
                                    //     }
                                    //   }
                                    // }
                                    // checking order filter
                                    if ((filter.orderfilter) && (filter.orderfilter.length !== 0)) {
                                        qb.orderBy(filter.orderfilter[0], filter.ordercondition[0]);
                                        if (filter.ordercondition.length >= 2) {
                                            for (var i = 1; i < filter.orderfilter.length; i++) {
                                                qb.addOrderBy(filter.orderfilter[i], filter.ordercondition[i]);
                                            }
                                        }
                                    }
                                }
                                // Second logic for page number range
                                var acctotal1 = await qb.getCount();
                                var qptotal = Math.ceil(acctotal1/size);
                                if ((pagenumber <= qptotal) && (pagenumber >= 1)) {
                                    skip = (pagenumber - 1) * size;
                                } else {
                                    res.send("Requested Page is Unavailable");
                                    res.end();
                                    return;
                                }
                                // Finally putting it all together
                                qb.skip(skip).take(size);
                                // Load accounts by body specified parameter
                                const account = await qb.getMany();
                                // if account was not found return 404 to the client
                                if (!account) {
                                    res.status(404);
                                    res.end();
                                    return;
                                }
                                // return loaded account and total page number
                                res.send({"Accounts":account, "Selected Accounts Total":acctotal1, "Selected Pages Total":qptotal, "Accounts Total":acctotal, "Pages Available Total":pagetotal});

                            } else {
                                console.log("No Records Found");
                                res.status(404);
                            }
                        } catch(err) {
                            console.log("Error is caught inside catch: ", err);
                            if (err.code == 'ECONNREFUSED') {
                                currentRetryCount += 1;
                                console.log( "changed currentRetryCount to: ", currentRetryCount);
                                if (currentRetryCount > maxNoOfRetries) {
                                    currentStatus = "failed";
                                    res.status(500);
                                } else {
                                    console.log("Before the timer");
                                    freeze(timeDelayBetweenRetry);
                                    console.log("After the timer");
                                }
                            } else {
                                currentStatus = "failed";
                                res.status(500);
                            }
                        }
                    } while(currentRetryCount <= maxNoOfRetries && currentStatus == "");
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        } else {
            res.json(400);
        }
    }
}

function freeze(time) {
    const stop = new Date().getTime() + time;
    while(new Date().getTime() < stop);
}
