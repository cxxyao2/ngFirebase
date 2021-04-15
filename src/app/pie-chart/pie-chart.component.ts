import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  theme: any;
  options = {
    title: {
      text: 'Proportion of sales data',
      subtext: 'Engine Oil',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      x: 'center',
      y: 'bottom',
      data: ['rose1', 'rose2', 'rose3'],
    },
    calculable: true,
    series: [
      {
        name: 'area',
        type: 'pie',
        radius: [50, 100],
        roseType: 'area',
        data: [
          { value: 10, name: 'distributors' },
          { value: 5, name: 'customers' },
          { value: 15, name: 'groups' },
        ],
      },
    ],
  };
  constructor() {}

  ngOnInit(): void {}
}
