import { Injectable } from "@angular/core";

@Injectable()

export class TickerService{
    tickers :string[] = ["TSLA", "AAPL", "AMD", "NVDA", "SPY", "QQQ"];
    durations: number[] = [1,2,3,4,5,6,7,8,9,10];
}