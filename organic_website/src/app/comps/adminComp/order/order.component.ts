import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  data: any[] = []; // Array to hold the fetched data
  filteredData: any[] = []; // Array to hold the filtered data
  currentPageData: any[] = []; // Array to hold the data for the current page
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;
  searchTerm: string = ''; // Search term for filtering

  constructor(private apiService: GenericApiService, private router: Router) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.apiService.get('orders/')
      .subscribe(
        (response: any) => {
          this.data = response; // Store the fetched data
          this.filteredData = [...this.data]; // Initialize filteredData
          this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
          this.updatePageData();
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  filterData() {
    // Perform search filtering
    this.filteredData = this.data.filter(item => 
      Object.values(item).some(value =>
        value!.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.currentPage = 1; // Reset to first page on search
    this.updatePageData();
  }

  updatePageData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.currentPageData = this.filteredData.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageData();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageData();
    }
  }

  deleteData(id: number) {
    if (confirm('Are you sure you want to delete this order?')) {
      this.apiService.delete(`orders/${id}/`)
        .subscribe(
          () => {
            this.data = this.data.filter(item => item.id !== id); // Remove deleted item from array
            this.filterData(); // Apply search filter again after deletion
            alert('Order deleted successfully!');
          },
          error => {
            console.error('Error deleting order', error);
            alert('Error deleting order. Please try again.');
          }
        );
    }
  }
}
