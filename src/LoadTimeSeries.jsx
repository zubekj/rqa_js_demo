import React from 'react';
import TimeseriesPlot from './TimeseriesPlot.jsx';
import ColumnSelect from './ColumnSelect.jsx';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class LoadTimeSeries extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {columnNames: [], columns: [], selectedColumn: -1, selectedColumn2: -1};

        // This binding is necessary to make `this` work in the callback
        this.handleFile = this.handleFile.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    }

    handleChange(event) {
        const val = Number(event.target.value);
        this.setState({selectedColumn: val});
        if(val > -1 && val < this.state.columns.length) {
            this.props.updateTSData(this.state.columns[val]);
        } else {
            this.props.updateTSData([]);
        }
    }

    handleChange2(event) {
        const val = Number(event.target.value);
        this.setState({selectedColumn2: val});
        if(val > -1 && val < this.state.columns.length) {
            this.props.updateTSData2(this.state.columns[val]);
        } else {
            this.props.updateTSData2([]);
        }
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
            if(allTextLines[i] === "") continue; // Ignore empty lines
            allTextLines[i].split(",").forEach((x, j) => columns[j].push(x));
        }
        this.setState({columnNames: colNames});
        this.setState({columns: columns});
        
        this.setState({selectedColumn: -1});
        this.setState({selectedColumn2: -1});

        this.props.updateTSData([]);
        this.props.updateTSData2([]);
    }

    errorHandler(evt) {
	    if(evt.target.error.name === "NotReadableError") {
		    alert("Cannot read file!");
	    }
    }

    render() {
        const tsplot = <TimeseriesPlot tsdata={this.props.tsdata} dimension={this.props.dimension} delay={this.props.delay} />;
        const tsplot2 = this.props.tsdata2.length > 0 ? <TimeseriesPlot tsdata={this.props.tsdata2} dimension={this.props.dimension} delay={this.props.delay} /> : null;
       
        return (
            <div>
            <Row>
                <Col sm={3}>
                    <div className="mt-5">
                    <h3>Data loading</h3>
                    <p>Upload a CSV file with your time series.</p>
                    <input type="file" id="csvFileInput" onChange={this.handleFile} /><br />
                    <ColumnSelect label="Select column:" columns={this.state.columnNames} selected={this.state.selectedColumn} handleChange={this.handleChange} /><br />
                    <ColumnSelect label="Select second column (for cRQA only):" columns={this.state.columnNames} selected={this.state.selectedColumn2} handleChange={this.handleChange2} /><br />
                    </div>
                </Col>
                <Col><div className="mt-5">{tsplot}</div></Col>
            </Row>
            <Row>
                <Col sm={3}></Col>
                <Col><div className="mb-5">{tsplot2}</div></Col>
            </Row>
            </div>
        );
    }

}

export default LoadTimeSeries;
