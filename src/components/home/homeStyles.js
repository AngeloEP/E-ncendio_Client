import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    
    divContent: {
        margin: 0,
        marginBottom: '100px'
    },

    loading: {
        display: "flex",
        textAlign: "center",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "80vh",
        marginBottom: '100px'
    },

    formContact: {
        marginTop: theme.spacing(10),
    },

    

  }));