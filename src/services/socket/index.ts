import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

type Message = unknown;
export class Socket {
    socket;
    private url;

    constructor(url: string, path?: string){
        this.socket = io.io(url, {
            transports: ["websocket"],
            forceNew: true,
            path: path || '',
        });
        this.url = url;
    }

    public connect() {
       this.socket.connect();
       console.log('connected');
    }

    public disconnect() {
       this.socket.close();
    }

    public send(message: Message): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<Message> {
        return new Observable<Message>(observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
    }

    public onEvent(event: string): Observable<any> {
        console.log('start to listen ' + event);
        return new Observable<string>(observer => {
            this.socket.on(event, (data) => observer.next(data));
        });
    }
}