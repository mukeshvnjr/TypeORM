import { ContactController } from './ContactController';
import { AccountController } from './AccountController';
import { PingController } from './pingController';
import { UserController } from './UserController';

export const CONTROLLERS = [
    new ContactController(),
    new AccountController(),
    new PingController(),
    new UserController() 
];
