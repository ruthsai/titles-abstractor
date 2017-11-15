import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }
  
  syncMessage(msg: string) {
      return this.socket
          .fromEvent<any>(msg)
          .map(data => data.msg );
  }

  unsubscribeMessage(msg: string){
      this.socket.removeAllListeners(msg);
  }

}
