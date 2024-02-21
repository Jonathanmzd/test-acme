import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isLoggedIn: boolean = false;

  constructor() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }
}
