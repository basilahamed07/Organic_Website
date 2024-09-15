import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // This method should check if the user is authenticated
  isAuthenticated(): boolean {
    // Replace with real authentication check
    return !!localStorage.getItem('email');
  }
}
