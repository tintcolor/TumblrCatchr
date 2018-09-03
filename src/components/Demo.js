/* eslint no-console:0 */
/* eslint no-alert:0 */
import React from 'react';
// import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';


class Demo extends React.Component {
    // static propTypes = {
    //     keys: PropTypes.array,
    // };
    // static defaultProps = {
    //     keys: ['0-0-0-0'],
    // };
    constructor(props) {
        super(props);
        const keys = props.keys;
        this.state = {
            defaultExpandedKeys: keys,
            defaultSelectedKeys: keys,
            defaultCheckedKeys: keys,
            switchIt: true,
        };
    }


    onCheck (checkedKeys, info)  {
        console.log('onCheck', checkedKeys, info);
    };


    render() {
        const customLabel = (<span className="cus-label">
            <span>operations: </span>
            <span style={{ color: 'blue' }} onClick={this.onEdit}>Edit</span>&nbsp;
      <label onClick={(e) => e.stopPropagation()}><input type="checkbox" /> checked</label> &nbsp;
      <span style={{ color: 'red' }} onClick={this.onDel}>Delete</span>
        </span>);
        return (<div style={{ margin: '0 20px' }}>
            <h2>simple</h2>


           
        </div>);
    }
}

export default Demo
