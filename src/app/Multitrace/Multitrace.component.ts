import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { isDevMode } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TickerService } from '../services/tickerservice';
import { FormControl, AbstractControl, ValidatorFn, Validators, FormGroup} from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable, startWith, map } from 'rxjs';
import { MatChipGrid } from '@angular/material/chips';
import * as plotlyModel from "src/assets/plotlydatamodels";
import { PlotlyModule } from 'angular-plotly.js';
import { DateTime } from 'luxon';






@Component({
  selector: 'app-Multitrace',
  templateUrl: './Multitrace.component.html',
  styleUrls: ['./Multitrace.component.css']
})

export class MultitraceComponent implements OnInit, AfterViewInit {
  title = "MultiTrace";
  DEVELOPMENT:boolean = false;
  private MAXCHIPSIZE:number = 4;
  _title : string = "Multi Trace";
  _allTickers :string[];
  _tickerForm: FormGroup;
  _tickerCtrl: FormControl;
  _startDateCtrl: FormControl;
  _endDateCtrl: FormControl;
  _SelectedTickers:string[];
  _filteredTickers: Observable<string[]> | undefined;
  _data = {} as plotlyModel.plotlyMultiTraceModel;
  @ViewChild(MatChipGrid) chipGrid: MatChipGrid | undefined;
  _chartVisible:boolean;
  _mindate:Date;
  _maxdate:Date;

  
  //properties
  get ticker() {

    return this._tickerForm.get('tickerSelected'); }

  get tickerform(){
      return this._tickerForm; 
  }
  
  get StartDate(){
      return this._tickerForm.get('dateStart');
  }
  get EndDate(){
    return this._tickerForm.get('dateEnd');
  }

  get Data(){
    return this._data;
  }
  get ChartVisible(){
    return this._chartVisible;
  }

  ngOnInit(): void {

  }
  
  ngAfterViewInit(): void {
    
  }

  constructor(){
    this.DEVELOPMENT = isDevMode();
    this._chartVisible = false;
    this._allTickers = [];
    this._SelectedTickers = [];
    this._mindate = new Date("1930-01-01");
    this._maxdate = new Date(Date.now());

    this._tickerCtrl = new FormControl(null,
      [
        
        this.TickerInputValidator()
      ]
     );
     this._startDateCtrl = new FormControl<Date | null>(null,
      Validators.required);
     this._endDateCtrl = new FormControl<Date | null>(null,
      Validators.required);

    this._tickerForm = new FormGroup(
    {
        tickerSelected: this._tickerCtrl,
        dateStart: this._startDateCtrl,
        dateEnd: this._endDateCtrl
    });   
    
    //create the filtered autocomplete
    this._filteredTickers = this.ticker?.valueChanges.pipe(
      startWith(null), 
      map( (ticker:string|null ) => (ticker? this.filterTicker(ticker.toUpperCase()): this._allTickers.slice() ))
    );

    this.getTickersAsync();
  }
   private filterTicker(value : string):string[]{
    return this._allTickers.filter(t => t.includes(value));
   }
  //when removed is clicked, remove the ticker from the selection
  removeTicker(ticker:string): void{
    const index = this._SelectedTickers.indexOf(ticker);

    if (index >= 0){
      this._SelectedTickers.splice(index,1);
    }

  }

  //this event happens when you click enter
  addTicker(){

  }
  //this is the event that happens when you click the auto select
  selected(event: MatAutocompleteSelectedEvent):void {
    if(!this._SelectedTickers.includes(event.option.viewValue)){

      if (this._SelectedTickers.length >= this.MAXCHIPSIZE){
        this._SelectedTickers[this.MAXCHIPSIZE - 1] = event.option.viewValue;
      }
      else{
        this._SelectedTickers.push(event.option.viewValue);
        this._tickerCtrl.reset();
        this._tickerCtrl.setValue(null);
      }
    }


  }

  async pullData(){

    const datebegin = this.ExtractDate(this.StartDate?.value);
    const dateend = this.ExtractDate(this.EndDate?.value);
    let querystring = this.createQueryString(this._SelectedTickers, datebegin, dateend);
    console.log(querystring);
    let data = await this.GetDailyPrices(querystring);
  }
  
  TickerInputValidator() : ValidatorFn{
    return (control: AbstractControl): {[key:string]: any} | null => 
      {
        return (this._SelectedTickers.length == 0) ? {TickersEmpty: {value: "No tickers in the chip grid" }} : null;
      }
  }

