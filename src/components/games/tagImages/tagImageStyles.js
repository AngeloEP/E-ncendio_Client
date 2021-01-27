import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    topCenter: {
        margin: 0,
        position: 'absolute',
        top: '10%',
        left: '45%',
    },
    center: {
        margin: 0,
        position: 'absolute',
        top: '45%',
        left: '20%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
    },
    bottomCenter: {
        margin: 0,
        position: 'absolute',
        bottom: '15%',
        left: '41%',
        marginBottom: '80px'
    },

    imagen: {
        
        left: '50%'
    },

    categorias: {
        left: '100%'
    }

}))