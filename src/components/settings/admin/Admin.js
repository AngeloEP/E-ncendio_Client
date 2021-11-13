import React, { Fragment, useState, useEffect, useContext, useMemo } from 'react';
import DatatableUsers from './datatableUsers/DatatableUsers';
import Pagination from './pagination/Pagination';
import Search from './search/Search';

import AlertaContext from '../../../context/alertas/alertaContext';
import AuthContext from '../../../context/autentificacion/authContext';
import UsuariosContext from '../../../context/usuarios/usuariosContext';

import './admin.css';

const Admin = () => {
    // Extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const { mostrarAlerta } = alertaContext

    // Extraer informacion del context auth
    const authContext = useContext(AuthContext)
    const { mensaje } = authContext

    // Extraer los valores del context de usuarios
    const usuariosContext = useContext(UsuariosContext)
    const { usuarios, obtenerTodosLosUsuarios, cargandoAdminYBloqueo } = usuariosContext

    const ITEMS_PER_PAGE = 3;
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, ] = useState({ field: "", order: "" });
    // setTotalItems(users.length);

    useEffect(() => {
        // Ir a buscar los usuarios del sitio
        obtenerTodosLosUsuarios();

        if (mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        // eslint-disable-next-line
    }, [ mensaje, cargandoAdminYBloqueo ] )

    const usersData = useMemo(() => {
        let computedUsers = usuarios;

        if (search) {
            computedUsers = computedUsers.filter(
                user =>
                    user.Correo.toLowerCase().includes(search.toLowerCase()) ||
                    user.Nombre.toLowerCase().includes(search.toLowerCase())
            );
        }

        setTotalItems(computedUsers.length);

        //Sorting users
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedUsers = computedUsers.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedUsers.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [usuarios, currentPage, search, sorting]);

    return (
        <Fragment>
            <div className="row w-100">
                <div className="col-lg-6 col col-md-6 pagination-users">
                    <Pagination
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
                <div className="col-md-6 divFilterName ">
                    <Search
                        onSearch={value => {
                            setSearch(value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>
            <div className="div-datatable-users" >
                <DatatableUsers
                    users={usersData}
                    />
            </div>
        </Fragment>
    );
}
 
export default Admin;