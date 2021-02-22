import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useStyles} from './footerStyles';

const FooterPage = ({ location }) => {
    const classes = useStyles();
    return (
        <Fragment>
            { location.pathname !== "/login" && location.pathname !== "/register"  ? 
                <div className={classes.root}>
                    <CssBaseline />
                    
                        <footer className={classes.footer}>
                            <Container maxWidth="xs">
                            <Typography variant="body1">My sticky footer can be found here.</Typography>
                            
                            <Typography variant="body2" color="textSecondary">
                            {'Copyright © '}
                            <Link color="inherit" to="#">
                                E-ncendio
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                            </Typography>

                            </Container>
                        </footer>
                </div>
            : null }
        </Fragment>
    )
}
 
export default withRouter(FooterPage);