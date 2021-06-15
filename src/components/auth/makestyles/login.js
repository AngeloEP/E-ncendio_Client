import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    avatar: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      [theme.breakpoints.up('lg')]: {
        display: "inline-flex"
      },
    },

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