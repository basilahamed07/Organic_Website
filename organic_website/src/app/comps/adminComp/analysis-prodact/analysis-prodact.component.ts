import { Component } from '@angular/core';

@Component({
  selector: 'app-analysis-prodact',
  templateUrl: './analysis-prodact.component.html',
  styleUrls: ['./analysis-prodact.component.css']
})
export class AnalysisProdactComponent {
  chartOptions = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Category Analysis"
    },
    axisX: {
      title: "Product"
    },
    axisY: {
      title: "Product Markets",
      interval: 20,
      suffix: "k",
      prefix: "$"
    },
    data: [{
      type: "rangeBar",
      showInLegend: true,
      yValueFormatString: "$#0.#K",
      legendText: "Department wise Salary Range",
      color: "#6d78ad",
      dataPoints: [
        { x: 10, y: [0, 80], label: "100% Organic" },
        { x: 20, y: [0, 50], label: "Organic" },
        { x: 30, y: [0, 70], label: "Made with Organic Ingredients" },
        { x: 40, y: [0, 30], label: "70% Organic" }
      ]
    }]
  };
}
