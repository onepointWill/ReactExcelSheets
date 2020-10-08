import React from 'react'
import Datasheet from 'react-datasheet'
import SheetClip from 'sheetclip'
import Button from '@material-ui/core/Button'

export default class ReactDataSheetExample extends React.Component {
    constructor(props) {
      super(props);

      const greedyData = [
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()],
        [...Array(20).keys()].map(i => "bob"),
        [...Array(20).keys()]
      ]

      const rowsToGet = 14
      const startIndex = 0

      this.state = {
        selected: null,
        index: startIndex,
        greedyData: greedyData,
        rowToGet: rowsToGet,
        grid: this.generateGrid(greedyData, startIndex, rowsToGet),
      };
    }

    generateGrid = (data, index, rowsToGet) => {
      return data
        .slice(index, index + rowsToGet)
        .map((row, idx) => [{ readOnly: true, value: idx + index }].concat(row.map(data => ({value: data}))))
    }

    changeIndex = index => {
      if (index >= 0) {
        this.setState({
          index: index,
          grid: this.generateGrid(this.state.greedyData, index, this.state.rowToGet)
        })
      }
    }

    valueRenderer = cell => cell.value;
    
    onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;

    parsePaste = (input) => {
      const rows = new SheetClip.prototype.parse(input)

      if (rows.length > 0) {
        const greedyData = this.state.greedyData;
        const selected = this.state.selected;

        rows.flatMap((row, row_idx) => {
          return row.map((val, col_idx) => ({col: col_idx + selected.j, row: row_idx + selected.i, value: val}))
        }).map(({col, row, value}) => {
          if (greedyData.length > row && greedyData[row].length > col) {
            greedyData[row][col] = value
          }
        })

        this.setState({
          grid: this.generateGrid(this.state.greedyData, this.state.index, this.state.rowToGet)
        });
      }
    }

    onSelect = selected => {
      let tmpSelected = {...selected.start}
      tmpSelected.i += this.state.index
      tmpSelected.j -= 1
      this.state.selected = tmpSelected
    }
  
    render() {
      return (
        <>
          <Button onClick={() => this.changeIndex(this.state.index + 1)}>Down</Button>
          <Button onClick={() => this.changeIndex(this.state.index - 1)}>Up</Button>
          <Datasheet
            data={this.state.grid}
            valueRenderer={this.valueRenderer}
            onContextMenu={this.onContextMenu}
            // onCellsChanged={this.onCellsChanged}
            parsePaste={this.parsePaste}
            onSelect={this.onSelect}
          />
        </>
      );
    }
  }