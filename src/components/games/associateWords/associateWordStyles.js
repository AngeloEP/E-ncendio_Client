import { makeStyles } from '@material-ui/core/styles';
import backgroundGif from '../../../assets/gif/hojasCayendo.gif';

export const useStyles = makeStyles((theme) => ({
    rowTitle: {
        position: "absolute",
        width: "100%",
    },

    topCenter: {
        position: "absolute",
        textAlign: "center",
        zIndex: "99999",
        right: "25%",
        width: "50%",
        height: "70px",
        backgroundColor: "#e6e8ed",
        borderRadius: "15px",
    },
    palabra: {
        marginLeft: "-10%",
    },

    paper: {
        padding: theme.spacing(7.5),
        textAlign: "center",
        margin: 'auto',
        width: "350px",
        height: "200px",
        border: "2px solid",
        borderRadius: 25,
        fontSize: "50px",
        fontFamily: "Times New Roman",
        borderColor: "red",
        color: theme.palette.text.secondary,
        '&:hover': {
            transition: "0.5s ",
            borderColor: "blue",
        }
    },

    center: {
        margin: 0,
        flexGrow: 1,
        position: 'absolute',
        top: '53%',
        left: '30%',
        msTransform: 'translateY(-50%)',
        transform: 'translateY(-50%)',
    },
    bottomCenter: {
        margin: 0,
        position: 'absolute',
        bottom: '12%',
        left: '47%',
    },

    backgroundGif: {
        // backgroundImage: `url(${backgroundGif})`,
        height: "85vh",
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        paddingLeft: "0px",
        paddingRight: "0px"
    },

    userProgress: {
        position: "absolute" ,
        marginLeft: "90px",
        backgroundColor: "#fff",
        borderRadius: "20px",
        height: "25px",
        width: "250px",
    },

    progressTitle: {
        marginBottom: "3px",
        textAlign: "center",
        fontSize: "20px",
        fontFamily: "Times New Roman",
        textDecoration: "capitalize",
        textTransform: "capitalize",
    },

    levelTitle: {
        marginTop: "0.7rem",
        fontFamily: "Times New Roman",
    },

    categorias: {
        left: "65%",
    },

    botonCategoría: { // es de WhatshotIcon
        color: 'blue',
        fontSize: 70,
    },

    titleFire:{
        position: "absolute",
        marginBottom: "-130px",
    },

    botonSiguiente: {
        display: "inline-block",
        padding: "15px 25px",
        cursor: "pointer",
        textAlign: "center",
        textDecoration: "none",
        outline: "none",
        border: "none",
        fontSize: "25px",
        borderRadius: "10px",
        fontFamily: "Times New Roman",
        boxShadow: "7px 6px 28px 2px rgba(0, 0, 0, 0.24)", 
        '&:active': {
            background:'black',
            transform: "scale(0.9)",
            boxShadow: "7px 6px 28px 1px rgba(0, 0, 0, 0.24)", 
            transform: "translateY(4px)", 
        },
        "&:hover": {
            transition: "0.4s ",
            backgroundColor: "#f7f7f7", /* Green */
            border: "3px solid #4CAF50",
            color: "#000",
        },
        
        
    },
    
    topRow: {
        marginBottom: "7%",
    },

}))