import React from 'react';

class ColumnSelect extends React.Component {

    render() {
        const columns = this.props.columns;
        
        if(columns.length === 0) {
            return null;
        }

        const items = columns.map((c, index) =>
            <option value={index} key={index}>{c}</option>
        );

        return (
            <div>
            <label htmlFor="colSelect">{this.props.label}</label><br />
            <select name="colSelect" id="colSelect" onChange={this.props.handleChange} value={this.props.selected}>
                <option value="-1" key="-1">*None*</option>
                {items}
            </select>
            </div>
        );
    }
}

export default ColumnSelect;
