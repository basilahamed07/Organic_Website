import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import jsPDF AutoTable

@Component({
  selector: 'app-vieworders',
  templateUrl: './vieworders.component.html',
  styleUrls: ['./vieworders.component.css']
})
export class ViewordersComponent implements OnInit {
  orders: any[] = [];
  userAddress: any = {};

  constructor(
    private apiService: GenericApiService, 
    private router: Router, 
    private http: HttpClient
  ) {}

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
        console.error('Error when fetching orders:', error);
      }
    );
  }

  private loadUserAddress(): void {
    this.apiService.get('users/get_user').subscribe(
      (response: any) => {
        console.log('User Address Data:', response);

        const addressData = response.data;

        this.userAddress = {
          first_line: addressData.first_line || 'N/A',
          city: addressData.city || 'N/A',
          state: addressData.state || 'N/A',
          pincode: addressData.pincode || 'N/A'
        };

        console.log('Processed User Address:', this.userAddress);
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
        console.log(orderData.shipping_details)
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
    doc.text('Details:', 14, 70);

    // Define table columns and rows (only Product Name column)
    const products = order.products.map((product: any) => [product.P_Name]);

    // Add a table for product details
    const columns = ['Details'];
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
      ? `Shipping ID: ${order.shipping_details.Shipping_id}\nStatus: ${order.shipping_details.shipping_status}\nTracking ID: ${order.shipping_details.tracking_id}`
      : 'N/A';

    doc.setFontSize(12);
    doc.text(shippingDetails, 14, lastY + 20);

    // Add user address details
    doc.setFontSize(14);
    doc.text('User Address:', 14, lastY + 40);

    // Ensure userAddress has correct data
    console.log('Generating PDF with Address:', this.userAddress);

    const addressDetails = this.userAddress
      ? `${this.userAddress.first_line}, ${this.userAddress.city}, ${this.userAddress.state} - ${this.userAddress.pincode}`
      : 'N/A';

    doc.setFontSize(12);
    doc.text(addressDetails, 14, lastY + 50);

    // Convert PDF to Blob and upload
    const pdfBlob = doc.output('blob');
    this.uploadPDF(pdfBlob, order.shipping_id);
  }

  private uploadPDF(pdfBlob: Blob, orderId: number): void {
    const formData = new FormData();
    formData.append('file', pdfBlob, `order_${orderId}.pdf`);
    formData.append('orderId', orderId.toString());

    this.http.post('http://localhost:8000/api/email/upload-pdf/', formData).subscribe(
      response => {
        console.log('PDF uploaded successfully:', response);
        this.sendEmail(orderId);
      },
      error => {
        console.error('Error uploading PDF:', error);
      }
    );
  }

  private sendEmail(orderId: number): void {
    // Retrieve the recipient email address from session storage
    const recipientEmail = sessionStorage.getItem('email');
    
    if (!recipientEmail) {
      console.error('Recipient email address not found in session storage');
      return;
    }

    // Prepare the payload with the orderId and recipient email
    const payload = {
      orderId: orderId,
      recipientEmail: recipientEmail
    };

    // Send the POST request with the payload
    this.http.post('http://localhost:8000/api/email/send-email/', payload).subscribe(
      response => {
        console.log('Email sent successfully:', response);
      },
      error => {
        console.error('Error sending email:', error);
      }
    );
  }
}
