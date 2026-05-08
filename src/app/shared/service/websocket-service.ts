import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {

  private client!: Client;

  private messagesSubject = new BehaviorSubject<any>(null);
  public messages$ = this.messagesSubject.asObservable();

  connect(): void {
    this.client = new Client({
      webSocketFactory: () => new SockJS('http://localhost:8080/ws'),

      reconnectDelay: 5000,

      onConnect: () => {
        console.log('✅ Conectado');

        this.client.subscribe('/topic/notifications', (message: IMessage) => {
          console.log('📩 RAW:', message.body);
          this.messagesSubject.next(JSON.parse(message.body));
        });
      },

      onStompError: (frame) => {
        console.error('Erro STOMP:', frame);
      },

      onWebSocketError: (error) => {
        console.error('Erro WebSocket:', error);
      }
    });

    this.client.activate();
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
    }
  }
}