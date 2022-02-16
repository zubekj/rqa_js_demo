import React from 'react';

class RQAStats extends React.Component {

    calcRR(rpdata) {
        var rr = 0.0;
        for(var i = 0; i < rpdata.length; i++) {
            for(var j = 0; j < rpdata.length; j++) {
                rr += rpdata[i][j];
            }
        }
        return rr / rpdata.length / rpdata.length;
    }

    render() {
        const rpdata = this.props.rpdata;

        return (
            <div class="mt-5">
                <h3>RQA measures</h3>
                RR = {this.calcRR(rpdata)}
            </div>
        );
    }
}

export default RQAStats;
