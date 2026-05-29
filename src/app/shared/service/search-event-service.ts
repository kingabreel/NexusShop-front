import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EventService {

    private searchSource = new Subject<string>();

    search$ = this.searchSource.asObservable();

    emitSearch(value: string) {
        this.searchSource.next(value);
    }
}