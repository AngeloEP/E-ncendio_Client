import React, {Fragment} from 'react';
import Table from 'react-bootstrap/Table'

const Datatable = ({ data, user_id }) => {

    const columns = data[0] && Object.keys(data[0])
    return (
        // <table cellPadding={0} cellSpacing={0} >
        <Table responsive striped bordered hover  >
            <thead>
                <tr>
                    
                    { data[0] && columns.map((heading, headIndex) => 
                        <Fragment key={headIndex} >
                        {heading === "user_id"
                        ?
                            <th> # </th> 
                        :
                            <th> {heading} </th> 
                            }
                        </Fragment>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    data.map((row, index) =>
                        <tr id={row["user_id"] === user_id ? "td-user" : null} key={index} >
                            {
                                columns.map((column, colIndex) =>  
                                    <Fragment key={colIndex} >

                                        { column === "user_id"
                                            ?
                                                row[column] === user_id
                                                ?
                                                    <td> {index+1}  </td>
                                                :
                                                    <td> {index+1} </td> 
                                            :
                                            <td > {row[column]} </td> 
                                        }
                                    </Fragment>
                                )
                            }
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
 
export default Datatable;