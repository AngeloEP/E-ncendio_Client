import React, { useReducer } from 'react';
import rewardsContext from './rewardsContext';
import rewardsReducer from './rewardsReducer';

import {
} from '../../types';
import clienteAxios from '../../config/axios';

const RewardsState = props => {
    const initialState = {
        recompensas: [],
        erroresRewards: [],
        cargandoRecompensas: false
    }

    const [ state, dispatch ] = useReducer(rewardsReducer, initialState)

    return(
        <rewardsContext.Provider
            value={{
                recompensas: state.recompensas,
                erroresRewards: state.erroresRewards,
                cargandoRecompensas: state.cargandoRecompensas,
            }}
        >
            { props.children }
        </rewardsContext.Provider>
    )
}

export default RewardsState;