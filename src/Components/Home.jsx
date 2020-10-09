import React from 'react'

import Container from '@material-ui/core/Container'

import ReactDataSheetExample from './ReactDataSheetExample';
// import ReactDataGridExample from './ReactDataGridExample';
// import JexcelExample from './JexcelExample';


const Home = () => {

    //https://github.com/nadbm/react-datasheet/tree/ead39d8fc96058dd61410e92cd37c73536b75ac1/docs/src/examples
    return(
        <Container maxWidth="sm">
            <ReactDataSheetExample/>
            {/* <ReactDataGridExample/> */}
            {/* <JexcelExample/> */}
        </Container>
    )
}

export default Home;