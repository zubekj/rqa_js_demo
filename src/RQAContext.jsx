import React from 'react';
import TimeseriesPlot from './TimeseriesPlot.jsx';
import RPlot from './RPlot.jsx';
import RQAStats from './RQAStats.jsx';
import ColumnSelect from './ColumnSelect.jsx';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


class RQAContext extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tsdata: [0, 1, 0, 1], columnNames: [], columns: [], selectedColumn: 0};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    }

    handleClick() {
        this.setState({tsdata: this.state.columns[this.state.selectedColumn]});
    }

    handleChange(event) {
        this.setState({selectedColumn: event.target.value});
    }

    handleFile(event) {
        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            var reader = new FileReader();
          	reader.onload = this.loadHandler;
        	reader.onerror = this.errorHandler;
        	// Read file into memory as UTF-8      
        	reader.readAsText(event.target.files[0]);
        } else {
            alert('FileReader are not supported in this browser.');
        }
    }

    loadHandler(event) {
        const csv = event.target.result;
        const allTextLines = csv.split(/\r\n|\n/);
        const colNames = allTextLines[0].split(",");
        const columns = [];
        colNames.forEach(x => columns.push([]));

        for(var i = 1; i < allTextLines.length; i++) {
            allTextLines[i].split(",").forEach((x, j) => columns[j].push(x));
        }
        this.setState({columnNames: colNames});
        this.setState({columns: columns});
    }

    errorHandler(evt) {
	    if(evt.target.error.name === "NotReadableError") {
		    alert("Cannot read file!");
	    }
    }

    calculate_rplot(data) {
        var res = new Array(data.length);
        for(var i = 0; i < res.length; i++) {
            var resi = new Array(data.length);
            for(var j = 0; j < resi.length; j++) {
                resi[j] = Number(data[i] === data[j]);
            }
            res[i] = resi;
        }
        return res;
    }
    
    render() {
        const tsdata = this.state.tsdata;
        const rpdata = this.calculate_rplot(tsdata);

        return (
            <Container>
                <Row>
                    <Col sm={3}>
                        <div className="mt-5">
                        <h3>Data loading</h3>
                        <p>Upload a CSV file with your time series.</p>
                        <input type="file" id="csvFileInput" onChange={this.handleFile} accept=".csv" /><br />
                        <ColumnSelect columns={this.state.columnNames} handleChange={this.handleChange} /><br />
                        <button onClick={this.handleClick}>Update plot</button>
                        </div>
                    </Col>
                    <Col><TimeseriesPlot tsdata={tsdata} /></Col>
                </Row>
                <Row>
                    <Col sm={3}><RQAStats rpdata={rpdata} /></Col>
                    <Col><RPlot rpdata={rpdata} /></Col>
                </Row>
            </Container>
        );
    }
}

export default RQAContext;
