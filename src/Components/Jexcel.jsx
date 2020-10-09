import React from "react"
import 'react-datasheet/lib/react-datasheet.css';
// import "jexcel/dist/jexcel.css";
import jexcel from "jexcel";

export default class Jexcel extends React.Component {
    constructor(props) {
      super(props);
      this.options = props.options;
      this.wrapper = React.createRef();
    }
  
    componentDidMount = function() {
      this.el = jexcel(this.wrapper.current, this.options);
    };
  
    addRow = function() {
      this.el.insertRow();
    };
  
    render() {
      return (
        <div>
          <div ref={this.wrapper} />
          <br />
          <input
            type="button"
            value="Add new row"
            onClick={() => this.addRow()}
          />
        </div>
      );
    }
  }