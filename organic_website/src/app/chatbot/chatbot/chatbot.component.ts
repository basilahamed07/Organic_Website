import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  userQuery: string = '';
  userId: string = '';  // Will be set from session storage
  messages: any[] = [];
  apiUrl = 'http://localhost:8000/api/chatbot/chatbot/';
  chatVisible: boolean = false;
  email: string = "";
  access: string | null = '';

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.userId = sessionStorage.getItem('user_id') || '';
    this.email = sessionStorage.getItem('email') || '';
    this.access = sessionStorage.getItem("access");
  }

  sendQuery(query: string) {
    if (query.trim()) {
      this.http.post<any>(this.apiUrl, {
        query: query,
        user_id: this.userId
      }).pipe(
        catchError(error => {
          console.error('Error:', error);
          this.messages.push({ type: 'text', text: 'An error occurred while processing your request.' });
          return [];
        })
      ).subscribe(response => {
        this.messages = response.messages;
      });
    }
  }

  onListProductsClick() {
    this.sendQuery('list products');
  }

  onMyOrdersClick() {
    this.sendQuery('my orders');
  }

  onCouponClick() {
    this.sendQuery('coupon');
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
    if (this.chatVisible) {
      this.initializeChat();
    } else {
      this.messages = []; // Clear messages when chat is closed
    }
  }

  initializeChat() {
    // Add a default welcome message
    this.messages.push({
      type: 'text',
      text: `Hello! ${this.email} How can I assist you today?`
    });

    // Optionally add default product list, cart contents, or other info
    this.messages.push({
      type: 'products',
    });
  }

  buyNow(productId: number) {
    if (this.access) {
      const payload = {
        cart_product_ids: [productId],
        quantities: [1]
      };
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.access}`
      });

      this.http.patch('http://127.0.0.1:8000/api/users/get_user', payload, { headers })
        .subscribe(response => {
          console.log("Product quantity updated:", response);
          this.router.navigate(['/prodact/cart']);
        }, error => {
          console.error("Error:", error);
        });
    }
  }

  addToCart(product: any) {
    console.log('Product added to cart:', product);
    this.updateCartMessage();
  }

  removeFromCart(itemId: number) {
    console.log('Item removed from cart:', itemId);
    this.updateCartMessage();
  }

  updateCartMessage() {
    // Fetch cart items and update messages
    // For demonstration purposes, we'll simulate it with some static data
    // Example of static cart items
    const cartItems = [
      { id: 1, image: 'https://via.placeholder.com/80', name: 'Product 1', price: 29.99, quantity: 1 },
      { id: 2, image: 'https://via.placeholder.com/80', name: 'Product 2', price: 19.99, quantity: 2 }
    ];
    this.messages.push({ type: 'cart', items: cartItems });
  }
}
