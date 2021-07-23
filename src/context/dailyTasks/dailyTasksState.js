import React, { useReducer } from 'react';
import DailyTasksContext from './dailyTasksContext';
import DailyTasksReducer from './dailyTasksReducer';
import clienteAxios from '../../config/axios';

import {
    OBTENER_TAREAS_DIARIAS_CARGANDO,
    OBTENER_TAREAS_DIARIAS_ERROR,
    OBTENER_TAREAS_DIARIAS,
} from '../../types/';

const DailyTasksState = props => {

    const initialState = {
        tareasDiarias: [],
        cargandoTraerTareasDiarias: false,
    }

    const [ state, dispatch ] = useReducer(DailyTasksReducer, initialState)

    const delay = (ms) =>
        new Promise((res) => {
            setTimeout(() => {
            res()
            }, ms)
        })

    // Traer las tareas del usuario
    const obtenerTareasDiarias = async () => {
            while(true) {
            try {
                dispatch({
                    type: OBTENER_TAREAS_DIARIAS_CARGANDO
                })
                const respuesta = await clienteAxios.get('/api/dailyTasks')
                dispatch({
                    type: OBTENER_TAREAS_DIARIAS,
                    payload: respuesta.data
                })
            } catch (error) {
                // console.log(error)
                dispatch({
                    type: OBTENER_TAREAS_DIARIAS_ERROR,
                    payload: error
                })
            }
            await delay(3000)
        }
    }

    return (
        <DailyTasksContext.Provider
            value={{
                tareasDiarias: state.tareasDiarias,
                cargandoTraerTareasDiarias: state.cargandoTraerTareasDiarias,
                obtenerTareasDiarias,
            }}
        >
            {props.children}
        </DailyTasksContext.Provider>
    )
}

export default DailyTasksState;