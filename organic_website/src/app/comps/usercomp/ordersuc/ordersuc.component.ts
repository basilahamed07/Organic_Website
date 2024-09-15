import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ordersuc',
  templateUrl: './ordersuc.component.html',
  styleUrl: './ordersuc.component.css'
})
export class OrdersucComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Redirect after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      this.router.navigate(['prodact/orderview']); // Replace '/target-page' with your actual route
    }, 5000);
  }
}