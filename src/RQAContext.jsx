import React from 'react';
import TimeseriesPlot from './TimeseriesPlot.jsx';
import RPlot from './RPlot.jsx';

class RQAContext extends React.Component {

    constructor(props) {
        super(props);
        this.state = {tsdata: [0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1]};

        // This binding is necessary to make `this` work in the callback
        this.handleClick = this.handleClick.bind(this);
        this.handleFile = this.handleFile.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    }

    handleClick() {
        // Check for the various File API support.
        if (window.FileReader) {
            // FileReader are supported.
            var reader = new FileReader();
          	reader.onload = this.loadHandler;
        	reader.onerror = this.errorHandler;
        	// Read file into memory as UTF-8      
        	reader.readAsText(this.state.selectedFile);
        } else {
            alert('FileReader are not supported in this browser.');
        }
    }

    loadHandler(event) {
	    var csv = event.target.result;
        var allTextLines = csv.split(/\r\n|\n/);
        var lines = allTextLines.map(Number);
        this.setState({tsdata: lines});
        console.log(lines);
    }

    errorHandler(evt) {
	    if(evt.target.error.name === "NotReadableError") {
		    alert("Cannot read file!");
	    }
    }

    handleFile(event) {
        this.setState({selectedFile: event.target.files[0]});
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
            <div>
            <input type="file" id="csvFileInput" onChange={this.handleFile} accept=".csv" />
            <button onClick={this.handleClick}>Update plot</button>
            <TimeseriesPlot tsdata={tsdata} />
            <RPlot rpdata={rpdata} />
            </div>
        );
    }
}

export default RQAContext;
