import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  data: any; // To hold the user profile data
  access: string | null = sessionStorage.getItem("access");

  constructor(private apiService: GenericApiService, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    if (!this.access) {
      console.error('No access token found');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${this.access}`
    };

    this.apiService.get('users/get_user', { headers }).subscribe(
      (response: any) => {
        this.data = response; // Store the fetched data
        console.log('Data fetched successfully', this.data);
      },
      error => {
        console.error('Error fetching data', error);
        alert('Error fetching data. Please try again.');
      }
    );
  }

  logout(): void {
    // Show a confirmation dialog to the user
    const confirmed = window.confirm('Are you sure you want to log out?');
  
    // If user confirms, proceed with logging out
    if (confirmed) {
      sessionStorage.clear(); // Clear session storage
      this.router.navigate(['/login']); // Redirect to login page
    }
  }
  
}
