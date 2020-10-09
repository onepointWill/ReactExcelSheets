import React from 'react'
import Datasheet from 'react-datasheet'
import 'react-datasheet/lib/react-datasheet.css';
import SheetClip from 'sheetclip'
import Button from '@material-ui/core/Button'

export default class ReactDataSheetExample extends React.Component {
    constructor(props) {
      super(props);

      //https://gist.github.com/koistya/934a4e452b61017ad611

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
        const start = this.state.selected.start; //Need to work out which position is larger. Currenty only works for start being smallest
        const end = this.state.selected.end;

        const iInput = rows.length
        const jInput = rows[0].length //Assume first row matches all rows

        const iDiff = end.i - start.i;
        const jDiff = end.j - start.j;

        const iEnumerations = Math.floor((iDiff) / iInput) + 1
        const jEnumerations = Math.floor((jDiff) / jInput) + 1 

        const copyMatrix = [...Array(iEnumerations)].map(i => [...Array(jEnumerations).keys()])

        rows.flatMap((row, row_idx) => {
          return row.flatMap((val, col_idx) => {
            const j = col_idx + start.j 
            const i = row_idx + start.i
            return copyMatrix.flatMap((row_paste, row_paste_idx) => {
              return row_paste.map((ignore, col_paste_idx) => {
                return ({col: j + (col_paste_idx * jInput), row: i + (row_paste_idx * iInput), value: val})
              })
            })
          })
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
      let tmpSelected = {start: {...selected.start}, end: {...selected.end}}
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