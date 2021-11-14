import React, { Fragment, useState } from 'react';
import UserForm from './userForm/UserForm';

import Button from '@material-ui/core/Button';

import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import SettingsIcon from '@material-ui/icons/Settings';

import Grid from '@material-ui/core/Grid';

import ClipLoader from "react-spinners/ClipLoader";

import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import ButtonBootstrap from 'react-bootstrap/Button';

import './datatableUsers.css';

const DatatableUsers = ({ users }) => {
    const columns = users[0] && Object.keys(users[0])

    const [user, setUser] = useState({});
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    };
    
    const handleShow = (user_id) => {
        const userSelected = users.find(user => user._id === user_id);
        setUser(userSelected)
        // setFieldsWordUpdate({
        //     id_word_selected: user_id,
        //     nameUpdate: wordSelected.Palabra,
        //     difficultyUpdate: wordSelected.Dificultad,
        //     pointsUpdate: wordSelected.Puntos,
        // })
        setShow(true)
    };


    return (
        <Fragment>
            <Table responsive striped bordered hover  >
            {
                users.length !== 0
                ?
                    <Fragment>
                        <thead>
                            <tr>
                                <Fragment>
                                    { users[0] && columns.map((heading, headingIndex) =>
                                        <Fragment key={headingIndex} >
                                            { heading === "_id"
                                                ?
                                                    <th key={headingIndex+1} > # </th> 
                                                :
                                                    <th key={headingIndex+1} > {heading} </th> 
                                            }
                                        </Fragment>

                                    )}
                                    <th key="actions" > Acciones </th>
                                </Fragment>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((row, index) =>
                                    <tr key={index+1} >
                                        {
                                            columns.map((column, colIndex) =>
                                                
                                                <Fragment key={colIndex+1} >

                                                    { column === "Admin"
                                                        ?
                                                            row[column]
                                                            ?
                                                                <td key={colIndex+1} style={{ width: "2%" }} >
                                                                    <CheckIcon />
                                                                </td>
                                                            :
                                                                <td key={colIndex+1} style={{ width: "2%" }} >
                                                                    <CloseIcon />
                                                                </td>
                                                        :
                                                            column === "Bloqueado"
                                                            ?
                                                                row[column]
                                                                ?
                                                                    <td key={colIndex+1} style={{ width: "1%" }} > <LockIcon /> </td> 
                                                                :
                                                                    <td key={colIndex+1} style={{ width: "1%" }} > <LockOpenIcon /> </td> 
                                                            :
                                                                column === "_id"
                                                                ?
                                                                    <td key={colIndex+1} style={{ width: "5%" }} > {index + 1} </td> 
                                                                :
                                                                    <td key={colIndex+1} style={{ width: "5%" }} > {row[column]} </td> 
                                                    }
                                                </Fragment>
                                            )
                                        }
                                        <td key="buttonDelete" style={{ width: "1%" }} >
                                            <Button
                                                key={index+1}
                                                variant="contained"
                                                color="secondary"
                                                startIcon={<SettingsIcon />}
                                                style={{ backgroundColor: "#779AD1", marginTop: "5%", height: "10%", width: "90%" }}
                                                onClick={() => handleShow(row["_id"])}
                                                // disabled={loadingDelete}
                                            >
                                                {
                                                    false
                                                    ?
                                                    <Grid container
                                                        direction="row"
                                                        justify="center"
                                                        alignItems="center"
                                                    >
                                                        <Grid item xs={11} style={{color:"#000"}} >
                                                            Cargando...
                                                        </Grid>
                                                        <Grid item xs={1} >
                                                        <ClipLoader
                                                            color={"#000"}
                                                            loading={true}
                                                            size={20}
                                                        />
                                                        </Grid>
                                                    </Grid>
                                                        
                                                    :
                                                    "Editar"
                                                }
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Fragment>
                :
                    <Fragment>
                        <thead>
                            <tr>
                                <th> Sin datos </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> Aún no existen usuarios registrados </td>
                            </tr>
                        </tbody>
                    </Fragment>
            }
            </Table>
            <>        
                <Modal
                    show={show}
                    size="xl"
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    aria-labelledby="contained-modal-title-vcenter"
                    className="modal-user"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                            <div className="email-user" >
                                {user.Correo}
                            </div>
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <UserForm usuario={user} handleClose={handleClose} />
                    </Modal.Body>

                    <Modal.Footer>
                        <ButtonBootstrap className="closeButtonModal-datatableUsers" variant="secondary" onClick={handleClose}>
                            Cerrar
                        </ButtonBootstrap>
                    </Modal.Footer>
                </Modal>
            </>
        </Fragment>
    );
}
 
export default DatatableUsers;