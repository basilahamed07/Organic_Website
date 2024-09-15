import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service'; // Adjust the path as necessary

@Component({
  selector: 'app-analysis-chart',
  templateUrl: './analysis-chart.component.html',
  styleUrls: ['./analysis-chart.component.css']
})
export class AnalysisChartComponent implements OnInit, AfterViewInit {
  data: any[] = []; // Array to hold the product data
  chartOptions: any;
  usernumber: any;
  shipping: any;
  order: any;
  feedback: any;
  private access: string | null = sessionStorage.getItem("access");

  constructor(private apiService: GenericApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.fetchData();
    
  }

  ngAfterViewInit() {
    // Initialize chart options after the view is initialized
    this.chartdata();
    this.usercount();
    this.orderscount();
    this.shippingcount();
    this.feedbackcount();
  }

  chartdata() {
    this.chartOptions = {
      animationEnabled: true, // Enable animation to make the chart more engaging
      backgroundColor: "#F5DEB3",
      title: {
        text: "Order Analysis"
      },
      axisY: {
        title: "Total Price",
        valueFormatString: "#0,,.",
        suffix: "K" // Use 'K' for thousands if necessary, adjust as needed
      },
      data: [{
        type: "splineArea",
        color: "rgba(54,158,173,.7)",
        xValueFormatString: "YYYY-MM-DD", // Adjust the format if necessary
        dataPoints: [] // Initialize as empty
      }]
    };
  }

  fetchData() {
    this.apiService.get('orders/')
      .subscribe(
        (response: any) => {
          this.data = response; // Store the fetched data
          console.log('Data fetched successfully', this.data);
          this.updateChart(); // Update the chart with the fetched data
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );


      
      
  }

  updateChart() {
    // Transform the fetched data into dataPoints
    const dataPoints = this.data.map((item: any) => ({
      x: new Date(item.order_date),
      y: item.total_price // Use 'total_price' as the value
    }));

    if (this.chartOptions) {
      this.chartOptions.data[0].dataPoints = dataPoints;

      // Manually trigger change detection to update the chart
      this.cdr.detectChanges();
    }
  }

  // Fetch the data for users
  usercount() {
    this.apiService.get('admin/users/')
      .subscribe(
        (response: any) => {
          this.usernumber = response.length;
          console.log(response); // Store the fetched data
        },
        error => {
          console.error('Error fetching user data', error);
          alert('Error fetching user data. Please try again.');
        }
      );
  }

  // Fetch the data for orders
  orderscount() {
    this.apiService.get('orders/')
      .subscribe(
        (response: any) => {
          this.order = response.length; 
          console.log("usercount", this.usernumber); // Store the fetched data
          console.log(this.order); // Store the fetched data
        },
        error => {
          console.error('Error fetching order data', error);
          alert('Error fetching order data. Please try again.');
        }
      );
  }

  // Fetch the data for shipping
  shippingcount() {
    this.apiService.get('shipping/')
      .subscribe(
        (response: any) => {
          this.shipping = response.length; // Store the fetched data
        },
        error => {
          console.error('Error fetching shipping data', error);
          alert('Error fetching shipping data. Please try again.');
        }
      );
  }

  // Fetch the data for feedback
  feedbackcount() {
    this.apiService.get('feedback/')
      .subscribe(
        (response: any) => {
          this.feedback = response.length; // Store the fetched data
        },
        error => {
          console.error('Error fetching feedback data', error);
          alert('Error fetching feedback data. Please try again.');
        }
      );
  }
}
