import React, { useState, useEffect, useContext } from 'react';
import Datatable from "./datatable/Datatable";
import AgeIcon from '../../assets/img/age-icon.svg';
import './rank.css';

import AuthContext from '../../context/autentificacion/authContext';
import ProfileContext from '../../context/profile/profileContext';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import AccountCircle from '@material-ui/icons/AccountCircle';
import StarsIcon from '@material-ui/icons/Stars';

const Rank = () => {
    // Extraer la información de autentificación
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado } = authContext

    // Extraer la información de los perfiles
    const profilecontext = useContext(ProfileContext)
    const { perfiles, obtenerTodosLosPerfiles } = profilecontext


    let [ datos,  ] = useState( [] )

    const [filterLeague, setFilterLeague] = useState('');
    const [filterAge, setFilterAge] = useState('');
    const [filterPoints, setFilterPoints] = useState('');

    const [ query, setQuery ] = useState("");
    // const [ searchColumns, setSearchColumns ] = useState([
    //     "nombre"
    // ]);
    
    useEffect(() => {
        usuarioAutenticado()

        
        // obteniendo los perfiles para la tabla
        obtenerTodosLosPerfiles();
        // eslint-disable-next-line
    }, [])

    const setColorTable = ( league ) => {
        // #ffbf00
        // #d7d7d7
        // #cd7f32
        switch (league) {
            case "Bronce":
                return "#cd7f32"

            case "Plata":
                return "#d7d7d7"
        
            case "Oro":
                return "#ffbf00"
            
            default:
                return "#000"
        }
    }
    
    let user_league = ""
    if ( perfiles.length !== 0 ) {
        datos = [...perfiles]

        // Setear el color de la tabla
        user_league = datos.find(element => element.user_id === usuario._id).Liga;
        user_league = setColorTable(user_league)
    }    

    const search = (rows) =>{
        // const columns = rows[0] && Object.keys(rows[0])
        return rows.filter( (row) =>
            // searchColumns.some(
                // (column) =>
                row["Nombre"].toString().toLowerCase().indexOf(query.toLocaleLowerCase()) > -1 &&
                row["Liga"].toString().toLowerCase().indexOf(filterLeague.toLocaleLowerCase()) > -1 &&
                row["Edad"].toString().toLowerCase().indexOf(filterAge.toLocaleLowerCase()) > -1 &&
                row["Puntuación"].toString().toLowerCase().indexOf(filterPoints.toLocaleLowerCase()) > -1
                // row.nombre.toLowerCase().indexOf(query) > -1 ||
                // row.email.toLowerCase().indexOf(query) > -1 
            // )
        );
    }
    // const columns = datos[0] && Object.keys(datos[0])
    return (
        <div className="container" >
            <div className="title-div" >
                <h2 className="title-rank" > Tabla de Clasificaciones </h2>
            </div>

            <div className="filters-rank" >
                <Grid container direction="row" justify="center" alignItems="center" spacing={3} >
                    <Grid item xs={3} container spacing={1} alignItems="flex-end">
                        <Grid item>
                            <AccountCircle />
                            {/* <img src={AgeIcon} alt="Edad" className="age-icon" /> */}
                        </Grid>
                        <Grid item>
                            <TextField
                                id="input-with-icon-grid"
                                label="Filtrar por nombre"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    {/* <input type="text" value={query}  /> */}
                    {/* { columns &&
                        columns && columns.map((column) => (
                            <label>
                                <input
                                    type="checkbox"
                                    checked={searchColumns.includes(column)}
                                    onChange={(e) => {
                                        const checked = searchColumns.includes(column);
                                        setSearchColumns((prev) =>
                                            checked
                                                ? prev.filter((sc) => sc !=== column)
                                                : [...prev, column]
                                        );
                                    }}
                                />
                                {column}
                            </label>
                        ))
                    } */}
                    <Grid item xs={2} >
                        <FormControl variant="outlined" id="select-league" >
                            <InputLabel id="demo-simple-select-outlined-label"> Liga </InputLabel>
                            <Select
                                labelId="demo-simple-select-outlined-label"
                                id="filterLeague"
                                value={filterLeague}
                                onChange={(e) => setFilterLeague(e.target.value)}
                                label="Liga"
                                MenuProps={{
                                    anchorOrigin: {
                                      vertical: "bottom",
                                      horizontal: "left"
                                    },
                                    transformOrigin: {
                                      vertical: "top",
                                      horizontal: "left"
                                    },
                                    getContentAnchorEl: null
                                }}
                            >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            <MenuItem value="Bronce">Bronce</MenuItem>
                            <MenuItem value="Plata">Plata</MenuItem>
                            <MenuItem value="Oro">Oro</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={3} container spacing={1} >
                        <Grid item>
                            <img src={AgeIcon} alt="Edad" id="ageIcon" />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="filterAge"
                                label="Filtrar por edad"
                                type="number"
                                value={filterAge}
                                onChange={(e) => setFilterAge(e.target.value)}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={3} container spacing={1} >
                        <Grid item id="starIcon" >
                            <StarsIcon />
                        </Grid>
                        <Grid item>
                            <TextField
                                id="standard-number"
                                label="Puntos"
                                type="number"
                                value={filterPoints}
                                onChange={(e) => setFilterPoints(e.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </div>

            <div className="table-rank" style={{ border: `3px solid 
                ${user_league} ` 
            }} >
                { perfiles.length !== 0
                ?
                    <Datatable
                        data={search(datos)}
                        user_id={usuario._id}
                    />
                :
                    null
                }
            </div>
        </div>
    );
}
 
export default Rank;