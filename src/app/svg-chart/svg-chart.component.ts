import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-chart',
  templateUrl: './svg-chart.component.html',
  styleUrls: ['./svg-chart.component.css'],
})
export class SvgChartComponent implements OnInit {
  themeNo = 1;
  theme1 = ['#0336ff', '#ffde03'];
  theme2 = ['#9102ee', '#f3b04b'];

  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300,
  };

  options = {
    color: this.theme2,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: ['Jan', 'Feb', 'March', 'April', 'May'],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        name: 'automotive oil',
        type: 'bar',
        barWidth: '60%',
        data: [100, 200, 334, 390, 330],
      },
      {
        name: 'drilling base oil',
        type: 'bar',
        barWidth: '60%',
        data: [200, 300, 434, 390, 230],
      },
    ],
  };

  constructor() {}

  ngOnInit(): void {}
}
