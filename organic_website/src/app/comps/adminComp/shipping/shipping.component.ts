import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  data: any[] = []; // Array to hold the fetched data
  filteredData: any[] = []; // Array to hold the filtered data
  displayedData: any[] = []; // Array to hold data for the current page
  currentPage: number = 1;
  pageSize: number = 5;
  searchTerm: string = ''; // Search term for filtering

  constructor(private apiService: GenericApiService, private route: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.get('shipping/')
      .subscribe(
        (response: any[]) => {
          this.data = response.map(item => ({
            ...item,
            created_at: new Date(item.created_at), // Ensure the date is a JavaScript Date object
            shipping_status: this.calculateStatus(item) // Update the status based on date
          }));
          this.filterData(); // Initialize filtered data
          this.updatePageData(); // Update pagination with initial data
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  calculateStatus(item: any): string {
    const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const createdAt = new Date(item.created_at);

    if (item.shipping_status === 'pending' && now.getTime() - createdAt.getTime() > twoDaysInMillis) {
      return 'delivered';
    }

    return item.shipping_status;
  }

  searchByTrackingId() {
    this.filterData(); // Apply filtering
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    } else {
      this.updatePageData();
    }
  }

  filterData() {
    if (this.searchTerm.trim() === '') {
      this.filteredData = this.data.map(item => ({
        ...item,
        shipping_status: this.calculateStatus(item) // Recalculate status for all items
      }));
    } else {
      this.filteredData = this.data
        .filter(item =>
          item.tracking_id.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
        .map(item => ({
          ...item,
          shipping_status: this.calculateStatus(item) // Recalculate status for filtered items
        }));
    }
    this.currentPage = 1; // Reset to first page on search
    this.updatePageData();
  }

  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedData = this.filteredData.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageData();
    }
  }

  get totalPages() {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
}
