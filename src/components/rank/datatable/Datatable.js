import React, {Fragment} from 'react';
import Table from 'react-bootstrap/Table';
import ProfileDefault from '../../../assets/img/profile_default.png';

const Datatable = ({ data, user_id, filtrado }) => {
    data = data.sort((a, b) => parseFloat(b["Puntuación"]) - parseFloat(a["Puntuación"]));
    const columns = data[0] && Object.keys(data[0])
    return (
        // <table cellPadding={0} cellSpacing={0} >
        <Table responsive striped bordered hover className="text-center"  >
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
                                                // row[column] === user_id
                                                // ?
                                                //     <td> {index+1}  </td>
                                                // :
                                                index+1 === 1 && filtrado === 0
                                                ?
                                                    <td className="td-medal-rank" > 🏆 </td>
                                                :
                                                    index+1 === 2 && filtrado === 0
                                                    ?
                                                        <td className="td-medal-rank" > 🥈 </td>
                                                    :
                                                        index+1 === 3 && filtrado === 0
                                                        ?
                                                            <td className="td-medal-rank" > 🥉 </td>
                                                        :
                                                        <td> {index+1} </td>
                                            :
                                                column === "Apodo"
                                                ?
                                                    row[column] !== ""
                                                    ?
                                                        <td className="nickname-rank" > {row[column]} </td>
                                                    :   <td> No equipado </td>
                                                :
                                                    column === "Imagen"
                                                    ?
                                                        <td className="td-imageUserRank" >
                                                            <div className={`div-imageUser-rank ${row[column].frameUsedCss}`} >
                                                                <img src={ row[column].url ? row[column].url : ProfileDefault } alt=""/>
                                                            </div>
                                                        </td>
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