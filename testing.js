var request = require("request");
var cheerio = require("cheerio");


//hello
var url;
var finalList = [];
var num = -1;
var stock = "";
var finalListgreen = [];
var openings = [];
var prevent = 0;
var difference;
var difference2;
var upOrDown;
var quantity = 0;
var priorclosing;
var backtesting = false;
var low;
var high;
var finalStocks = [];
var day = 0;
var earnings;
var total = 0;
counting1 = 0;
var stocks1 = "AAPL,MSFT,GOOG,GOOGL,AMZN,TSLA,BRK-B,FB,NVDA,V,JPM,UNH,JNJ,BAC,PG,WMT,HD,MA,XOM,PFE,DIS,KO,CVX,ABBV,AVGO,WFC,ADBE,PEP,CSCO,COST,LLY,TMO,NKE,ABT,ACN,VZ,CMCSA,ORCL,CRM,DHR,INTC,QCOM,MRK,MS,MCD,UPS,NFLX,SCHW,T,PM,LIN,TXN,TMUS,UNP,LOW,INTU,AXP,AMD,NEE,BMY,RTX,MDT,PYPL,CVS,C,HON,AMGN,BA,AMAT,GS,NOW,COP,DE,IBM,BLK,EL,ANTM,AMT,CAT,PLD,SBUX,CHTR,GE,BKNG,LMT,ISRG,TGT,MU,SYK,SPGI,ZTS,MDLZ,MO,MMM,CB,PNC,USB,CME,ADP,TFC,TJX,LRCX,GILD,MMC,BDX,DUK,CI,CSX,CCI,HCA,SHW,GM,ICE,F,SO,FIS,NSC,EW,ITW,CL,COF,EOG,FISV,REGN,MCO,MRNA,FCX,FDX,ATVI,AON,D,PSA,BSX,PGR,EQIX,ETN,WM,VRTX,NOC,MET,GD,KLAC,EMR,MAR,ILMN,APD,HUM,SLB,PXD,XLNX,ECL,FTNT,NXPI,ADSK,BK,AIG,CNC,MPC,NEM,TEL,JCI,IQV,SNPS,CTSH,INFO,SPG,DG,ROP,APH,PRU,MSCI,DOW,IDXX,STZ,CMG,ORLY,MNST,KMB,AEP,BAX,PAYX,AFL,SRE,HLT,DXCM,ADM,A,SYY,ADI,WBA,TRV,HSY,LHX,GPN,DD,ALGN,KHC,MCHP,HPQ,CDNS,EXC,MCK,CARR,GIS,AZO,RSG,DLR,CTAS,PSX,PH,KMI,EBAY,OXY,EA,SIVB,MSI,CTVA,STT,APTV,VLO,WMB,DFS,PPG,TT,YUM,GLW,XEL,TDG,RMD,TSN,LVS,DVN,AMP,ALL,ODFL,WELL,MTD,CBRE,SBAC,NUE,IFF,OTIS,ROST,LYB,AVB,FITB,PEG,TROW,KR,AJG,EQR,MTCH,BIIB,PCAR,ROK,CMI,BF-B,VRSK,AME,WY,DLTR,KEYS,CPRT,FAST,FRC,DHI,BLL,ED,TWTR,NDAQ,ARE,ABC,WST,HAL,ES,ANSS,WEC,EXPE,HES,BKR,WTW,EFX,OKE,DAL,ALB,LUV,AWK,O,CERN,LH,LEN,SWK,MKC,LYV,EPAM,EXR,NTRS,HRL,CCL,TSCO,VMC,ZBRA,CDW,HIG,ZBH,KEY,GWW,MAA,VFC,BBY,SYF,MLM,CHD,STX,IT,GRMN,FOX,FOXA,RF,FANG,VRSN,DOV,RJF,URI,FTV,MTB,CFG,VIAC,STE,PKI,HBAN,SWKS,EIX,IR,FE,DTE,HPE,RCL,PPL,MGM,AEE,PAYC,K,COO,ETR,DRE,ENPH,SBNY,PFG,ESS,VTR,ULTA,JBHT,FLT,WAT,NTAP,TTWO,TDY,TYL,CINF,BRO,TER,MPWR,DRI,BIO,CTRA,EXPD,VTRS,CZR,OMC,AKAM,HOLX,GNRC,POOL,CTLT,GPC,ETSY,CMS,BXP,IP,NVR,KMX,NLOK,AMCR,CE,MOS,CLX,CNP,PEAK,TRMB,CRL,BR,UDR,WDC,DISH,WAB,CAG,MRO,TECH,XYL,EMN,DGX,WRB,J,LKQ,DPZ,UAL,CF,BEN,BBWI,TXT,AVY,FDS,L,CEG,ROL,TFX,DISCA,DISCK,AES,KIM,FMC,INCY,IEX,HWM,PWR,CAH,EVRG,QRVO,SJM,ATO,LNT,IPG,PKG,MKTX,MAS,ABMD,PTC,SEDG,AAP,NWS,NWSA,RHI,LNC,HST,CMA,HAS,CPB,IRM,CBOE,CTXS,LDOS,WRK,FFIV,FBHS,APA,JKHY,WHR,AAL,REG,PHM,XRAY,CHRW,AOS,CDAY,ZION,RE,SNA,DVA,UHS,JNPR,TPR,NI,LUMN,WYNN,ALLE,IVZ,GL,TAP,HSIC,BWA,MHK,PNR,NRG,ANET,LW,SEE,FRT,NWL,AIZ,DXC,RL,PBCT,OGN,PENN,UA,UAA,IPGP,VNO,PNW,ALK,HII,PVH,NLSN,NCLH";

