import { Button, CardActions, TextareaAutosize, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import Box from '@material-ui/core/Box';

const styles = {
    
    root: {
        justifyContent: 'center'
    }
};

const FormContact = () => {

    const [ usuario, guardarUsuario ] = useState({
        username: '',
        email: '',
        mensaje: ''
    })

    const { username, email, mensaje } = usuario

    const onChange = e => {
        console.log(e.target)
        guardarUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = () => {

    }
    

    return (
        <form id="contact-form" onSubmit={() => handleSubmit()}>
            <div class="col-lg-10">
                <div className="form-group">
                    <TextField
                        id="username"
                        name="username"
                        type="text"
                        label="Nombre"
                        value={username}
                        variant="outlined"
                        fullWidth
                        required
                        onChange={onChange}
                    />
                </div>
            </div>

            <div class="col-lg-10">
                <div className="form-group">
                    <TextField
                        id="email"
                        name='email'
                        type="email"
                        label="Email"
                        value={email}
                        variant="outlined"
                        fullWidth
                        required
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="col-lg-10" >
                <div className="form-group">
                    <TextareaAutosize 
                        id="mensaje"
                        name="mensaje"
                        placeholder="Mensaje*"
                        value={mensaje}
                        variant="outlined"
                        className="form-control" 
                        required
                        onChange={onChange}
                    />
                </div>
            </div>
            
            <div className="col-lg-10" >

                <div className="container" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"center",
                }} >
                    <Button  variant="contained" type="submit" color="primary"> Enviar Mensaje </Button>

                </div>
            </div>
        </form>
    );
}
 
export default FormContact;