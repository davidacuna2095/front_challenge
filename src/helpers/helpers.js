
// Validar si mostrar en rojo si hay error y si no cumple validacion
export const revisarAlerta = (mostrar, valor) => {
    let clase = '';
    if (mostrar && valor === '') {
        clase = 'alertaShadow';
    }
    return clase;
};

// Valida si albumactual es el que esta de la lista para aplicar estilo
export const isCurrentAlbum = (current, album) => {
    let clase = '';
    if (current === album) {
        clase = 'current';
    }
    return clase;
};