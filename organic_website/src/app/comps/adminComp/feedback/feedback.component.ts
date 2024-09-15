import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  feedbackData: any[] = []; // Array to hold the fetched feedback data
  displayedFeedback: any[] = []; // Array to hold feedback data for the current page
  currentPage: number = 1;
  pageSize: number = 8;
  searchTerm: string = ''; // Search term for filtering

  constructor(private apiService: GenericApiService, private route: Router) {}

  ngOnInit() {
    this.fetchFeedback();
  }

  fetchFeedback() {
    this.apiService.get('feedback/')
      .subscribe(
        (response: any) => {
          this.feedbackData = response; // Store the fetched data
          this.filterFeedback(); // Initialize filtered data
          this.updatePageData(); // Update pagination with initial data
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  searchFeedback() {
    this.filterFeedback(); // Apply filtering
    // Automatically go to the next page if needed
    if (this.currentPage > this.totalPages) {
      this.currentPage = this.totalPages;
    } else {
      this.updatePageData();
    }
  }

  filterFeedback() {
    if (this.searchTerm.trim() === '') {
      this.displayedFeedback = [...this.feedbackData];
    } else {
      this.displayedFeedback = this.feedbackData.filter(item =>
        item.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    this.currentPage = 1; // Reset to first page on search
    this.updatePageData();
  }

  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedFeedback = this.displayedFeedback.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePageData();
    }
  }

  deleteFeedback(feedbackId: number) {
    if (confirm('Are you sure you want to delete this feedback?')) {
      this.apiService.delete(`feedback/${feedbackId}`)
        .subscribe(
          () => {
            // Filter out the deleted feedback
            this.feedbackData = this.feedbackData.filter(item => item.id !== feedbackId);
            this.filterFeedback(); // Reapply the filtering to reflect changes
            this.updatePageData(); // Update displayed data after deletion
          },
          error => {
            console.error('Error deleting feedback', error);
            alert('Error deleting feedback. Please try again.');
          }
        );
    }
  }

  get totalPages() {
    return Math.ceil(this.displayedFeedback.length / this.pageSize);
  }
}
