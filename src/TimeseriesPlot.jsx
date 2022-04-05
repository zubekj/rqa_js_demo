import React from 'react';
import Plot from 'react-plotly.js';

class TimeseriesPlot extends React.Component {

    render() {
        const tsdata = this.props.tsdata;
        const dim = this.props.dimension;
        const delay = this.props.delay;
        const keys = [...Array(tsdata.length).keys()];

        var data = [];
        for(var i=0; i < dim; i++) {
            data.push({x: keys.slice(0, keys.length-i*delay), y: tsdata.slice(i*delay)});
        }

        return (
            <div>
            <Plot data={data} layout={{width: 800, height: 350, margin: {b: 20, t: 0}}} />
            </div>
        );
    }
}

export default TimeseriesPlot;
