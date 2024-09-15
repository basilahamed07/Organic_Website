import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  userAddress: any = {};

  constructor(private apiService: GenericApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadOrders();
    this.loadUserAddress();
  }

  private loadOrders(): void {
    this.apiService.get('orders/').subscribe(
      (response: any[]) => {
        const actualUserId = sessionStorage.getItem('user_id') || '0';

        this.orders = response
          .filter(order => order.user_id === parseInt(actualUserId, 10))
          .map(order => {
            const orderData = {
              shipping_id: order.shipping,
              order_date: order.order_date,
              total_price: order.total_price,
              quantities: order.quantity,
              products: [] as any[],
              user_id: order.user_id,
              shipping_details: null,
              showDetails: false
            };

            this.fetchProductDetails(order.product_ids, orderData);
            this.fetchShippingDetails(order.shipping, orderData);

            return orderData;
          });
      },
      error => {
        console.error('Error when fetching data:', error);
      }
    );
  }

  private loadUserAddress(): void {
    this.apiService.get('users/get_user').subscribe(
      (response: any) => {
        this.userAddress = {
          first_line: response.first_line,
          city: response.city,
          state: response.state,
          pincode: response.pincode
        };
      },
      error => {
        console.error('Error when fetching user address:', error);
      }
    );
  }

  private fetchProductDetails(productIds: string[], orderData: any): void {
    if (productIds.length > 0) {
      productIds.forEach(productId => {
        this.apiService.get(`Product_Table/${productId}`).subscribe(
          response => {
            orderData.products.push(response);
          },
          error => {
            console.error('Error when fetching product details:', error);
          }
        );
      });
    }
  }

  private fetchShippingDetails(shippingId: number, orderData: any): void {
    this.apiService.get(`shipping/${shippingId}/`).subscribe(
      response => {
        orderData.shipping_details = response;
      },
      error => {
        console.error('Error when fetching shipping details:', error);
      }
    );
  }

  toggleDetails(orderIndex: number): void {
    this.orders[orderIndex].showDetails = !this.orders[orderIndex].showDetails;
  }

  generatePDF(order: any): void {
    const doc = new jsPDF();

    // Add a title
    doc.setFontSize(22);
    doc.text('Order Invoice', 14, 20);

    // Add order summary
    doc.setFontSize(16);
    doc.text(`Order ID: ${order.shipping_id}`, 14, 30);
    doc.text(`Order Date: ${order.order_date}`, 14, 40);
    doc.text(`Total Price: ₹${order.total_price}`, 14, 50);

    // Add product details
    doc.setFontSize(14);
    doc.text('Products:', 14, 70);

    // Define table columns and rows
    const products = order.products.map((product: any, index: number) => [
      product.P_Name,
      `₹${product.P_Price}`,
      order.quantities[index]
    ]);

    // Add a table for product details
    // Add columns
    const columns = ['Product Name', 'Price', 'Quantity'];
    // Add rows
    const rows = products;

    // Using autoTable to create the table
    (doc as any).autoTable({
      startY: 80,
      head: [columns],
      body: rows,
      margin: { horizontal: 14 },
      styles: { fontSize: 12 },
      theme: 'striped'
    });

    // Track the position of the last autoTable
    const lastY = (doc as any).autoTable.previous.finalY;

    // Add shipping details
    doc.setFontSize(14);
    doc.text('Shipping Details:', 14, lastY + 10);

    const shippingDetails = order.shipping_details
      ? `${order.shipping_details.address}, ${order.shipping_details.city}, ${order.shipping_details.state} - ${order.shipping_details.pincode}`
      : 'N/A';

    doc.setFontSize(12);
    doc.text(shippingDetails, 14, lastY + 20);

    // Add user address details
    doc.setFontSize(14);
    doc.text('User Address:', 14, lastY + 40);
    
    const addressDetails = this.userAddress
      ? `${this.userAddress.first_line}, ${this.userAddress.city}, ${this.userAddress.state} - ${this.userAddress.pincode}`
      : 'N/A';

    doc.setFontSize(12);
    doc.text(addressDetails, 14, lastY + 50);

    // Save the PDF
    doc.save(`order_${order.shipping_id}.pdf`);
  }

  // downloadInvoice(orderId: number): void {
  //   const headers = {
  //     'Authorization': `Bearer ${this.access}`,
  //     'Accept': 'application/vnd.oasis.opendocument.text' // This header can be adjusted based on the API's requirements
  //   };

  //   this.apiService.get(`invoice/api/invoices/${orderId}/`, { headers, responseType: 'blob' }).subscribe(
  //     (response: Blob) => {
  //       const blob = new Blob([response], { type: 'application/vnd.oasis.opendocument.text' });
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.href = url;
  //       a.download = `invoice_${orderId}.odt`; // Adjust the filename as needed
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //     },
  //     error => {
  //       console.error('Error when downloading invoice:', error);
  //     }
  //   );
  }

