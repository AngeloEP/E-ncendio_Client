import React, { useState, useContext, useEffect } from 'react';
import './formContact.css';

import AlertaContext from '../../../context/alertas/alertaContext';
import ContactFormContext from '../../../context/contactForm/contactFormContext';

import { Button, TextareaAutosize, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import ClipLoader from "react-spinners/ClipLoader";

const FormContact = () => {

    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { alerta, mostrarAlerta } = alertaContext

    // Extraer los valores del context del formulario de contacto
    const contactFormContext = useContext(ContactFormContext)
    const { mensaje, cargandoEnvioCorreo, enviarFormularioDeContacto } = contactFormContext

    const [ formulario, guardarFormulario ] = useState({
        email: '',
        subject: '',
        message: ''
    })

    const { subject, email, message } = formulario
    const [  , setLoadingContact] = useState(false)

    useEffect(() => {
        
        // Mensaje de error desde el servidor
        if( mensaje ) {
            setLoadingContact(false)
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoEnvioCorreo ] )

    const onChange = e => {
        guardarFormulario({
            ...formulario,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
      
        setLoadingContact(true);
        if ( email.trim() === '' | subject.trim() === '' | message.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            setTimeout(() => {
                setLoadingContact(false);
            }, 250);
            return
        }

        enviarFormularioDeContacto({ email, subject, message  })

        // Reiniciar formulario
        guardarFormulario({
            email: '',
            subject: '',
            message: ''
        });
    }
    
    return (
        <form id="contact-form" onSubmit={handleSubmit} className="formularioContacto" >
            { alerta ? ( <div className={`alerta ${alerta.categoria}`}> {alerta.msg} </div> ) : null }
            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                <div className="form-group text-center">
                    <TextField
                        className="emailContact"
                        id="email"
                        name='email'
                        type="email"
                        label="Ingresa tu Email*"
                        value={email}
                        variant="outlined"
                        fullWidth
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="col-12 col-md-12 col-lg-12 col-xl-12">
                <div className="form-group text-center">
                    <TextField
                        className="subjectContact"
                        id="subject"
                        name="subject"
                        type="text"
                        label="Ingresa el Asunto*"
                        value={subject}
                        variant="outlined"
                        fullWidth
                        onChange={onChange}
                    />
                </div>
            </div>

            <div className="col-12 col-md-12 col-lg-12 col-xl-12 divGeneralMessageContact" >
                <div className="form-group text-center messageContact">
                    <TextareaAutosize 
                        id="message"
                        name="message"
                        placeholder="Ingresa tu Mensaje*"
                        value={message}
                        variant="outlined"
                        className="form-control " 
                        onChange={onChange}
                    />
                </div>
            </div>
            
            <div className="col-md-12 col-lg-12 col-xl-12 divGeneralButtonContact" >

                <div className="container buttonContact" style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent:"center",
                }} >
                    <Button  variant="contained" type="submit" color="primary" 
                        style={{ 
                            width: "fit-content",
                            height: "40px",
                        }}
                    >
                        {
                            cargandoEnvioCorreo
                            ?
                            <Grid container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Grid item xs={10}  >
                                    Cargando...
                                </Grid>
                                <Grid item xs={2} >
                                <ClipLoader
                                    color={"#fff"}
                                    loading={true}
                                    size={20}
                                />
                                </Grid>
                            </Grid>
                                
                            :
                            "Enviar Mensaje"
                        }
                    </Button>

                </div>
            </div>
        </form>
    );
}
 
export default FormContact;