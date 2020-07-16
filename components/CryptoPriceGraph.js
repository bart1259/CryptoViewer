import React from 'react';
import { StyleSheet } from 'react-native'
import {LineChart} from 'react-native-chart-kit'

const CryptoPriceGraph = function({allPriceData, days}){
    
    const sliceDays = Math.min(allPriceData.prices.length, days);
    const priceData = [...allPriceData.prices].splice(allPriceData.prices.length - sliceDays, sliceDays);
    const modulus = Math.ceil(priceData.length / 15);

    let format = '#MMM# #YYYY#';
    switch (days) {
        case 7:
            format = '#MMM# #DD#';
            break;
        case 30:
            format = '#MMM# #DD#';
            break;
        case 365:
            format = '#MMM# #YYYY#';
            break;
    
        default:
            format = '#MMM# #YYYY#';
            break;
    }

    return (
        <React.Fragment>
            <LineChart
                data={{
                    labels: priceData.map(function (x, index) {
                        if(index % modulus == 0){
                            return new Date(x[0]).customFormat(format) ;
                        }
                        return "";
                    }),
                    datasets: [
                    {
                        data: priceData.map(function (x, index) {
                            return x[1];
                        })
                    }
                    ]
                }}
                height={400}
                width={400}
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, 1.0)`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, 1.0)`,
                    strokeWidth: 0.9,
                }}
                withHorizontalLines = {false}
                withVerticalLines = {false}
                verticalLabelRotation={90}
                style={styles.chartStyle}
                getDotColor = {() => 'rgba(255,255,255,0.0)'}
            />
        </React.Fragment>
    )
}

export default CryptoPriceGraph;

const styles = StyleSheet.create({
    chartStyle: {
        alignItems:  'center',
        position: 'relative',
    },
});

//*** This code is copyright 2002-2016 by Gavin Kistner, !@phrogz.net
//*** It is covered under the license viewable at http://phrogz.net/JS/_ReuseLicense.txt
Date.prototype.customFormat = function(formatString){
    var YYYY,YY,MMMM,MMM,MM,M,DDDD,DDD,DD,D,hhhh,hhh,hh,h,mm,m,ss,s,ampm,AMPM,dMod,th;
    YY = ((YYYY=this.getFullYear())+"").slice(-2);
    MM = (M=this.getMonth()+1)<10?('0'+M):M;
    MMM = (MMMM=["January","February","March","April","May","June","July","August","September","October","November","December"][M-1]).substring(0,3);
    DD = (D=this.getDate())<10?('0'+D):D;
    DDD = (DDDD=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][this.getDay()]).substring(0,3);
    th=(D>=10&&D<=20)?'th':((dMod=D%10)==1)?'st':(dMod==2)?'nd':(dMod==3)?'rd':'th';
    formatString = formatString.replace("#YYYY#",YYYY).replace("#YY#",YY).replace("#MMMM#",MMMM).replace("#MMM#",MMM).replace("#MM#",MM).replace("#M#",M).replace("#DDDD#",DDDD).replace("#DDD#",DDD).replace("#DD#",DD).replace("#D#",D).replace("#th#",th);
    h=(hhh=this.getHours());
    if (h==0) h=24;
    if (h>12) h-=12;
    hh = h<10?('0'+h):h;
    hhhh = hhh<10?('0'+hhh):hhh;
    AMPM=(ampm=hhh<12?'am':'pm').toUpperCase();
    mm=(m=this.getMinutes())<10?('0'+m):m;
    ss=(s=this.getSeconds())<10?('0'+s):s;
    return formatString.replace("#hhhh#",hhhh).replace("#hhh#",hhh).replace("#hh#",hh).replace("#h#",h).replace("#mm#",mm).replace("#m#",m).replace("#ss#",ss).replace("#s#",s).replace("#ampm#",ampm).replace("#AMPM#",AMPM);
  };