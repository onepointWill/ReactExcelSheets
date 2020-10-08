import React from 'react';
import ReactDataGrid from 'react-data-grid';

export default class ReactDataGridExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        grid: [
          [
            { readOnly: true, value: '' },
            { value: 'A', readOnly: true },
            { value: 'B', readOnly: true },
            { value: 'C', readOnly: true },
            { value: 'D', readOnly: true },
          ],
          [
            { readOnly: true, value: 1 },
            { value: 1 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
          ],
          [
            { readOnly: true, value: 2 },
            { value: 2 },
            { value: 4 },
            { value: 4 },
            { value: 4 },
          ],
          [
            { readOnly: true, value: 3 },
            { value: 1 },
            { value: 3 },
            { value: 3 },
            { value: 3 },
          ],
          [
            { readOnly: true, value: 4 },
            { value: 2 },
            { value: 4 },
            { value: 4 },
            { value: 4 },
          ],
        ],
      };
    }
  
    render() {
        const columns = [
            { key: 'id', name: 'ID' },
            { key: 'title', name: 'Title' },
            { key: 'count', name: 'Count' } ];
          
          const rows = [{id: 0, title: 'row1', count: 20}, {id: 1, title: 'row1', count: 40}, {id: 2, title: 'row1', count: 60}];

      return (
        <ReactDataGrid
            columns={columns}
            rowGetter={i => rows[i]}
            rowsCount={3}
            minHeight={150} 
        />
      );
    }
  }