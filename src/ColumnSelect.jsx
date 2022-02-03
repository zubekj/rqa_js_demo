import React from 'react';

class ColumnSelect extends React.Component {

    render() {
        const columns = this.props.columns;
        
        if(columns.length == 0) {
            return null;
        }

        const items = columns.map((c, index) =>
            <option value={index} key={index}>{c}</option>
        );

        return (
            <select name="colSelect" id="colSelect" onChange={this.props.handleChange}>
                {items}
            </select>
        );
    }
}

export default ColumnSelect;
