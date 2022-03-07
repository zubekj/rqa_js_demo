import React from 'react';
import LoadTimeSeries from './LoadTimeSeries.jsx';
import RPlot from './RPlot.jsx';
import RQAStats from './RQAStats.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * Abstract Class RQAContext.
 *
 * To be extended by classes implementing categorical and continuous RQA.
 *
 * @class RQAContext
 */
class RQAContext extends React.Component {

    constructor(props) {
        super(props);
       
        if (this.constructor === RQAContext) {
            throw new Error("Abstract classes can't be instantiated.");
        }

        this.state = {rpdata: []};

        // This binding is necessary to make `this` work in the callback
        this.calculateRplot = this.calculateRplot.bind(this);
    }

    calculateRplot() {
        throw new Error("Method 'calculateRplot()' must be implemented.");
    }

    renderRQAParameters() {
        throw new Error("Method 'renderRQAParameters()' must be implemented.");
    }

    render() {
        const rpdata = this.state.rpdata;

        return (
            <Container>
                {this.renderRQAParameters()}
                <Row>
                    <Col sm={3}><RQAStats rpdata={rpdata} />
                    <button onClick={this.calculateRplot}>Run RQA</button>
                    </Col>
                    <Col><RPlot rpdata={rpdata} /></Col>
                </Row>
            </Container>
        );
    }
}


/**
 * RQACategoricalContext.
 *
 * Implements categorical RQA.
 *
 * @class RQACategoricalContext
 * @extends {RQAContext}
 */
class RQACategoricalContext extends RQAContext {

    calculateRplot() {
        const data = this.props.tsdata;

        var res = new Array(data.length);
        for(var i = 0; i < res.length; i++) {
            var resi = new Array(data.length);
            for(var j = 0; j < resi.length; j++) {
                resi[j] = Number(data[i] === data[j]);
            }
            res[i] = resi;
        }

        this.setState({rpdata: res});
    }

    renderRQAParameters() {
        return null;
    }

}

/**
 * RQAContinuousContext.
 *
 * Implements categorical RQA.
 *
 * @class RQAContinuousContext
 * @extends {RQAContext}
 */
class RQAContinuousContext extends RQAContext {

    constructor(props) {
        super(props);
      
        this.state = {rpdata: [], dimension: 1, delay: 1, threshold: 0.1};

        // This binding is necessary to make `this` work in the callback
        this.handleParameterChange = this.handleParameterChange.bind(this);
    }

    handleParameterChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === "dimension" || name === "delay") {
            if(Number(value) <= 0 || !Number.isInteger(Number(value))) return false;
        } else if(name === "threshold") {
            if(Number(value) <= 0) return false;
        }

        this.setState({[name]: value});
    }

    calculateRplot() {
        
        function distance(x, y) {
            var r = 0.0
            for(var i = 0; i < x.length; i++) {
                r += (x[i]-y[i])**2
            }
            return Math.sqrt(r);
        }

        const data = this.props.tsdata;
        const dim = this.state.dimension;
        const delay = this.state.delay;
        const threshold = this.state.threshold;

        var embed = [];

        for(var i = delay*(dim-1); i < data.length; i++) {
            var record = new Array(dim);
            for(var j = 0; j < dim; j++) {
                record[j] = data[i-j*delay];
            }
            embed.push(record);
        }

        var res = new Array(embed.length);
        for(i = 0; i < res.length; i++) {
            var resi = new Array(embed.length);
            for(j = 0; j < resi.length; j++) {
                resi[j] = Number(distance(embed[i], embed[j]) < threshold);
            }
            res[i] = resi;
        }
        
        this.setState({rpdata: res});
    }

    renderRQAParameters() {
        return (
            <Row>
                <Col sm={12}>
                    <div className="mt-5">
                    <h3>Parameters</h3>
                    <p>Set embedding parameters and the recurrence threshold.</p>
                    <form>
                        <div className="form-group row">
                            <label htmlFor="dimension" className="col-sm-2 col-form-label">Embedding dimension:</label>
                            <div className="col-sm-6">
                                <input type="number" id="dimension" name="dimension" step="1" value={this.state.dimension} onChange={this.handleParameterChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="delay" className="col-sm-2 col-form-label">Embedding delay:</label>
                            <div className="col-sm-6">
                                <input type="number" id="delay" name="delay" step="1" value={this.state.delay} onChange={this.handleParameterChange} />
                            </div>
                        </div>

                        <div className="form-group row">
                            <label htmlFor="threshold" className="col-sm-2 col-form-label">Recurrence threshold:</label>
                            <div className="col-sm-6">
                                <input type="number" id="threshold" name="threshold" step="0.1" value={this.state.threshold} onChange={this.handleParameterChange} />
                            </div>
                        </div>
                    </form> 
                    </div>
                </Col>
            </Row>
        );
    }

}

export default RQAContext;
export { RQACategoricalContext, RQAContinuousContext };
