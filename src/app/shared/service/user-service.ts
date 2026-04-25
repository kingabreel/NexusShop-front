import { Injectable } from '@angular/core';
import { User } from '../interface/user';
import { AbstractService } from './abstract-service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService extends AbstractService<User> {
  protected override endpoint: string = 'user';

  constructor(http: HttpClient) {
    super(http);
  }
}
