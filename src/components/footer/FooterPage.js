import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useStyles} from './footerStyles';
import './footer.css';

import {
    FaFacebook,
    FaTwitter,
    FaSnapchat,
    FaInstagram,
} from 'react-icons/fa';

const FooterPage = ({ location }) => {
    const classes = useStyles();
    return (
        <Fragment>
            {
                location.pathname !== "/login" &&
                location.pathname !== "/register" &&
                location.pathname !== "/games/images" &&
                location.pathname !== "/games/words" &&
                location.pathname !== "/games/four-images-one-word"
            ? 
                <div class="footer-clean">
                    <footer>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-sm-4 col-md-3 item">
                                    <h3> FireSES </h3>
                                    <ul>
                                        <li><a href="#">Web design</a></li>
                                        <li><a href="#">Development</a></li>
                                        <li><a href="#">Hosting</a></li>
                                    </ul>
                                </div>
                                <div class="col-sm-4 col-md-3 item">
                                    <h3> About </h3>
                                    <ul>
                                        <li><a href="#">Company</a></li>
                                        <li><a href="#">Team</a></li>
                                        <li><a href="#">Legacy</a></li>
                                    </ul>
                                </div>
                                <div class="col-sm-4 col-md-3 item">
                                    <h3>Careers</h3>
                                    <ul>
                                        <li><a href="#">Job openings</a></li>
                                        <li><a href="#">Employee success</a></li>
                                        <li><a href="#">Benefits</a></li>
                                    </ul>
                                </div>
                                <div class="col-lg-3 item social">
                                    <a href="#"> <FaFacebook/> </a>
                                    <a href="#"> <FaTwitter/> </a>
                                    <a href="#"> <FaSnapchat/> </a>
                                    <a href="#"> <FaInstagram/> </a>
                                    <p class="copyright">E-ncendio © {new Date().getFullYear()} | Todos los derechos reservados </p>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            : null }
        </Fragment>
    )
}
 
export default withRouter(FooterPage);