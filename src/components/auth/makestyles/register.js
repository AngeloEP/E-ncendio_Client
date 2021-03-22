import { makeStyles } from '@material-ui/core/styles';
import background from '../../../assets/img/register-background.jpg';

export const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(0),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(2),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '70%', // Fix IE 11 issue.
      marginTop: theme.spacing(6),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    divlogin: {
      height : '100vh' ,
    },
    formControl: {
      minWidth: '100%',
    },
    image: {
      backgroundImage: `url(${background})` ,
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    
  }));