  //extracts a date from our control. Expects date input from datepicker.
  private ExtractDate (date:object):string {
    return JSON.stringify(date).substring(1,11);
  }

  private createQueryString(tickers:string[], datebegin:string, dateend:string): string {
    let querystring : string = "/stock/";
    let queryobject:URLSearchParams = new URLSearchParams(); 
    let index = 0;
    tickers.forEach(e => {
      queryobject.append(index.toString(), e);
      index = index + 1;
    });
    queryobject.append("datebegin",datebegin);
    queryobject.append("dateend",dateend);
    querystring = querystring + queryobject.toString();
    return querystring;
  }

  private async GetDailyPrices(querystring:string){
    const response = await fetch(querystring);

    if (isDevMode()){
       let data = {"traces":[{"x":["2020-02-03","2020-02-04","2020-02-05","2020-02-06","2020-02-07","2020-02-10","2020-02-11","2020-02-12","2020-02-13","2020-02-14","2020-02-18","2020-02-19","2020-02-20"],"y":[77.165001,79.712502,80.362503,81.302498,80.0075,80.387497,79.902496,81.800003,81.217499,81.237503,79.75,80.904999,80.074997],"mode":"lines","type":"scatter","name":"AAPL","line":{"color":"rgb(128, 0, 128)","width":1}},{"x":["2020-02-03","2020-02-04","2020-02-05","2020-02-06","2020-02-07","2020-02-10","2020-02-11","2020-02-12","2020-02-13","2020-02-14","2020-02-18","2020-02-19","2020-02-20"],"y":[52.0,59.137333,48.98,49.930668,49.871334,51.418667,51.625332,51.152668,53.599998,53.335335,57.226665,61.161331,59.960667],"yaxis":"y2","mode":"lines","type":"scatter","name":"TSLA","line":{"color":"rgb(219, 64, 82)","width":1}},{"x":["2020-02-03","2020-02-04","2020-02-05","2020-02-06","2020-02-07","2020-02-10","2020-02-11","2020-02-12","2020-02-13","2020-02-14","2020-02-18","2020-02-19","2020-02-20"],"y":[324.119995,329.059998,332.859985,333.980011,332.200012,334.679993,335.26001,337.420013,337.059998,337.600006,336.730011,338.339996,336.950012],"yaxis":"y3","mode":"lines","type":"scatter","name":"SPY","line":{"color":"rgb(55, 128, 191)","width":1}}],"layout":{"xaxis":{"title":"Dates","showgrid":true,"rangeslider":{"visible":false},"domain":[0.15,0.85],"type":"_"},"yaxis":{"title":"yaxis","showgrid":true,"rangeslider":{"visible":false},"tickfont":{"color":"rgb(128, 0, 128)"},"titlefont":{"color":"rgb(128, 0, 128)"},"type":"_"},"yaxis2":{"title":"yaxis2","showgrid":true,"overlaying":"y","anchor":"x","side":"right","rangeslider":{"visible":false},"tickfont":{"color":"rgb(219, 64, 82)"},"titlefont":{"color":"rgb(219, 64, 82)"},"type":"_"},"yaxis3":{"title":"yaxis3","showgrid":true,"overlaying":"y","anchor":"free","position":0,"side":"left","rangeslider":{"visible":false},"tickfont":{"color":"rgb(55, 128, 191)"},"titlefont":{"color":"rgb(55, 128, 191)"},"type":"_"},"autosize":true,"showlegend":true},"config":{"responsive":true,"displayModeBar":true}};
       this._data = data;
    }
    else{
      let data  = await response.json();
      this._data = data;
    }
    this._chartVisible = true;
  }

  private FormValid():boolean {
    if(this.StartDate == null || this.EndDate == null){
      //invalid print error message
      return true;
    }
    let t = DateTime.isDateTime(this.StartDate?.value);
    let t2 = DateTime.isDateTime(this.EndDate?.value);

    return (t && t2);
 
  }


