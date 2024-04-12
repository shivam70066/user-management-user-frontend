import { LoginData, LoginResponseData } from './../../interfaces/interface';

import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule,
    MatRadioModule, HttpClientModule, RouterLink, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData?: LoginData;
  hide: boolean = false;
  authServices : AuthService = inject(AuthService);


  constructor(private builder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router) {
      // this.isLogin();
    }

    userform = this.builder.group({
      email: this.builder.control('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]),
      password: this.builder.control('', Validators.required)
    });

    login(){
      this.loginData = {
        email: this.userform.value.email as string,
        password: this.userform.value.password as string
      }
      this.authServices.login(this.loginData).subscribe({
        next: (resp : LoginResponseData)=>{
          this.router.navigate(['../home']);
          localStorage.setItem('token', "Bearer "+resp.token);
          this.toastr.success("Login successfully")
        },
        error: (error) => {
          if (error.status == 401) {
            this.showError();
            return
          }
          alert("Server issue")
        }
      })
    }

    showError(){
      this.toastr.error("Wrong Credentials!")
    }
}
