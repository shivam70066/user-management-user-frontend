import { Component, inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2'
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SignUpResponseData, signupData } from '../../interfaces/interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatRadioModule,
    HttpClientModule, MatIconModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hide: boolean = false;
  signUpData?: signupData;
  authsevices: AuthService = inject(AuthService);


  constructor(private builder: FormBuilder, private router: Router,
    private toastr: ToastrService) {
  }
  userform = this.builder.group({
    name: this.builder.control('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,}')]),
    email: this.builder.control('', [Validators.required, Validators.email],),
    password: this.builder.control('', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
    number: this.builder.control('', [Validators.required, Validators.pattern('.{10,10}')]),
    gender: new FormControl('male', [Validators.required])
  });


  valid: boolean = false;


  save() {
    this.signUpData = {
      name: this.userform.value.name as string,
      email: this.userform.value.email as string,
      password: this.userform.value.password as string,
      gender: this.userform.value.gender as string,
      number: this.userform.value.number as unknown as number,
    }
    console.log(this.signUpData)
    this.authsevices.signup(this.signUpData).subscribe({
      next: (resp: SignUpResponseData) => {
        this.registered();
      },
      error: (error: any) => {
        if (error.status == 403) {
          this.showEmailAlreadyRegisterd();
        }
        else
        console.log("Error: "+ error)
      }
    })
  }

  registered() {
    Swal.fire({
      title: 'Registered',
      icon: 'success',
      confirmButtonText: 'Go to login'
    }).then(() => {
      this.router.navigate(['../login']);
    });
  }

  showEmailAlreadyRegisterd() {
    this.toastr.error('Email already taken.');
  }
}
