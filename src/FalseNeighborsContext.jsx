import React from 'react';
import TimeseriesPlot from './TimeseriesPlot.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class FalseNeighborsContext extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {maxDim: 10, delay: 1, fnData: []};
        
        this.handleParameterChange = this.handleParameterChange.bind(this);
        this.updateFalseNeighbors = this.updateFalseNeighbors.bind(this);
    }
    
    searchDimensionality(data, maxDim, delay) {
     
        function argMin(array) {
            return array.map((x, i) => [x, i]).reduce((r, a) => (a[0] < r[0] ? a : r))[1];
        }

        
        var distances = new Array(data.length);
        for(var i=0; i < data.length; i++) {
            var row = new Array(data.length);
            for(var j=0; j < data.length; j++) {
                if(i !== j) {
                    row[j] = Math.abs(data[i] - data[j]);
                } else {
                    row[j] = Infinity;
                }
            }
            distances[i] = row;
        }

        var neighbors = [1.0];
        for(var d=1; d < maxDim; d++) {
            var falseNeighborsCount = 0;
            for(i=0; i < distances.length - d*delay; i++) {
                j = argMin(distances[i].slice(0, -d*delay));
                var rDiff = Math.abs(data[i+d*delay] - data[j+d*delay]);
                if(rDiff / distances[i][j] > 15.0) {
                    falseNeighborsCount++;
                }

                for(j=0; j < data.length - d*delay; j++) {
                    distances[i][j] += Math.abs(data[i+d*delay] - data[j+d*delay]);
                }
            }
            neighbors.push(falseNeighborsCount / data.length);
        }

        return neighbors;
    }
    
    handleParameterChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === "maxDim" || name === "delay") {
            if(Number(value) <= 0 || !Number.isInteger(Number(value))) return false;
        }

        this.setState({[name]: Number(value)});
    }

    updateFalseNeighbors() {
        this.setState({fnData: this.searchDimensionality(this.props.tsdata, this.state.maxDim, this.state.delay)});
    }

    render() {
        return (
        <Container className="mb-5">
            <Row className="mt-4">
                <Col lg={3}>
                <h2>False neighbors</h2>
                <Row>
                <Col>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="maxDim" className="col-sm-8 col-form-label">Maximum dimensionality:</label>
                            <div className="col-sm-4">
                                <input type="number" id="maxDim" name="maxDim" className="w-100" step="1" value={this.state.maxDim} onChange={this.handleParameterChange} />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label htmlFor="delay" className="col-sm-8 col-form-label">Delay:</label>
                            <div className="col-sm-4">
                                <input type="number" id="delay" name="delay" className="w-100" step="1" value={this.state.delay} onChange={this.handleParameterChange} />
                            </div>
                        </div>
                    </form> 
                    <div className="form-group row">
                        <button onClick={this.updateFalseNeighbors} className="w-50">Run FN analysis</button>
                    </div>
                </Col>
                </Row>

                </Col>
                <Col lg={9}>
                    <div className="mt-5">
                    <TimeseriesPlot tsdata={this.state.fnData} delay={0} dimension={1} />
                    </div>
                </Col>
            </Row>
        </Container>
        );
    }
}

export default FalseNeighborsContext;
