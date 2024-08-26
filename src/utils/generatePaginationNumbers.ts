export const generatePaginationNumbers = ( currentPage: number, totalPages: number ) => {

    // si el numero total de paginas es 7 o menos se va a mostrar todas las paginas sin puntos suspensivos.
    if ( totalPages <= 7 ){
        return Array.from({ length: totalPages }, (_, i) => i + 1) // [1,2,3,4,5,6,7]
    }

    // si la pagina actual esta entre las primeras 3, se va a mostrar las primeras 3, puntos suspensivos y las ultimas 2.
    if (currentPage <= 3){
        return [1,2,3,'...', totalPages -1, totalPages]
    }

    // si la pagina actual esta entre las 3 ultimas, se va a mostrar las primeras 2, puntos suspensivos, las ultimas 3.

    if (currentPage >= totalPages - 2){
        return[1,2,'...', totalPages -2, totalPages -1, totalPages]
    }

    // si la pagina actual esta en un lugar medio, se va a mostrar la primera pagina, puntos suspensivos, la pagina actual y sus vecinos
    return [
        1,
        '...',
        currentPage -1,
        currentPage,
        currentPage +1,
        '...',
        totalPages
    ]

}