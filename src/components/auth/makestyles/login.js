import { makeStyles } from '@material-ui/core/styles';
import background from '../../../assets/img/login-background.jpg';

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      width: '70vh',
      margin: 'auto',
      background: 'rgb(234, 238, 234)',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      padding: '40px 55px 45px 55px',
      borderRadius: '15px',
      transition: 'all .3s',
      
      //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    avatar: {
      marginTop: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '40vh', // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    loadingLogin: {
      width: "5px",
      height: "5px",
    },

    loadingPage: {
      display: "flex",
      textAlign: "center",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "80vh",
      marginBottom: '100px'
  },

    divlogin: {
      backgroundImage: `url(${background})` ,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height : '100vh' ,
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'right',
    },
    errorMessage: {
      maxWidth: '600px',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      backgroundColor: 'rgb(170, 0, 0)',
      color: 'white',
    }
   
  }));