  private async getTickersAsync(){
    const response = await fetch("/stock/getall");
    
    if (isDevMode()){
      let data = {"stocks":["A","AA","AAL","AAP","AAPL","ABBV","ABC","ABNB","ABT","ACGL","ACI","ACN","ADBE","ADI","ADM","ADP","ADSK","AEE","AEP","AES","AIG","AIZ","AJG","AKAM","ALB","ALGN","ALK","ALL","ALLE","ALNY","AMAT","AMCR","AMD","AME","AMGN","AMP","AMR","AMRC","AMT","AMZN","ANET","ANSS","AON","AOS","APA","APD","APH","APTV","ARCH","ARE","ARGX","ARKK","ARNC","ASB","ASML","ASO","ATI","ATO","ATVI","AVB","AVGO","AVY","AWK","AXP","AZN","AZO","BA","BAC","BALL","BAX","BBWI","BBY","BDX","BEAM","BF-B","BG","BGNE","BIIB","BIO","BJ","BK","BKNG","BKR","BLD","BLDR","BLK","BMRN","BMY","BNTX","BPOP","BR","BRK-B","BRKR","BRO","BSX","BTC-USD","BTU","BWA","BXP","C","CADE","CAG","CAH","CALX","CARR","CASY","CAT","CB","CBOE","CBRE","CCD","CCI","CCL","CCOI","CDAY","CDE","CDNS","CDW","CE","CRM","DVN","DX-Y.NYB","EURUSD=X","GOOG","HD","IBB","IBM","ITB","IYR","JPM","JPY=X","KBH","KRE","LEN","META","MS","MSFT","MU","NFLX","NVDA","OXY","QCOM","QQQ","RSP","RUN","S\u0026P500","SMH","SPY","TAN","TLT","TMO","TSLA","TSM","TXN","UNH","V","XHB","XLE","XLF","XLI","XLK","XLP","XLU","XLV","XLY","XME","XOP","XRT","XTL","^FVX","^IRX","^IXIC","^RUT","^TNX","^VIX"]} ;
      this._allTickers = data["stocks"];
    }
    else{
      let data  = await response.json();
      this._allTickers = data["stocks"];
    }
  }
  private async GetWeeklyPrices(){
    
  }

}


//{"traces":[{"x":["2022-01-03","2022-01-04","2022-01-05","2022-01-06","2022-01-07","2022-01-10","2022-01-11","2022-01-12","2022-01-13","2022-01-14","2022-01-18","2022-01-19","2022-01-20","2022-01-21","2022-01-24","2022-01-25","2022-01-26","2022-01-27","2022-01-28"],"y":[301.209991,292.899994,276.040009,281.779999,272.470001,274.0,278.170013,279.98999,265.75,269.420013,259.029999,250.669998,241.5,233.740005,233.720001,223.240005,227.720001,219.440002,228.399994],"mode":"lines","type":"markers","name":"MultiTrace"},{"x":["2022-01-03","2022-01-04","2022-01-05","2022-01-06","2022-01-07","2022-01-10","2022-01-11","2022-01-12","2022-01-13","2022-01-14","2022-01-18","2022-01-19","2022-01-20","2022-01-21","2022-01-24","2022-01-25","2022-01-26","2022-01-27","2022-01-28"],"y":[182.009995,179.699997,174.919998,172.0,172.169998,172.190002,175.080002,175.529999,172.190002,173.070007,169.800003,166.229996,164.509995,162.410004,161.619995,159.779999,159.690002,159.220001,170.330002],"mode":"lines","type":"markers","name":"MultiTrace"}]}
// async function getDailyPriceDataAsync(stock,duration) {
//   const response = await fetch('/stock/'.concat(stock, "/d/").concat(duration));
//   const data = await response.json();
//   return data;
// }

// async function getWeeklyPriceDataAsync(stock, duration) {
//   const response = await fetch('/stock/'.concat(stock, "/w/").concat(duration));
//   const data = await response.json();
//   return data;
// }

// async function getDGainDataAsync(stock,duration) {
//   const response = await fetch('/stock/'.concat(stock, "/d/gains/").concat(duration));

//   const data = await response.json();
//   return data;
// }
// async function getWGainDataAsync(stock,duration) {
//   const response = await fetch('/stock/'.concat(stock, "/w/gains/").concat(duration));
//   const data = await response.json();
//   return data;
// }

// async function getEMADataAsync(stock, duration) {
//   const response = await fetch('/ticker/'.concat(stock, "/ema/").concat(duration));
//   const data = await response.json();
//   return data;
// }
// async function getSMADataAsync(stock, duration) {
//   const response = await fetch('/ticker/'.concat(stock, "/sma/").concat(duration));
//   const data = await response.json();
//   return data;
// }
