import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useStyles} from './footerStyles';

const FooterPage = ({  }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            
                <footer className={classes.footer}>
                    <Container maxWidth="xs">
                    <Typography variant="body1">My sticky footer can be found here.</Typography>
                    
                    <Typography variant="body2" color="textSecondary">
                    {'Copyright © '}
                    <Link color="inherit" href="https://material-ui.com/">
                        E-ncendio
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                    </Typography>

                    </Container>
                </footer>
        </div>
    )
}
 
export default FooterPage;