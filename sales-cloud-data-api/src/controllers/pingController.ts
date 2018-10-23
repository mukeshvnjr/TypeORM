import { HttpServer } from '../server/HttpServer';
import { Controller } from './InitController';

export class PingController implements Controller {
    public initialize(httpServer: HttpServer): void {
        httpServer.get('/', (req, res) => res.send(200, 'hello'));
    }
}
