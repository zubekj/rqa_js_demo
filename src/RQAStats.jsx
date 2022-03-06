import React from 'react';


class RQAStats extends React.PureComponent {

    calcRR(rpdata, minLine=2) {

        function incrementHist(hist, key) {
            if(!(key in hist)) hist[key] = 0;
            return hist[key]++;
        }

        // histogram of diagonal line lengths
        var diagHist = {};
        for(var di = 1; di < rpdata.length; di++) {
            var diagCountL = 0;
            var diagCountU = 0;
            for(var j = 0; j < rpdata.length - di; j++) {
                // lower diagonal
                if(rpdata[di+j][j] === 1) {
                    diagCountL++;
                } else {
                    incrementHist(diagHist, diagCountL);
                    diagCountL = 0;
                }
                // upper diagonal
                if(rpdata[j][di+j] === 1) {
                    diagCountU++;
                } else {
                    incrementHist(diagHist, diagCountU);
                    diagCountU = 0;
                }
            }
            incrementHist(diagHist, diagCountL);
            incrementHist(diagHist, diagCountU);
        }
        // main diagonal
        diagCountL = 0;
        for(j = 0; j < rpdata.length; j++) {
            if(rpdata[j][j] === 1) {
                diagCountL++;
            } else {
                incrementHist(diagHist, diagCountL);
                diagCountL = 0;
            }
        }
        incrementHist(diagHist, diagCountL);

        // histogram of vertical line lengths
        var vertHist = {};
        for(var i = 0; i < rpdata.length; i++) {
            var count = 0;
            for(j = 0; j < rpdata.length; j++) {
                if(rpdata[j][i] === 1) {
                    count++;
                } else {
                    incrementHist(vertHist, count);
                    count = 0;
                }
            }
            incrementHist(vertHist, count);
        }

        var RR = 0.0;
        var DET = 0.0;
        var L = 0.0;
        var Lcount = 0.0;
        var Lmax = 0.0;
        var ENTR = 0.0;
        var TT = 0.0;
        var Vcount = 0.0;
        var Vmax = 0.0;

        var k = 0;
        for(let key in diagHist) {
            k = Number(key);
            RR += k*diagHist[key];
            if(key >= minLine) {
                DET += k*diagHist[key];
                Lcount += diagHist[key];
            }
            if((k > Lmax) && (diagHist[key] > 0)) Lmax = k;
        }

        for(let key in diagHist) {
            if(Number(key) >= minLine && diagHist[key] > 0) {
                ENTR -= diagHist[key] / Lcount * Math.log(diagHist[key] / Lcount);
            }
        }
    
        for(let key in vertHist) {
            k = Number(key);
            if(k >= minLine) {
                TT += key*vertHist[key];
                Vcount += vertHist[key];
            }
            if(k > Vmax && vertHist[key] > 0) Vmax = k;
        }

        TT = Vcount > 0 ? TT / Vcount : 0.0;
        L = DET / Lcount;
        DET /= RR;
        RR /= rpdata.length * rpdata.length;

        return { RR, DET, L, Lmax, ENTR, TT, Vmax };
    }


    render() {
        const rpdata = this.props.rpdata;

        let { RR, DET, L, Lmax, ENTR, TT, Vmax } = this.calcRR(rpdata);

        return (
            <div className="mt-5">
                <h3>RQA measures</h3>
                RR = {RR}<br />
                DET = {DET}<br />
                L = {L}<br />
                Lmax = {Lmax}<br />
                ENTR = {ENTR}<br />
                TT = {TT}<br />
                Vmax = {Vmax}<br />
            </div>
        );
    }
}

export default RQAStats;
