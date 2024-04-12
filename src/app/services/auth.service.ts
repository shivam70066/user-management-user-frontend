import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginData, LoginResponseData, SignUpResponseData, signupData } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http:HttpClient = inject(HttpClient);
  constructor() {}

  login(data:LoginData){
    return this.http.post<LoginResponseData>("http://localhost:3000/user/auth/login",data);
  }
  signup(data:signupData){
    return this.http.post<SignUpResponseData>("http://localhost:3000/user/auth/signup",data);
  }
}
