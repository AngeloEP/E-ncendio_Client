import React, { useState, useContext, useEffect } from 'react';
import { Col, Container, Image, Row, Button } from 'react-bootstrap';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './tagImageStyles';
import Checkbox from '@material-ui/core/Checkbox';
import incendios from '../../../assets/img/incendios.jpg';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import ImageContext from '../../../context/images/imageContext';


const TagImage = ({ history }) => {

    // Extraer la información de el context de imagenes
    const imageContext = useContext(ImageContext)
    const { imagenes, obtenerImagenes  } = imageContext

    useEffect(() => {
        obtenerImagenes()
    }, [])

    console.log("IMAGENES: ", imagenes)

    const classes = useStyles()
    const [ checked, setChecked ] = useState({
        prevencion: false,
        mitigacion: false,
        riesgo: false,
        combate: false,
        impacto: false,
        recuperacion: false,
        amenaza: false,

        selected: null
    })
    
    const onCheck = (name, val) => {
        const checkboxes = checked;
        console.log(checkboxes)
        for (let key in checkboxes) {
            checkboxes[key] = false;
        }
        checkboxes[name] = true;
        checkboxes.selected = val;
        setChecked({ ...checked, checkboxes });
        
    }

    const Checksito = ({ state, label, name, disable }) => {
        return (
        <FormControlLabel
            
            control={
              <Checkbox
                checked={state}
                value={name}
                onChange={(e) => onCheck(name, e.target.value)}
                color="secondary"
              />
            }
            label= {label}
          />
        )
    }
    
    const categories = [
        <Row  >
            <Col xs={6} > <Checksito state={checked.prevencion} label='Prevención' name='prevencion'  /> </Col> 
            <Col xs={6} > <Checksito state={checked.mitigacion} label='Mitigación' name='mitigacion'  /> </Col> 
        </Row>,
        <Row>
            <Col xs={6} > <Checksito state={checked.riesgo} label='Riesgo' name='riesgo' /> </Col> 
            <Col xs={6} > <Checksito state={checked.combate} label='Combate' name='combate' /> </Col>
        </Row>,
        <Row>
            <Col xs={6} > <Checksito state={checked.impacto} label='Impacto' name='impacto' /> </Col> 
            <Col xs={6} > <Checksito state={checked.recuperacion} label='Recuperación' name='recuperacion' /> </Col> 
        </Row>,
        <Row>
            <Col> <Checksito state={checked.amenaza} label='Amenaza' name='amenaza' /> </Col> 
        </Row>,
    ]


    return (
        <Container fluid >
            <div className={classes.topCenter} >
                <Row>
                    <Col>
                    <Typography variant="h4" >
                        Nivel 1
                    </Typography>
                    </Col>
                </Row>
            </div>

            <div className={classes.center} >
                <Row >
                    <Col className={classes.imagen} > 
                        <Image
                        style={{width:300,height:300}}
                        src={imagenes[2].imageUrl} rounded/>
                    </Col>
                    <Col  className={classes.categorias} >
                        <Typography variant="h6" className="mr-3" >
                            Seleccionar Categoría
                        </Typography>
                        <div className="container-xs" >
                            

                            {categories}
                            
                        </div>
                    </Col>

                </Row>
            </div  >

            <div className={classes.bottomCenter} >
                <Row>
                    <Col >
                        <Button variant="secondary"> Anterior </Button>{' '}
                    </Col>

                    <Col>
                        <Button variant="success"> Siguiente </Button>{' '}
                    </Col>
                </Row>
            </div>
        </Container>
    );
}
 
export default TagImage;