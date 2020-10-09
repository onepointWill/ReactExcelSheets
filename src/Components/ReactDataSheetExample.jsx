import React from 'react'
import Datasheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css';
import SheetClip from 'sheetclip'
import Button from '@material-ui/core/Button'

let lastScrollY = 0;
let ticking = false;

export default class ReactDataSheetExample extends React.Component {
    constructor(props) {
      super(props);

      //https://gist.github.com/koistya/934a4e452b61017ad611
      //https://docs.github.com/en/free-pro-team@latest/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line

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
        const start = this.state.selected.start;
        const end = this.state.selected.end;
        
        const iEnumerations = (end.i - start.i) / rows.length
        const jEnumerations = (end.j - start.j) / rows.length

        rows.flatMap((row, row_idx) => {
          return row.map((val, col_idx) => ({col: col_idx + start.j, row: row_idx + start.i, value: val}))
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
      let tmpSelected = {...selected}
      tmpSelected.start.i += this.state.index
      tmpSelected.start.j -= 1
      tmpSelected.end.i += this.state.index
      tmpSelected.end.j -= 1
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