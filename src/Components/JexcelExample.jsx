import React from "react";
import Jexcel from './Jexcel'

export default class JexcelExample extends React.Component {
    constructor(props) {
        super(props);
        this.options = props.options;
        this.wrapper = React.createRef();
    }

    options = {
      data: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      minDimensions: [10, 10],
      lazyLoading: true,
      tableOverflow: true
    };

    render() {
      return (
        <Jexcel options={this.options} />
      );
    }
  }