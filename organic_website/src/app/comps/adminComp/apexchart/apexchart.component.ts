import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { GenericApiService } from '../../../services/apiservice/axiosservices.service';  // Adjust the path as necessary
import { ApexOptions } from 'ng-apexcharts'; // Import ApexCharts options

@Component({
  selector: 'app-apexchart',
  templateUrl: './apexchart.component.html',
  styleUrls: ['./apexchart.component.css']
})
export class ApexchartComponent implements OnInit, AfterViewInit {
  data: any[] = [];
  chartOptions!: ApexOptions;
  usernumber: number = 0;
  shipping: number = 0;
  order: number = 0;
  feedback: number = 0;

  constructor(private apiService: GenericApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.chartdata(); // Initialize chart options
  }

  ngAfterViewInit() {
    this.fetchData(); // Fetch data and update chart
    this.usercount();
    this.orderscount();
    this.shippingcount();
    this.feedbackcount();
  }

  chartdata() {
    this.chartOptions = {
      chart: {
        type: 'area',
        animations: {
          enabled: true
        }
      },
      title: {
        text: 'Order Analysis',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'yyyy-MM-dd'
        }
      },
      yaxis: {
        title: {
          text: 'Total Price'
        },
        labels: {
          formatter: function (val) {
            return val / 1000 + 'K'; // Use 'K' for thousands if necessary
          }
        }
      },
      series: [{
        name: 'Total Price',
        data: []
      }],
      dataLabels: {
        enabled: false
      }
    };
  }

  fetchData() {
    this.apiService.get('orders/')
      .subscribe(
        (response: any) => {
          this.data = response;
          console.log('Data fetched successfully', this.data);
          this.updateChart();
        },
        error => {
          console.error('Error fetching data', error);
          alert('Error fetching data. Please try again.');
        }
      );
  }

  updateChart() {
    const dataPoints = this.data.map((item: any) => ({
      x: new Date(item.order_date).getTime(),
      y: item.total_price
    }));

    if (this.chartOptions) {
      this.chartOptions.series = [{
        name: 'Total Price',
        data: dataPoints
      }];
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  usercount() {
    this.apiService.get('admin/users/')
      .subscribe(
        (response: any) => {
          this.usernumber = response.length;
          console.log('User count:', this.usernumber);
        },
        error => {
          console.error('Error fetching user count', error);
          alert('Error fetching user count. Please try again.');
        }
      );
  }

  orderscount() {
    this.apiService.get('orders/')
      .subscribe(
        (response: any) => {
          this.order = response.length;
          console.log('Order count:', this.order);
        },
        error => {
          console.error('Error fetching order count', error);
          alert('Error fetching order count. Please try again.');
        }
      );
  }

  shippingcount() {
    this.apiService.get('shipping/')
      .subscribe(
        (response: any) => {
          this.shipping = response.length;
          console.log('Shipping count:', this.shipping);
        },
        error => {
          console.error('Error fetching shipping count', error);
          alert('Error fetching shipping count. Please try again.');
        }
      );
  }

  feedbackcount() {
    this.apiService.get('feedback/')
      .subscribe(
        (response: any) => {
          this.feedback = response.length;
          console.log('Feedback count:', this.feedback);
        },
        error => {
          console.error('Error fetching feedback count', error);
          alert('Error fetching feedback count. Please try again.');
        }
      );
  }
}
