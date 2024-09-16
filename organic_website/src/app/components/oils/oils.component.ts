import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oils',
  templateUrl: './oils.component.html',
  styleUrls: ['./oils.component.css']
})
export class OilsComponent implements OnInit {
  cardData: any[] = [];
  cart_product_ids: any[] = [];
  quantities: any[] = [];
  showSuccessPopup: boolean = false;
  card_id: any[] = [];
  existingQuandities:any[]=[];

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
        this.card_id = response.data.cart_product_ids;
        console.log("Existing cart product IDs:", this.card_id);

        // Initialize quantities for existing cart products
        let i=0;
        this.card_id.forEach(id => {
          if (!this.cart_product_ids.includes(id)) {
            this.cart_product_ids.push(id);
            this.existingQuandities = response.data.quantities;
            this.quantities.push(this.existingQuandities[i]); // Default quantity to 1
            i+=1;
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
      // Product is not in the cart, add it
      this.cart_product_ids.push(productId);
      this.quantities.push(productQuantity || 1); // Default quantity to 1 if not specified
    } else {
      // Product is already in the cart, update its quantity
      this.quantities[existingIndex] = productQuantity;
    }

    // Combine cart_product_ids with card_id while avoiding duplicates
    const allProductIds = new Set([...this.cart_product_ids, ...this.card_id]);

    // Convert the Set back to an array
    const uniqueProductIds = Array.from(allProductIds);

    // Ensure the quantities array matches the length of uniqueProductIds
    const uniqueQuantities = uniqueProductIds.map(id => {
      const index = this.cart_product_ids.indexOf(id);
      return index !== -1 ? this.quantities[index] : 1;
    });

    // Prepare the payload
    const payload = {
      cart_product_ids: uniqueProductIds,
      quantities: uniqueQuantities
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
