import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  //declaring as a form-group
  regForm!: FormGroup;

  //backend api endpoint
  private URL = 'http://127.0.0.1:8000/api/register';

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    //form initializing
    this.regForm = this.formBuilder.group({
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]], //an email validating
      password: [null, [Validators.required]],
      status: [null, [Validators.required]],
      phone_no: [null, [Validators.required]],  //check as a 10 digit number
    });
  }

  //Register
  handleRegister() {
    //post request
    if(this.regForm.valid){
    this.http.post(this.URL, this.regForm.value).subscribe(
      (response) => {
        this.presentToast('Registration Succesful!');
        this.router.navigate(['/']); // redirect to home after registration
      },
      (error) => {
        this.presentToast('Invalid form inputs!');
        console.error('Error occurred during registration', error);
      }
    );} else {
      console.log('Form is Invalid');
      this.presentToast('Invalid form inputs!');
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
