import { Injectable } from '@angular/core';
import { AbstractService } from './abstract-service';
import { Rating } from '../interface/rating';
import { HttpClient } from '@angular/common/http';

@Injectable({ 
  providedIn: 'root',
})
export class RatingService extends AbstractService<Rating> {
  protected override endpoint: string = 'ratings'; 

  constructor(http: HttpClient) {
    super(http);
  }
}