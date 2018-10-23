import { Controller } from "./InitController";
import {HttpServer} from '../server/HttpServer';
import { Request, Response } from 'restify'
import { getToken, userRole } from  "./UserController";
import { contactServices } from "../services/ContactServices";

import {getManager} from "typeorm";
import { Contact } from '../entity/Contact';

const validatorColumn = require('node-input-validator');

export class ContactController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.post('/contacts', this.contactSaveAction.bind(this));
        httpServer.get('/contacts', this.contactGetAllAction.bind(this));
        httpServer.get('/contacts/:id', this.contactGetByIdAction.bind(this));
        httpServer.put('/contacts/:id', this.contactUpdateByIdAction.bind(this));
        httpServer.del('/contacts/:id', this.contactDeleteByIdAction.bind(this));
        httpServer.post('/contacts/page/:id', this.contactGetByPageAction.bind(this));
    }

    /**
    * Saves given Contact.
    */
    private async contactSaveAction(req: Request, res: Response): Promise<void> {
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
                            const newContact = contactServices.createNewContact(req.body);
                            res.json({
                                success: true,
                                message:"Successfully Inserted",
                                result: newContact
                            });
                        }else{
                            res.json({
                                success: false,
                                message:"Please Enter the Name"
                            })
                        }
                    });
                } else {
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
    * Loads all contact from the database.
    */
    private async contactGetAllAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token]= authorizationHeader;

        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                return res.status(400),
                console.log("User not logged in");
            } else {

                if(userRole().user.roles === "ADMIN" || "GUEST"){

                    const allContact = await contactServices.getAllContact();
                    if(!allContact){
                        res.status(400);
                        res.send('User does not exist');
                        return;
                    }else{
                        res.json({
                            success: true,
                            result: allContact
                        });
                    }
                } else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        }
        else {
            res.json(400);
        }
    }

    /**
    * Loads contact by a given id.
    */
    private async contactGetByIdAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token] = authorizationHeader
    
        if (typeof authorizationHeader !== 'undefined') {
    
            if (token != getToken()) {
                res.json(400)
                console.log("User not logged in");
            } else {

                if(userRole().user.roles === "ADMIN" || "GUEST" ){

                    const getContactByID = await contactServices.getContactById(req.params.id);
                    if (!getContactByID) {
                        res.status(400);
                        res.send('User does not exist');
                        return;
                    }else{
                        res.json({
                            success: true,
                            result: getContactByID
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
        }else {
            res.json(400);
        }
    }

    /**
    * Update contact by a given id.
    */
    private async contactUpdateByIdAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token]  = authorizationHeader;
        
        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                res.json(400)
                console.log("User not logged in");
            } else {

                if(userRole().user.roles === "ADMIN"){

                    const contactUpdateByID = await contactServices.updateContactById({...req.body, id: req.params.id});
                    if(!contactUpdateByID){
                        res.status(400);
                        res.send('User does not exist');
                        return;
                    }else{
                        res.json({
                            success: true,
                            message: "Updated Successfully",
                            result: contactUpdateByID
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
    * Delete contact by a given id.
    */
    private async contactDeleteByIdAction(req: Request, res: Response): Promise<void> {
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token] = authorizationHeader;
    
        if (typeof authorizationHeader !== 'undefined') {
    
            if (token != getToken()) {
                res.json(400);
                console.log("User not logged in");
            } else {

                if(userRole().user.roles === "ADMIN"){

                    const contactDeleteById = await contactServices.deleteContactById(req.params.id);
                    if (!contactDeleteById) {
                        res.status(400);
                        res.send('User does not exist');
                    }else{
                        res.json({
                            success: true,
                            message:"Contact Deleted Successfully",
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
    * Get Contact pagination by id.
    */
    private async contactGetByPageAction(req: Request, res: Response): Promise<void> {
        var size = 10;
        var skip, pagenumber, pagetotal;
        let authorizationHeader = (req.headers.authorization as string).split(' ');
        let [,token] = authorizationHeader;

        if (typeof authorizationHeader !== 'undefined') {

            if (token != getToken()) {
                res.json(400)
                console.log("User not logged in");
            } else{

                if(userRole().user.roles === "ADMIN"){

                    const accountRepository = getManager().getRepository(Contact);
                    const contacts = await accountRepository.find();
                    var contotal = Object.keys(contacts).length;

                    pagenumber = Number(req.params.id);
                    pagetotal = Math.ceil(contotal/size);

                    if ((pagenumber <= pagetotal) && (pagenumber >= 1)) {
                        skip = (pagenumber - 1) * size;
                    } else {
                        res.send("Requested Page is Unavailable");
                        res.end();
                        return;
                    }

                    const contact = await accountRepository.createQueryBuilder("contacts").select(["contacts.id","contacts.name"])
                        .orderBy("contacts.id", "ASC").skip(skip).take(size).getMany();
                    
                    if(!contact) {
                        res.status(404);
                        res.end();
                        return;
                    }
                    res.send(contact);
                }else {
                    console.log("access denied");
                    res.json({
                        success: true,
                        message: "access denied"
                    });
                } 
            }
        }else {
            res.json(400);
        }
    }
}