var stocks = stocks1.split(",");
for (var a = 0; a < stocks.length - 1; a++) {


        url = "https://finance.yahoo.com/quote/" + stocks[a] + "/history?p=" + stocks[a];
request(url, a, function(err, response, html)  {
    counting1++;
    prevent = 0;
    

    if (!err) {
        var $ = cheerio.load(html);
        var close = [];
        openings = [];
        var closings = [];
        for (var i = 4 + 7*day; i <= 179+7*day; i += 7) {
            if ($(".BdT").children().eq(i-3).text().toLowerCase().includes("dividend")) {
                i += 2;
            }
            if (backtesting) {
                var openings2 = ($(".BdT").children().eq(1+7*(day-1)).text());
                var priorclosing = ($(".BdT").children().eq(11+7*(day-1)).text());
                var low = ($(".BdT").children().eq(3+7*(day-1)).text());
                var high = ($(".BdT").children().eq(2+7*(day-1)).text());
                while (openings2.indexOf(",") != -1) {
                    var openings2 = openings2.substring(0, openings2.indexOf(",")) + openings2.substring(openings2.indexOf(",") + 1, openings2.length)
                }
                var closings2 = ($(".BdT").children().eq(4+7*(day-1)).text());

                while (closings2.indexOf(",") != -1) {
                    var closings2 = closings2.substring(0, closings2.indexOf(",")) + closings2.substring(closings2.indexOf(",") + 1, closings2.length)
                }
                difference = (openings2 - closings2) / (openings2);
                difference2 = (closings2 - openings2) / (openings2);
            }
            if (i != 4) {
            if ($(".BdT").children().eq(i).text() < $(".BdT").children().eq(4+7*25*day)) {
                if ($(".BdT").children().eq(i).text() < $(".BdT").children().eq(i-3).text()) {
                    close.push($(".BdT").children().eq(i).text());
                }
                else {
                    close.push($(".BdT").children().eq(i-3).text());
                }
            }
            else {
                if ($(".BdT").children().eq(i).text() > $(".BdT").children().eq(i-3).text()) {
                    close.push($(".BdT").children().eq(i).text());
                }
                else {
                    close.push($(".BdT").children().eq(i-3).text());
                }
            }
            }
            else {
                close.push($(".BdT").children().eq(i).text());
            }
            if (openings.length < 26) {

            openings.push($(".BdT").children().eq(i-3).text());
            var openings1 = openings;
            closings.push($(".BdT").children().eq(i).text());
            }


            stock = $("#quote-header-info").children().eq(1).children().eq(0).children().eq(0).children().eq(0).text();
            if (openings1.length == 25) {
            }
        }
    }
    fill = openings;





//////////////////////////////////START OF AROON////////////////////////////////////////////

        var highest = close[0];
        var highestIndex = 0;
        var lowest = close[0];
        var lowestIndex = 0;
        for (var i = 0; i <= close.length - 1; i++) {



             if (highest < close[i]) {
                    highest = close[i];
                    highestIndex = i;
                }
            if (lowest > close[i]) {
                lowest = close[i];
                lowestIndex = i;
            }
        }
        aroonGreen = 100 - highestIndex * 4;
        aroonRed = 100 - lowestIndex * 4;

        if ((aroonRed == 0 && aroonGreen == 100) || (aroonGreen == 0 && aroonRed == 100)) {
            if (aroonRed == 0) {
                upOrDown = "up";
            }
            else {
                upOrDown = "down";
            }
            finalList.push(stock);
            if (aroonGreen == 100) {
                finalListgreen.push(stock);
            }
        console.log(finalList);




////////////////////////////START OF PREREQUISITE///////////////////////////////////////





            var negative = 0;
    var positive = 0;
    var negative1 = 0;
    var positive1 = 0;
    var negative2 = 0;
    var positive2 = 0;
    var day5;
    var day10;
    var day25;
    for (var i = 0; i <= 4; i++) {
        if (openings1[i] <= closings[i]) {
            positive++;
        }
        else if (openings1[i] > closings[i]) {
            negative++;

        }

        if (i == 4) {
            day5 = negative/(5);

        }
    }

    for (var i = 0; i <= 9; i++) {
        if (openings1[i] <= closings[i]) {
            positive1++;
        }
        else if (openings1[i] > closings[i]) {
            negative1++;
        }
        if (i == 9) {
            day10 = negative1/(10);


        }
    }
    if (day5 >= 0.8 && day10 >= 0.6) {
        
////////////////////////////START OF EVALUATE///////////////////////////////////////


var plusdays = 0;

    var sequence = 0;
    var continue$ = true;
    var i = 0;
    while (continue$) {
        if (openings1[i] > closings[i]) {


            if (openings1[i+1] > closings[i+1] && openings1[i+1] > closings[i]) {
                sequence++;
            }
            else {
                plusdays++;
            }
        }
        else if (openings1[i] <= closings[i]) {
            plusdays++;
        }
        if (plusdays > 1) {
            continue$ = false;
            console.log(sequence + ":: " + stock);
            finalStocks.push(stock);
            console.log(finalStocks);
            if (backtesting) {
                total += difference;
                quantity++;
                console.log("Last stock's gain: " + difference);
                console.log("openings2: " + openings2);
                console.log("closings: " + closings2);
                console.log(total/quantity);
                if (upOrDown == "down") {
                    if (openings2 > low * 1.0055) {
                        console.log("+0.5%");
                        console.log(openings2 - high);
                    }
                    else {
                        console.log("Less than 0.5%");
                        console.log(openings2 - high);
                    }
                }
                else {
                    if (openings2 * 1.0055 < high) {
                        console.log("+0.5%");
                        console.log(openings2 - high);
                    }
                    else {
                        console.log("Less than 0.5%");
                        console.log(openings2 - high);
                    }
                }
            }
        }
        if (i < 24) { 
            i++;
        }
    }



///////////////////////////////END OF EVALUATE/////////////////////////////////////////////////////////






        }


if (day5 <= 0.2 && day10 <= 0.4) {
    

///////////////////////////////START OF EVALUATE ++ //////////////////////////////////////////////////

    
    
    var plusdays2 = 0;
    
        var sequence2 = 0;
        var continue$2 = true;
        var i2 = 0;
        while (continue$2) {
            if (openings1[i2] < closings[i2]) {
    
    
                if (openings1[i2+1] < closings[i2+1] && openings1[i2+1] < closings[i2]) {
                    sequence++;
                }
                else {
                    plusdays2++;
                }
            }
            else if (openings1[i2] >= closings[i2]) {
                plusdays2++;
            }
            if (plusdays2 > 1) {
                continue$2 = false;
                console.log(sequence2 + ":: " + stock);
                finalStocks.push(stock);
                console.log(finalStocks);
                if (backtesting) {
                    total += difference2;
                    quantity++;
                    console.log("Last stock's gain: " + difference2);
                    console.log("openings2: " + openings2);
                    console.log("closings: " + closings2);
                    console.log(total/quantity);
                    if (upOrDown == "down") {
                        if (openings2 > low * 1.0055) {
                            console.log("+0.5%");
                            console.log(openings2 - high);
                        }
                        else {
                            console.log("Less than 0.5%");
                            console.log(openings2 - high);
                        }
                    }
                    else {
                        if (openings2 * 1.0055 < high) {
                            console.log("+0.5%");
                            console.log(openings2 - high);
                        }
                        else {
                            console.log("Less than 0.5%");
                            console.log(openings2 - high);
                        }
                    }
                }
    
            }
            if (i2 < 24) { 
                i2++;
            }
        }
    
    
    
    ///////////////////////////////END OF EVALUATE ++ /////////////////////////////////////////////////////////
    
    
    
    
    
    
            }
    }
num++;
});
}

var aroonRed;
var aroonGreen;