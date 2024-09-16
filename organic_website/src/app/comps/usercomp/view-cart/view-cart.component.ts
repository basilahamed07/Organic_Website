  import { AfterViewInit, Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { Observable, forkJoin } from 'rxjs';
  import * as L from 'leaflet';
  import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary

  @Component({
    selector: 'app-view-cart',
    templateUrl: './view-cart.component.html',
    styleUrls: ['./view-cart.component.css']
  })
  export class ViewCartComponent implements OnInit, AfterViewInit {

    private map: any;
    couponCode: string = '';
    discount: number = 0;
    product_ids: any[] = [];
    quantities: number[] = [];
    products: any[] = [];
    totalPrice: number = 0;
    user_id = 0;
    address: any = {
      first_line: '',
      city: '',
      state: '',
      pincode: ''
    };
    lat: number = 0;
    lng: number = 0;
    access: string | null = sessionStorage.getItem("access");

    constructor(private apiService: GenericApiService, private router: Router) {
      this.user_id = parseInt(sessionStorage.getItem("user_id") || '0', 10);
    }

    ngOnInit(): void {
      this.fetchUserAndCartData();
    }

    ngAfterViewInit(): void {
      this.initMap();  // Initialize the map first
    }

    private initMap(): void {
      // Initialize the map
      this.map = L.map('map', {
        center: [13.0843, 80.2705],  // Default center location
        zoom: 13,
        dragging: true,
      });

      // Add OpenStreetMap tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

      // Initialize a draggable marker and add it to the map
      const marker = L.marker([13.0843, 80.2705], { draggable: true })
        .addTo(this.map)
        .bindPopup('Your location')
        .openPopup();

      // Listen for the dragend event to get the new marker position
      marker.on('dragend', () => {
        const position = marker.getLatLng();
        marker.setLatLng(position).bindPopup('Moved to: ' + position.toString()).openPopup();
      });

      // Define a custom control to disable dragging of the map
      const ToggleDragControl = L.Control.extend({
        onAdd: () => {
          const button = L.DomUtil.create('button', 'toggle-drag');
          button.innerHTML = 'Disable Map Dragging'; // Default text
          button.style.backgroundColor = 'white';
          button.style.padding = '5px';

          // Toggle dragging when button is clicked
          button.onclick = () => {
            if (this.map.dragging.enabled()) {
              this.map.dragging.disable();
              button.innerHTML = 'Enable Map Dragging';
            } else {
              this.map.dragging.enable();
              button.innerHTML = 'Disable Map Dragging';
            }
          };

          return button;
        },
        onRemove: () => {
          // Nothing to do here
        }
      });

      // Add the custom control to the map (top right position)
      new ToggleDragControl({ position: 'topright' }).addTo(this.map);

      // After initializing the map, attempt to get the user's location
      this.getUserLocation();
    }

    private getUserLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            // Center map to user's location
            this.map.setView([this.lat, this.lng], 13);

            // Add a draggable marker to user's location
            const marker = L.marker([this.lat, this.lng], { draggable: true })
              .addTo(this.map)
              .bindPopup('You are here')
              .openPopup();

            // Listen for dragend event to get new marker position
            marker.on('dragend', () => {
              const position = marker.getLatLng();
              marker.setLatLng(position).bindPopup('Moved to: ' + position.toString()).openPopup();
            });
          },
          (error) => {
            console.error('Error getting location:', error);
            alert('Unable to retrieve your location.');
          }
        );
      } else {
        alert('Geolocation is not supported by your browser.');
      }
    }

    applyCoupon(): void {
      if (this.couponCode.trim()) {
        this.apiService.get('coupon/').subscribe(
          (coupons: any[]) => {
            const coupon = coupons.find(c => c.code === this.couponCode);
            if (coupon) {
              this.discount = coupon.discount;
              this.calculateTotalPrice();  // Recalculate the total price with the discount
              alert(`Coupon applied! ${this.discount}% discount.`);
              
              // Optional: Confirm deletion of the coupon if this is intended
              if (confirm('Do you want to use this coupon code it is one time only?')) {
                this.apiService.delete(`coupon/${coupon.id}`).subscribe(
                  () => console.log('Coupon deleted successfully'),
                  (error: any) => this.handleError('deleting coupon', error)
                );
              }
            } else {
              alert('Invalid coupon code.');
            }
          },
          (error: any) => this.handleError('fetching coupons', error)
        );
      } else {
        alert('Please enter a coupon code.');
      }
    }
    

    fetchUserAndCartData(): void {
      this.apiService.get('users/get_user').subscribe(
        (response: any) => {
          let first_line1=response.data.first_line;
          let city1= response.data.city;
          let state1= response.data.state;
          let pincode1= response.data.pincode;
          if((first_line1=="temp")||(city1=="temp")||(state1=="temp")||(pincode1=="temp"))
          {
            first_line1="";
            city1="";
            state1="";
            pincode1="";
          }

          this.address = {
            first_line:first_line1,
            city: city1,
            state: state1,
            pincode: pincode1
          };
          this.product_ids = response.data.cart_product_ids;
          this.quantities = response.data.quantities;
          this.fetchProductDetails();
        },
        (error: any) => this.handleError('fetching user and cart data', error)
      );
    }

    onAddressChange(): void {
      this.apiService.patch('users/get_user', this.address).subscribe(
        (response: any) => console.log('Address updated successfully', response),
        (error: any) => this.handleError('updating address', error)
      );
    }

    fetchProductDetails(): void {
      if (this.product_ids.length > 0) {
        const productRequests: Observable<any>[] = this.product_ids.map(productId =>
          this.apiService.get(`Product_Table/${productId}/`)
        );

        forkJoin(productRequests).subscribe(
          (responses: any[]) => {
            this.products = responses;
            this.calculateTotalPrice();
          },
          (error: any) => this.handleError('fetching product details', error)
        );
      }
    }

    increaseQuantity(index: number): void {
      if (this.quantities[index] < this.products[index].P_Stock) {
        this.quantities[index]++;
        this.updateCartQuantity();
      }
    }

    decreaseQuantity(index: number): void {
      if (this.quantities[index] > 1) {
        this.quantities[index]--;
        this.updateCartQuantity();
      }
    }

    updateCartQuantity(): void {
      const payload = { quantities: this.quantities };
      this.apiService.patch('users/get_user', payload).subscribe(
        (response: any) => {
          console.log('Cart updated successfully', response);
          this.calculateTotalPrice();
        },
        (error: any) => this.handleError('updating cart quantity', error)
      );
    }

    calculateTotalPrice(): void {
      let subtotal = this.products.reduce((total, product, index) => {
        return total + (this.quantities[index] * product.P_Price);
      }, 0);

      this.totalPrice = subtotal - (subtotal * this.discount / 100); // Apply discount
    }

    deleteProduct(index: number): void {
      this.product_ids.splice(index, 1);
      this.quantities.splice(index, 1);
      this.updateCart();
    }

    updateCart(): void {
      const payload = { cart_product_ids: this.product_ids, quantities: this.quantities };
      this.apiService.patch('users/get_user', payload).subscribe(
        (response: any) => {
          console.log('Cart updated successfully', response);
          this.fetchProductDetails();
          this.calculateTotalPrice();
        },
        (error: any) => this.handleError('updating cart', error)
      );
    }

    updateProductStock(): void {
      if (this.product_ids.length > 0) {
        const productRequests: Observable<any>[] = this.product_ids.map(productId =>
          this.apiService.get(`Product_Table/${productId}/`)
        );

        forkJoin(productRequests).subscribe(
          (responses: any[]) => {
            const stockUpdateRequests: Observable<any>[] = responses.map((product, index) => {
              const updatedStock = product.P_Stock - this.quantities[index];
              let payload = {
                P_Stock: updatedStock,
                id: product.id
              };
              return this.apiService.patch(`Product_Table/stock/${product.id}/`, payload);
            });

            forkJoin(stockUpdateRequests).subscribe(
              (updateResponses: any[]) => console.log('Stock updates successful:', updateResponses),
              (updateError: any) => this.handleError('updating stock', updateError)
            );
          },
          (error: any) => this.handleError('fetching product details', error)
        );
      }
    }

    buyNow(): void {
 
      if (this.products.length > 0 && this.totalPrice > 0) {

        if (this.isAddressValid()) {
          this.apiService.patch('users/get_user', this.address).subscribe(
            (response: any) => {
              console.log('Address updated successfully', response);
              this.createShipping();
            },
            (error: any) => this.handleError('updating address', error)
          );
        } else {
          alert('Your delivery address is incomplete . Please update your address before proceeding.');
        }
      } else {
        alert('Your cart is empty. Please add items to your cart before proceeding.');
      }
    }
    
    // Method to check if address is valid
    private isAddressValid(): boolean {
      return this.address.first_line.trim() !== '' && 
             this.address.city.trim() !== '' && 
             this.address.state.trim() !== '' && 
             this.address.pincode.trim() !== '' && 
             this.address.first_line !== 'temp' &&
             this.address.city !== 'temp' &&
             this.address.state !== 'temp' &&
             this.address.pincode !== 'temp';
    }

    createShipping(): void {
      const payload2 = { shipping_status: "pending" };
      this.apiService.post('shipping/', payload2).subscribe(
        (response: any) => {
          const Shipping_id = response.id;
          console.log('Shipping created successfully', response);
          this.createOrder(Shipping_id);
        },
        (error: any) => this.handleError('creating shipping', error)
      );
    }

    createOrder(Shipping_id: number): void {
      const orderData = {
        user_id: this.user_id,
        shipping: Shipping_id,
        total_price: this.totalPrice,
        product_ids: this.product_ids,
        quantity: this.quantities,
        latitude: this.lat,
        longitude: this.lng
      };

      this.apiService.post('orders/', orderData).subscribe(
        (response) => {
          console.log('Order placed successfully', response);
          alert('Order placed successfully!');
          this.clearCart();
          this.router.navigate(['prodact/orders']);
        },
        (error) => this.handleError('placing order', error)
      );
    }

    clearCart(): void {
      const payload = { cart_product_ids: [], quantities: [] };
      this.apiService.patch('users/get_user', payload).subscribe(
        (response: any) => {
          console.log('Cart cleared successfully', response);
          this.product_ids = [];
          this.quantities = [];
          this.products = [];
          this.totalPrice = 0;
        },
        (error: any) => this.handleError('clearing cart', error)
      );
    }

    handleError(action: string, error: any): void {
      console.error(`Error ${action}:`, error);
      alert(`Error ${action}. Please try again.`);
    }
  }
