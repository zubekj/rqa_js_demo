import React from 'react';
import Plot from 'react-plotly.js';

class RPlot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const rpdata = this.props.rpdata;

        return (
            <div>
            <Plot data={[{z: rpdata, type: 'heatmap'}]} />
            </div>
        );
    }
}

export default RPlot;
