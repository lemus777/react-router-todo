import React from 'react';
import './TodoSearch.css';

function TodoSearch({ searchValue, setSearchValue, loading }) {
    const onSearchValueChange = (event) => {
        console.log(event.target.value); 
        setSearchValue(event.target.value); // Event target value guarda la información introducida por el usuario en el campo, así que cambiará el searchValue declarado en App.js a eso
    };

    return (
        <input 
            className='TodoSearch'
            placeholder='Cebolla'
            value={searchValue} // tenemos que aplicar un valor inicial al estado que será el searchValue de la constante declarada en App.js
            onChange={onSearchValueChange} // en cuanto cambie usamos setSearchValue de App.js para cambiar el estado
            disabled={loading}
        />
    );
}

export { TodoSearch };