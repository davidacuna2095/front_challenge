import React, { useState, useEffect } from 'react';

import '../styles/styles_paginator.scss';

const usePaginator = (registrosMostrar, contenido) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentContent, setCurrentContent] = useState([]);

    const max_pages = Math.ceil(contenido.length / registrosMostrar);
    const numerosPaginas = [...Array(max_pages).keys()];

    useEffect(() => {
        displayedContent(1);
        // eslint-disable-next-line
    }, [contenido]);


    // Contegino segun la pagina que seleccones en barra numerica
    const displayedContent = page => {
        const begin = (page - 1) * registrosMostrar;
        const end = begin + registrosMostrar;

        setCurrentPage(page);
        setCurrentContent(contenido.slice(begin, end));
    };

    // Ir a siguiente pagina
    // Va a la ultima si isLast true
    const nextPage = (page, isLast) => {
        page = isLast ? max_pages : page;
        if (page <= max_pages) {

            const begin = (page - 1) * registrosMostrar;
            const end = begin + registrosMostrar;

            setCurrentPage(page)
            setCurrentContent(contenido.slice(begin, end));
        }
    };

    // Ir a pagina anterior
    // Va a la primera si isFirst true
    const previousPage = (page, isFirst) => {
        page = isFirst ? 1 : page;
        if (page > 0) {
            const begin = (page - 1) * registrosMostrar;
            const end = begin + registrosMostrar;

            setCurrentPage(page)
            setCurrentContent(contenido.slice(begin, end));
        }
    };

    const Paginar = () => (
        max_pages > 0 ?
            <div className="col-12 pagination">
                <span
                    className="first arrow"
                    onClick={() => previousPage(currentPage - 1, true)}
                ></span>
                <span
                    className="prev arrow"
                    onClick={() => previousPage(currentPage - 1, false)}
                ></span>

                {numerosPaginas.map(item => (
                    <span
                        key={`${item}pag`}
                        onClick={() => displayedContent(item + 1)}
                        className={currentPage === (item + 1) ? 'active' : null}
                    >{item + 1}</span>
                ))}

                <span
                    className="next arrow"
                    onClick={() => nextPage(currentPage + 1, false)}
                ></span>
                <span
                    className="last arrow"
                    onClick={() => nextPage(currentPage + 1, true)}
                ></span>
            </div>
            : null
    );

    return [currentContent, Paginar];

}

export default usePaginator;
