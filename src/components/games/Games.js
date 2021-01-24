import React from 'react';
import Grid  from '@material-ui/core/Grid';
import {useStyles} from './gamesStyles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import minions from '../../assets/img/minions.jpg';
import encendio from '../../assets/img/incendio.png';
import incendios from '../../assets/img/incendios.jpg';


const images = [
    {
      url: minions,
      title: 'Etiquetar Imágenes',
      width: '40%',
      page: '/games/images'
    },
    {
      url: encendio,
      title: 'Asociar Palabras',
      width: '30%',
      page: '/games/words'
    },
    {
      url: incendios,
      title: '4 Imágenes y 1 Palabra',
      width: '30%',
      page: '/games/four-images-one-word'
    },
  ];

const Games = ({ history }) => {
    const classes = useStyles()

    const OnClick = (route) => {

        history.push(route)
    }

    return (  
        <Grid container direction='row' alignItems='center' justify="center" className={classes.root} >
            {images.map((image) => (
                <ButtonBase
                    focusRipple
                    key={image.title}
                    className={classes.image}
                    focusVisibleClassName={classes.focusVisible}
                    style={{
                        width: image.width,
                    }}
                    onClick={() => OnClick(image.page)}
                >
                <span
                    className={classes.imageSrc}
                    style={{
                    backgroundImage: `url(${image.url})`,
                    }}
                />
                <span className={classes.imageBackdrop} />
                <span className={classes.imageButton}>
                    <Typography
                        component="span"
                        variant="subtitle1"
                        color="inherit"
                        className={classes.imageTitle}
                    >
                    {image.title}
                    <span className={classes.imageMarked} />
                    </Typography>
                </span>
                </ButtonBase>
            ))}
        </Grid>
    );
}
 
export default Games;