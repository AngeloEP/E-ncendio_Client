import React, { useReducer } from 'react';
import ContactFormContext from './contactFormContext';
import ContactFormReducer from './contactFormReducer';
import clienteAxios from '../../config/axios';

import Swal from 'sweetalert2';

import {
    ENVIAR_FORMULARIO_DE_CONTACTO,
    ENVIAR_FORMULARIO_DE_CONTACTO_CARGANDO,
    ENVIAR_FORMULARIO_DE_CONTACTO_ERROR
} from '../../types/';

const ContactFormState = props => {

    const initialState = {
        formulario: null,
        mensaje: null,
        cargandoEnvioCorreo: false,
    }

    const [ state, dispatch ] = useReducer(ContactFormReducer, initialState)

    // Cuando el usuario haga una observación en la sección de contáctanos
    const enviarFormularioDeContacto = async datos => {
        try {
            dispatch({
                type: ENVIAR_FORMULARIO_DE_CONTACTO_CARGANDO,
                payload: true
            })
            const respuesta = await clienteAxios.post('/api/contact-form/send-email', datos)
            setTimeout(() => {
                dispatch({
                    type: ENVIAR_FORMULARIO_DE_CONTACTO,
                    payload: respuesta.data
                })
                Swal.fire({
                    icon: 'success',
                    title: 'Envío exitoso',
                    text: 'Su observación se ha enviado al administrador del sitio!',
                })
            }, 1000);

        } catch (error) {
            console.log(error.response.data.msg)
            const alerta = {
                msg: error.response.data.msg,
                categoria: 'alerta-error'
            }
            dispatch({
                type: ENVIAR_FORMULARIO_DE_CONTACTO_ERROR,
                payload: alerta
            })
            Swal.fire({
                icon: 'error',
                title: 'Lo sentimos',
                text: 'Ocurrió un error en el servidor al tratar de enviar la información!',
            })
        }
    }

    return (
        <ContactFormContext.Provider
            value={{
                formulario: state.formulario,
                mensaje: state.mensaje,
                cargandoEnvioCorreo: state.cargandoEnvioCorreo,
                enviarFormularioDeContacto,
            }}
        >
            {props.children}
        </ContactFormContext.Provider>
    )
}

export default ContactFormState;
