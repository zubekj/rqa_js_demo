import React from 'react';
import RPlot from './RPlot.jsx';
import RQAStats from './RQAStats.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * RQAContinuousContext.
 *
 * Implements categorical RQA.
 *
 * @class RQAContinuousContext
 * @extends {RQAContext}
 */
class RQAContinuousContext extends React.Component {

   constructor(props) {
        super(props);

        this.state = {rpdata: [], dimension: 1, delay: 1, threshold: 0.1, minLine: 2, removeMainDiag: true};

        this.lineLengthInput = React.createRef();

        // This binding is necessary to make `this` work in the callback
        this.handleParameterChange = this.handleParameterChange.bind(this);
        this.calculateRplot = this.calculateRplot.bind(this);
    }

    handleParameterChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        if(name === "dimension" || name === "delay") {
            if(Number(value) < 0 || !Number.isInteger(Number(value))) return false;
        } else if(name === "threshold") {
            if(Number(value) < 0) return false;
        }

        this.setState({[name]: value});
    }

    validateLineLength(event) {
        const target = event.target;
        const value = target.value;
        
        if(Number(value) < 0 || !Number.isInteger(Number(value))) return false;
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
        const data2 = this.props.tsdata2;
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

        var embed2 = embed;

        if(data2.length > 0) {
            embed2 = [];    

            for(i = delay*(dim-1); i < data2.length; i++) {
                record = new Array(dim);
                for(j = 0; j < dim; j++) {
                    record[j] = data2[i-j*delay];
                }
                embed2.push(record);
            }
        }

        var res = new Array(embed.length);
        for(i = 0; i < res.length; i++) {
            var resi = new Array(embed2.length);
            for(j = 0; j < resi.length; j++) {
                resi[j] = Number(distance(embed[i], embed2[j]) < threshold);
            }
            res[i] = resi;
        }
        
        this.setState({rpdata: res, minLine: this.lineLengthInput.current.value,
                       removeMainDiag: this.props.tsdata2.length === 0});
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

    render() {
        const rpdata = this.state.rpdata;
        const minLine = this.state.minLine;

        return (
            <Container>
                {this.renderRQAParameters()}
                <Row>
                    <Col sm={3}>
                    <h3>{this.props.tsdata2.length > 0 ? "Cross-RQA measures" : "RQA measures"}</h3>
                    <RQAStats rpdata={rpdata} minLine={minLine} removeMainDiag={this.state.removeMainDiag} />
                    
                    <form>
                    <div className="form-group row">
                    <label htmlFor="lineLength" className="col-sm-4 col-form-label">Minimum line length:</label>
                    <div className="col-sm-1">
                    <input type="number" id="lineLength" name="lineLength" step="1" defaultValue="2" ref={this.lineLengthInput} onChange={this.validateLineLength} />
                    </div>
                    </div>
                    </form>

                    <button onClick={this.calculateRplot}>Run RQA</button>
                    </Col>
                    <Col><RPlot rpdata={rpdata} /></Col>
                </Row>
            </Container>
        );
    }
}

export default RQAContinuousContext;
