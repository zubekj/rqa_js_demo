import React from 'react';
import LoadTimeSeries from './LoadTimeSeries.jsx';
import TimeseriesPlot from './TimeseriesPlot.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class AverageMutualInformationContext extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {maxDelay: 100, bins: 10};
        
        this.handleParameterChange = this.handleParameterChange.bind(this);
    }
    
    calcAMI(x, d, bins) {

        var AMI = 0;

        const histX = new Array(bins).fill(0);
        const histY = new Array(bins).fill(0);
        const histXY = new Array(bins*bins).fill(0);

        for(var i=d; i < x.length; i++) {
            histX[x[i]] += 1;
            histY[x[i-d]] += 1;
            histXY[x[i]*bins + x[i-d]] += 1;
        }

        for(i=0; i < bins; i++) {
            for(var j=0; j < bins; j++) {
                if(histXY[i*bins + j] > 0) {
                    AMI += histXY[i*bins + j] / x.length * (Math.log(histXY[i*bins + j]) - Math.log(histX[i]) - Math.log(histY[j]) + Math.log(x.length));
                }
            }
        }

        return AMI;
    }

    searchDelay(data) {
      
        // discretize data through equal sized bins
        const maxVal = Math.max(...data);
        const minVal = Math.min(...data);

        const maxDelay = Math.min(this.state.maxDelay, data.length);
        const bins = this.state.bins;

        let ddata = data.map(x => Math.floor((x - minVal) / maxVal * (bins-1)));

        var res = [];
        for(var d=1; d < maxDelay; d++) {
            res.push(this.calcAMI(ddata, d, bins));
        }

        return res;
    }
    
    handleParameterChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === "maxDelay" || name === "bins") {
            if(Number(value) <= 0 || !Number.isInteger(Number(value))) return false;
        }

        this.setState({[name]: Number(value)});
    }

    render() {
        return (
        <Container>
            <Row>
                <Col sm={3}>
                <h2>AMI</h2>
                <Row>
                <Col sm={12}>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="maxDelay" className="col-sm-4 col-form-label">Maximum delay:</label>
                            <div className="col-sm-2">
                                <input type="number" id="maxDelay" name="maxDelay" step="1" value={this.state.maxDelay} onChange={this.handleParameterChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="bins" className="col-sm-4 col-form-label">Bins:</label>
                            <div className="col-sm-2">
                                <input type="number" id="bins" name="bins" step="1" value={this.state.bins} onChange={this.handleParameterChange} />
                            </div>
                        </div>
                    </form> 
                </Col>
                </Row>

                </Col>
                <Col><TimeseriesPlot tsdata={this.searchDelay(this.props.tsdata)} /></Col>
            </Row>
        </Container>
        );
    }
}

export default AverageMutualInformationContext;
