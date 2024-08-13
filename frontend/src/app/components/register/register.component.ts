import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  public form={
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    status: null,
    phone_no: null
  }

  private URL = 'http://127.0.0.1:8000/api/register';

  constructor(private router: Router) { }

  ngOnInit() {}

  async handleRegister(){
    try {
      const response = await axios.post(this.URL, this.form);
      console.log(this.form);
      console.log(response.data);
      // this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
    }
    
  }
}
