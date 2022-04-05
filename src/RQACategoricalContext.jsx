import React from 'react';
import RPlot from './RPlot.jsx';
import RQAStats from './RQAStats.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/**
 * RQACategoricalContext.
 *
 * Implements categorical RQA.
 *
 * @class RQACategoricalContext
 * @extends {React.Component}
 */
class RQACategoricalContext extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {rpdata: [], minLine: 2, removeMainDiag: true};

        this.lineLengthInput = React.createRef();
        
        // This binding is necessary to make `this` work in the callback
        this.calculateRplot = this.calculateRplot.bind(this);
    }

    validateLineLength(event) {
        const target = event.target;
        const value = target.value;
        
        if(Number(value) < 0 || !Number.isInteger(Number(value))) return false;
    }

    calculateRplot() {
        const data = this.props.tsdata;
        const data2 = this.props.tsdata2.length > 0 ? this.props.tsdata2 : data;

        var res = new Array(data.length);
        for(var i = 0; i < res.length; i++) {
            var resi = new Array(data2.length);
            for(var j = 0; j < resi.length; j++) {
                resi[j] = Number(data[i] === data2[j]);
            }
            res[i] = resi;
        }

        this.setState({rpdata: res, minLine: this.lineLengthInput.current.value,
                       removeMainDiag: this.props.tsdata2.length === 0});
    }

    render() {
        const rpdata = this.state.rpdata;
        const minLine = this.state.minLine;

        return (
            <Container>
                <Row className="mt-4">
                    <Col lg={3}>
                    <h3>{this.props.tsdata2.length > 0 ? "Cross-RQA measures" : "RQA measures"}</h3>
                    <RQAStats rpdata={rpdata} minLine={minLine} removeMainDiag={this.state.removeMainDiag} />

                     <form>
                    <div className="form-group row pb-2">
                        <label htmlFor="lineLength" className="col-sm-8 col-form-label">Minimum line length:</label>
                        <div className="col-sm-4">
                        <input type="number" id="lineLength" name="lineLength" className="w-100" step="1" defaultValue="2" ref={this.lineLengthInput} onChange={this.validateLineLength} />
                        </div>
                    </div>
                    </form>

                    <button onClick={this.calculateRplot}>Run RQA</button>
                    </Col>
                    <Col lg={9}><RPlot rpdata={rpdata} /></Col>
                </Row>
            </Container>
        );
    }

}

export default RQACategoricalContext;
