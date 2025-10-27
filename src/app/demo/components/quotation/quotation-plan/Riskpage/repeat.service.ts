import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepeatService {

  constructor() { }
  addRequested = new Subject<void>();
  removeRequested = new Subject<void>();

  requestAdd() {
    this.addRequested.next();
  }
  requestRemove() {
    this.removeRequested.next();
  }
}
