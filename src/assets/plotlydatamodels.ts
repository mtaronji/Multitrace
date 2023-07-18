//models used for creating plotly graphing models
export interface Trace{
    x: string[] | number[] | Date[];
    y: string[] | number[] | Date[];
    z?: string[] | number[] | Date[];
    mode:string;
    type:string;
    name:string;
    yaxis?:string;
    marker?:Marker;
    line?:Line;
}
export interface plotlyMultiTraceModel{
    traces :Trace[];
    layout :layout;
    config :config;
}

export interface layout{
    
    xaxis?:layout_axis;
    yaxis:layout_axis;
    yaxis2?:layout_axis;
    yaxis3?:layout_axis;
    yaxis4?:layout_axis;
    yaxis5?:layout_axis;
    yaxis6?:layout_axis;
    yaxis7?:layout_axis;
    yaxis8?:layout_axis;
    yaxis9?:layout_axis;
    yaxis10?:layout_axis;
    autosize: boolean;
    showlegend:boolean; 
}

export interface config{
    responsive:boolean;
    displayModeBar:boolean;
}

export interface layout_axis{
    title:string;
    type:string;
    showgrid:boolean;
    rangeslider?:rangeslider;
    titlefont?:TitleFont;
    tickfont?:TickFont;
    overlaying?:string;
    anchor?:string;
    side?:string;
    domain? :number[];
}

export interface title{
    font:font;
    text:string;
}
export interface font{
    color:string;
    family:string;
    size:number;
}

export interface rangeslider{
    visible:boolean;
}

export interface Marker{
    color:string;
    size:number;
}
export interface Line{
    color:string;
    width:number
}

export interface TickFont{
    color:string;
}

export interface TitleFont{
    color:string;
}