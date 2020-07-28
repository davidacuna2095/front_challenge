
// Validar si mostrar en rojo si hay error y si no cumple validacion
export const revisarAlerta = (mostrar, valor) => {
    let clase = '';
    if (mostrar && valor === '') {
        clase = 'alertaShadow';
    }
    return clase;
}
