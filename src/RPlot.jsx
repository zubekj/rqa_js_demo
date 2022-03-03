import React from 'react';
import Plot from 'react-plotly.js';

class RPlot extends React.Component {

    render() {
        const rpdata = this.props.rpdata;

        return (
            <div>
            <Plot data={[{z: rpdata, type: 'heatmap'}]} layout={{width: 800, height: 800}} />
            </div>
        );
    }
}

export default RPlot;
