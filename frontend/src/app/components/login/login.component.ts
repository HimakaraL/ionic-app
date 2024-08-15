import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private router: Router,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    //form initializing
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]], //validating
      password: [null, [Validators.required]],
    });
  }

  //Login
  handleLogin(){
    if(this.loginForm.valid){
    this.http.post(this.URL, this.loginForm.value).subscribe(
      (response: any) => {
        this.presentToast('Login Successful!');
        localStorage.setItem('token', response.token);
        this.router.navigate(['profile']); // redirect to home after registration
      },
      (error) => {
        console.error('Error occurred during registration', error);
        this.presentToast('Invalid inputs!');
      }
    );
  } else {
    console.log('Check credentials!');
    this.presentToast('Invalid inputs!');
  }
  }

  async presentToast(message: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
}
