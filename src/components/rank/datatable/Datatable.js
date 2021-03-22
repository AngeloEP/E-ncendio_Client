import React from 'react';
import Table from 'react-bootstrap/Table'

const Datatable = ({ data }) => {
    const columns = data[0] && Object.keys(data[0])

    return (
        // <table cellPadding={0} cellSpacing={0} >
        <Table responsive striped bordered hover  >
            <thead>
                <tr>
                    { data[0] && columns.map((heading) => 
                        <th> {heading} </th>
                    )}
                </tr>
            </thead>
            <tbody>
                {
                    data.map(row =>
                        <tr>
                            {
                                columns.map(column => <td> {row[column]} </td>)
                            }
                        </tr>
                    )
                }
            </tbody>
        </Table>
    );
}
 
export default Datatable;