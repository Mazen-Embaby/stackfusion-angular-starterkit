import { CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { ApexAxisChartSeries, ApexChart, ApexTitleSubtitle, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';

export interface ChartOptions {
  series?: ApexAxisChartSeries | number[];
  chart?: ApexChart;
  xaxis?: ApexXAxis;
  title?: ApexTitleSubtitle;
  labels?: string[];
}

@Component({
  selector: 'app-dashboard-b',
  imports: [NgApexchartsModule, CurrencyPipe],
  templateUrl: './dashboard-b-page.html',
  styleUrls: ['./dashboard-b-page.scss'],
})
export class DashboardBPage {
  // for more guide apexchart.js
  // https://apexcharts.com/docs/chart-types/line-chart/

  totalSaleChart: ChartOptions = {
    series: [
      {
        name: 'Revenue',
        data: [35, 43, 46, 52, 62, 70, 70, 91],
      },
      {
        name: 'Revenue (Previous period)',
        data: [25, 37, 46, 58, 70, 88, 81, 95],
      },
    ],
    chart: {
      height: 380,
      type: 'area',
      width: '100%',
      fontFamily: 'Segoe UI, sans-serif',
    },
    title: {
      text: 'Total Sales',
    },
    xaxis: {
      categories: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
    },
  };

  ProductCharat: ChartOptions = {
    series: [
      {
        name: 'Product 1',
        data: [31, 42, 47, 55, 50, 61, 71, 93],
      },
      {
        name: 'Product 2',
        data: [21, 35, 46, 60, 80, 88, 91, 97],
      },
    ],
    chart: {
      height: 380,
      type: 'bar',
      width: '100%',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true },
    },
    title: {
      text: 'New products this week',
    },
  };

  visitorChart: ChartOptions = {
    series: [
      {
        name: 'Visitor ',
        data: [20, 30, 40, 50, 49, 51, 70, 91],
      },
    ],
    chart: {
      height: 380,
      type: 'area',
      width: '100%',
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: { enabled: true },
    },
    title: {
      text: 'Visitor this week',
    },
  };

  signupChart: ChartOptions = {
    series: [22, 18, 80, 101],
    chart: {
      height: 380,
      type: 'pie',
      width: '100%',
    },
    title: {
      text: 'User signups this week',
    },
    labels: ['admin', 'SuperAdmin', 'User', 'Costumer'],
  };

  tableTransaction = [
    {
      transaction: 'Payment from yolya',
      datetime: 'Sep 13, 2022',
      amount: 12000,
      statusTransaction: 'completed',
    },
    {
      transaction: 'Payment from Nicolas John',
      datetime: 'Feb 3, 2023',
      amount: 1000,
      statusTransaction: 'completed',
    },
    {
      transaction: 'Payment from Alex tom',
      datetime: 'Mar 25, 2023',
      amount: 12000,
      statusTransaction: 'progress',
    },
    {
      transaction: 'Payment failed from #02548',
      datetime: 'Jan 5, 2023',
      amount: 180000,
      statusTransaction: 'cancelled',
    },
  ];
}
