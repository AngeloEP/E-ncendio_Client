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
      background: 'rgba(234, 238, 234, 0.95)',
      boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      padding: '40px 55px 45px 55px',
      borderRadius: '15px',
      transition: 'all .3s',
    },
    avatar: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.up('lg')]: {
        display: "inline-flex"
      },
    },
    form: {
      marginTop: theme.spacing(5),
      [theme.breakpoints.up('lg')]: {
        width: "100%",
      },
      [theme.breakpoints.up('md')]: {
        width: "40",
      },
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },

    // loadingLogin: {
    //   width: "5px",
    //   height: "5px",
    // },

    loadingPage: {
      display: "flex",
      textAlign: "center",
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100vh",
      marginBottom: '100px'
  },

    // divlogin: {
    //   backgroundImage: `url(${background})` ,
    //   backgroundRepeat: 'no-repeat',
    //   backgroundColor:
    //     theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center',
    //   display: 'flex',
    //   justifyContent: 'flex-start',
    //   flexDirection: 'column',
    //   textAlign: 'right',
    //   [theme.breakpoints.up('lg')]: {
    //     height: "100vh",
    //   },
    //   [theme.breakpoints.up('xs')]: {
    //     height: "100vh",
    //   },
    // },
    errorMessage: {
      maxWidth: '600px',
      marginTop: theme.spacing(0),
      marginBottom: theme.spacing(2),
      backgroundColor: 'rgb(170, 0, 0)',
      color: 'white',
    },

    inputs: {
      backgroundColor: "#fff",
      alignItems: "center"
    },
   
  }));

//   @media(max-width: @screen-xs-max){}
// @media(min-width: @screen-sm-min){}  /* deprecated: @screen-tablet, or @screen-sm */
// @media(min-width: @screen-md-min){}  /* deprecated: @screen-desktop, or @screen-md */
// @media(min-width: @screen-lg-min){}