import React from 'react';
import TimeseriesPlot from './TimeseriesPlot.jsx';
import ColumnSelect from './ColumnSelect.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class LoadTimeSeries extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {columnNames: [], columns: [], selectedColumn: 0};

        // This binding is necessary to make `this` work in the callback
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    }

    handleChange(event) {
        this.setState({selectedColumn: event.target.value});
        this.props.updateTSData(this.state.columns[event.target.value]);
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
        
        this.props.updateTSData(columns[0]);
    }

    errorHandler(evt) {
	    if(evt.target.error.name === "NotReadableError") {
		    alert("Cannot read file!");
	    }
    }

    render() {
        const tsdata = this.props.tsdata;
       
        return (
            <Row>
                <Col sm={3}>
                    <div className="mt-5">
                    <h3>Data loading</h3>
                    <p>Upload a CSV file with your time series.</p>
                    <input type="file" id="csvFileInput" onChange={this.handleFile} accept=".csv" /><br />
                    <ColumnSelect columns={this.state.columnNames} handleChange={this.handleChange} /><br />
                    </div>
                </Col>
                <Col><TimeseriesPlot tsdata={tsdata} /></Col>
            </Row>
        );
    }

}

export default LoadTimeSeries;
