import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fruits',
  templateUrl: './fruits.component.html',
  styleUrls: ['./fruits.component.css']
})
export class FruitsComponent implements OnInit {
  cardData: any[] = [];
  cart_product_ids: any[] = [];
  quantities: any[] = [];
  showSuccessPopup: boolean = false;
  existingCartIds: any[] = [];  // To store existing cart product IDs

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const access = sessionStorage.getItem("access");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access}`
    });

    // Fetching product data
    this.http.get('http://127.0.0.1:8000/api/Product_Table/', { headers }).subscribe(
      (response: any) => {
        this.cardData = response;
        // Initialize each product's quantity to 1
        this.cardData.forEach(product => {
          product.quantity = 1;
        });
      },
      (error: any) => {
        console.error('Error when fetching product data:', error);
      }
    );

    // Fetching user cart data
    this.http.get('http://localhost:8000/api/users/get_user', { headers }).subscribe(
      (response: any) => {
        this.existingCartIds = response.data.cart_product_ids;
        console.log("Existing cart product IDs:", this.existingCartIds);

        // Initialize quantities to 1 for existing cart products
        this.existingCartIds.forEach(id => {
          if (!this.cart_product_ids.includes(id)) {
            this.cart_product_ids.push(id);
            this.quantities.push(1);
          }
        });
      },
      (error: any) => {
        console.error('Error when fetching user data:', error);
      }
    );
  }

  updateQuantity(product: any, change: number) {
    if (product.quantity + change >= 1) {
      product.quantity += change;
    }
  }

  addToCart(product: any) {
    const productId = product.id;
    const productQuantity = product.quantity;

    // Check if the product is already in the cart
    const existingIndex = this.cart_product_ids.indexOf(productId);

    if (existingIndex === -1) {
      // Product is not in the cart, add it with default quantity 1
      this.cart_product_ids.push(productId);
      this.quantities.push(productQuantity || 1); // Default quantity to 1 if not specified
    } else {
      // Product is already in the cart, update its quantity
      this.quantities[existingIndex] = productQuantity;
    }

    // Combine cart_product_ids with existingCartIds while avoiding duplicates
    const allProductIds = new Set([...this.cart_product_ids, ...this.existingCartIds]);

    // Convert the Set back to an array
    const uniqueProductIds = Array.from(allProductIds);

    // Prepare the payload
    const payload = {
      cart_product_ids: uniqueProductIds,
      quantities: this.quantities.slice(0, uniqueProductIds.length) // Ensure quantities matches length of IDs
    };

    const access = sessionStorage.getItem("access");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${access}`
    });

    // Posting data to Django API
    console.log('Payload:', payload);
    this.http.patch('http://127.0.0.1:8000/api/users/get_user', payload, { headers })
      .subscribe(response => {
        this.showSuccessPopup = true;
        console.log("Product quantity updated:", response);
      }, error => {
        console.error("Error updating cart:", error);
      });
  }

  // Close the popup
  closePopup() {
    this.showSuccessPopup = false;
  }
}
