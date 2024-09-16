import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for better notifications

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.scss']
})
export class NewloginComponent implements OnInit {
  @ViewChild('container') container!: ElementRef;

  signupForm: FormGroup;
  loginForm: FormGroup;
  isSignUp = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required]],
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]], // Added validation
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],  // Added validation
      phone_number: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    }, { validators: this.passwordMatchValidator });

    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  // Toggle between sign-up and login forms
  toggleForm(): void {
    this.isSignUp = !this.isSignUp;
    this.container.nativeElement.classList.toggle('right-panel-active');
  }

  // For sign-in form
  signIn(): void {
    this.container.nativeElement.classList.remove('right-panel-active');
  }

  // For sign-up form
  signUp(): void {
    this.container.nativeElement.classList.add('right-panel-active');
  }

  private passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('confirm_password')?.value
      ? null : { mismatch: true };
  }

  async onSignUp(): Promise<void> {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const signupData = {
      ...this.signupForm.value,
      first_line: 'temp',
      city: 'temp',
      state: 'temp',
      pincode: 'temp',
      cart_product_ids: [],
      quantities: []
    };

    try {
      const response: any = await this.http.post('http://localhost:8000/api/users/register', signupData).toPromise();
      console.log('Signup successful:', response);
      sessionStorage.setItem('access', response.access);
      sessionStorage.setItem('user_id', response.user_id); // Ensure your API returns user_id
      this.router.navigate(['/signin']); // Redirect to home page or login page based on your requirement
    } catch (error: any) {
      console.error('Signup failed:', error);
      this.snackBar.open('Signup failed: ' + error.error.message, 'Close', { duration: 5000 });
    }
  }

  async onLogin(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const loginData = this.loginForm.value;

    try {
      const loginResponse: any = await this.http.post('http://localhost:8000/api/token/', loginData).toPromise();
      console.log('Login successful:', loginResponse);
      sessionStorage.setItem('access', loginResponse.access);
      sessionStorage.setItem('email', loginData.username);
      
      const access = sessionStorage.getItem("access");
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${access}`
      });

      const userResponse: any = await this.http.get('http://localhost:8000/api/users/get_user', { headers }).toPromise();
      sessionStorage.setItem("user_id", String(userResponse.data.id));
      
      if (loginData.username === "admin@gmail.com") {
        this.router.navigate(['/admindash']);
      } else {
        this.router.navigate(['/home']);
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      this.snackBar.open('Login failed: username or password is invalid', 'Close', { duration: 5000 });
    }
  }
}
