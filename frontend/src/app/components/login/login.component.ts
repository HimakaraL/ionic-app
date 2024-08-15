import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  //declaring loginForm
  loginForm!: FormGroup;

   //backend api endpoint
   private URL = 'http://127.0.0.1:8000/api/login';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    //form initializing
    this.loginForm = this.formBuilder.group({
      email: null,
      password: null,
    });
  }

  //Login
  handleLogin(){
    this.http.post(this.URL, this.loginForm.value).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        localStorage.setItem('token', response.token);
        alert('Success login');
        this.router.navigate(['profile']); // redirect to home after registration
      },
      (error) => {
        console.error('Error occurred during registration', error);
      }
    );
  }
}
