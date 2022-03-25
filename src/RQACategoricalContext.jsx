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
       
        this.state = {rpdata: []};

        // This binding is necessary to make `this` work in the callback
        this.calculateRplot = this.calculateRplot.bind(this);
    }


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

    render() {
        const rpdata = this.state.rpdata;

        return (
            <Container>
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

export default RQACategoricalContext;
