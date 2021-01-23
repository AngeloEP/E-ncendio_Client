import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    
    footer: {
        position: "fixed",
        padding: '15px 5px',
        bottom: 0,
        left: 0,
        width: '100%',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
    },
  }));