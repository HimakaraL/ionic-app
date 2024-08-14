import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;

  private URL = 'http://127.0.0.1:8000/api/register';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.regForm = this.formBuilder.group({
      first_name: null,
      last_name: null,
      email: null,
      password: null,
      status: null,
      phone_no: null,
    });
  }

  handleRegister() {
    this.http.post(this.URL, this.regForm.value).subscribe(
      (response) => {
        console.log(this.regForm);
        console.log('Registration successful', response);
        alert('Success register');
        this.router.navigate(['/']); // Redirect to home after registration
      },
      (error) => {
        console.error('Error occurred during registration', error);
      }
    );
  }
}
