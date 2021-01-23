import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      
      //background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    },
    avatar: {
      marginTop: theme.spacing(10),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '50%', // Fix IE 11 issue.
      marginTop: theme.spacing(8),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    divlogin: {
      height : '100vh' ,
    },
    errorMessage: {
      maxWidth: '600px',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      backgroundColor: 'rgb(170, 0, 0)',
      color: 'white',
    }
   
  }));