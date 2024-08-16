import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MenuController, AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  // backend API endpoint
  private URL = 'http://127.0.0.1:8000/api/profile';
  private URLupdate = 'http://127.0.0.1:8000/api/editProfile';
  private URLdelete = 'http://127.0.0.1:8000/api/deleteProfile';

  // token and user profile
  token: string | null = null;
  userProfile: any = {}; // as an empty object
  selectedOption: string = 'profile'; // default option
  phonePattern: string = "^\\d{10}$"; // phone number validating pattern
  emailPattern: string = "^[a-zA-Z0-9._%+-]+@gmail\\.com$";

  constructor(
    private http: HttpClient,
    private router: Router,
    private menu: MenuController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // get the token from localStorage
    this.token = localStorage.getItem('token');
    if (this.token) {
      // fetch user profile if token exists
      this.getUser();
    } else {
      // redirect to login if no token found
      // alert('No token found, please log in');
      this.router.navigate(['']);
    }
  }

  //toggle menu
  menuToggle(){
    this.menu.toggle();
  }

  // get user profile data
  getUser() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}` // token
    });

    this.http.get(this.URL, { headers }).subscribe(
      (response: any) => {
        // store user profile data
        this.userProfile = response.data;
        console.log('User profile fetched successfully', this.userProfile);
      },
      (error) => {
        console.error('Error fetching user profile', error);
        this.presentToast('Error Occured!');
        this.router.navigate(['']);
      }
    );
  }

  saveProfile(){
    //headers
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}` // token
    });

    //update data
    this.http.put(this.URLupdate, this.userProfile, { headers }).subscribe(
      (response: any) => {
        this.presentToast('Update Successful!');
        this.router.navigate(['profile']);
      },
      (error) => {
        console.error('Error fetching user profile', error);
        this.presentToast('Error Occured!');
        this.router.navigate(['']);
      }
    );
  }

  // set the selected option to display different views
  setOption(option: string) {
    this.selectedOption = option;
    this.menuToggle(); //calling menu toggle when option
  }

  // logout
  logout() {
    // remove token and redirect
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

  deleteProfile(){
     //headers
     const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}` // token
    });

    this.http.delete(this.URLdelete, { headers }).subscribe(
      (response: any) => {
        console.log('User profile deleted successfully');
        localStorage.removeItem('token');
        this.router.navigate(['']);
      },
      (error) => {
        console.error('Error fetching user profile', error);
        this.presentToast('Error Occured!');
        this.router.navigate(['']);
      }
    );
  }


  async presentLogoutAlert() {
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'Do you really want to log out?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelled');
          },
        },
        {
          text: 'Logout',
          role: 'destructive',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  async presentDeleteAlert(){
    const alert = await this.alertController.create({
      header: 'Are you sure?',
      message: 'This action is irreversible!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Logout cancelled');
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: () => {
            this.deleteProfile();
          },
        },
      ],
    });

    await alert.present();
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
