import {
    VALIDAR_EMAIL,
    VALIDAR_PASSWORD,
    EMAIL_SUCCESS,
    PASSWORD_SUCCESS
} from '../../types';

const loginReducer = (state, action) => {
    switch (action.type) {
        case VALIDAR_EMAIL:
            return {
                ...state,
                emailerror: true
            }

        case VALIDAR_PASSWORD:
            return {
                ...state,
                passworderror: true
            }

        case EMAIL_SUCCESS:
            return {
                ...state,
                emailerror: false
            }

        case PASSWORD_SUCCESS:
            return {
                ...state,
                passworderror: false
            }
    
        default:
            return state;
    }
}

export default loginReducer;