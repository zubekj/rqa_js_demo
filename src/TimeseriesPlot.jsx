import React from 'react';
import Plot from 'react-plotly.js';

class TimeseriesPlot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const tsdata = this.props.tsdata;
        const keys = [...Array(tsdata.length).keys()] 

        return (
            <div>
            <Plot data={[{x: keys, y: tsdata}]} />
            </div>
        );
    }
}

export default TimeseriesPlot;
