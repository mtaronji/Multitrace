import { Component, OnInit, AfterViewInit } from '@angular/core';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  constructor(){
  
  }

  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {

  }



  // async getDailyPriceDataAsync(stock:string) {
  //   const response = await fetch('/stock/'.concat(stock, "/d/").concat(duration));
  //   const data = await response.json();
  //   return data;
  // }

  // async  getWeeklyPriceDataAsync(stock:string) {
  //     const response = await fetch('/stock/'.concat(stock, "/w/").concat(duration));
  //     const data = await response.json();
  //     return data;
  // }

  // async  getDGainDataAsync(stock:string) {
  //     const response = await fetch('/stock/'.concat(stock, "/d/gains/").concat(duration));

  //     const data = await response.json();
  //     return data;
  // }
  // async  getWGainDataAsync(stock:string) {
  //     const response = await fetch('/stock/'.concat(stock, "/w/gains/").concat(duration));
  //     const data = await response.json();
  //     return data;
  // }

  // async  getEMADataAsync(stock:string) {
  //     const response = await fetch('/ticker/'.concat(stock, "/ema/").concat(duration));
  //     const data = await response.json();
  //     return data;
  // }
  // async  getSMADataAsync(stock:string) {
  //     const response = await fetch('/ticker/'.concat(stock, "/sma/").concat(duration));
  //     const data = await response.json();
  //     return data;
  // }

}
