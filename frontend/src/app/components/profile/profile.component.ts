import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  
  // backend API endpoint
  private URL = 'http://127.0.0.1:8000/api/profile';

  // token and user profile
  token: string | null = null;
  userProfile: any = {}; //as an empty object

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    // get the token from localStorage
    this.token = localStorage.getItem('token');
    if (this.token) {
      // fetch user profile if token exists
      this.getUser();
    } else {
      // redirect to login if no token found
      alert('No token found, please log in');
      this.router.navigate(['/login']);
    }
  }

  // get user profile data
  getUser() {
    const headers = new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${this.token}` //token
    });

    this.http.get(this.URL, { headers }).subscribe(
      (response: any) => {
        // store user profile data
        this.userProfile = response.data;
        console.log('User profile fetched successfully', this.userProfile);
      },
      (error) => {
        console.error('Error fetching user profile', error);
        alert('Failed to fetch user profile');
        //if error happens
        this.router.navigate(['/login']);
      }
    );
  }
}
