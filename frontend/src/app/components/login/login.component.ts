import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {
  public form={
    email: null,
    password: null
  }


  constructor() { }

  ngOnInit() {}

  submitLogin() {
    // Handle the form submission
    console.log(this.form);
  }
}