import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from '../interface/apiResponse';
import { environment } from '../../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatbotService {
    protected baseUrl: string = environment.apiUrl;

    constructor(protected http: HttpClient) { }

    initChatbot(): Observable<ApiResponse<any>>{
      return this.http.get<ApiResponse<any>>(`${this.baseUrl}/chatbot`);
    }

    sendMessage(requestDto: any): Observable<ApiResponse<any>> {
      return this.http.post<ApiResponse<any>>(`${this.baseUrl}/chatbot`, requestDto);
    }
}
