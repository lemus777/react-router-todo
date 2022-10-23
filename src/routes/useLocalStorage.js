import React from "react";

function useLocalStorage(itemName, initialValue) {

  const [state, dispatch] = React.useReducer(reducer, initialState({ initialValue }));
  const {
    sincronizedItem,
    error,
    loading,
    item,
  } = state;

  // ACTION CREATORS
  const onError = (error) => dispatch({
    type: actionTypes.error,
    payload: error,
  });

  const onSuccess = (item) => dispatch({
    type: actionTypes.success,
    payload: item,
  });

  const onSave = (item) => dispatch({
    type: actionTypes.save,
    payload: item,
  });

  const onSincronize = () => dispatch({
    type: actionTypes.sincronize,
  });
  
  React.useEffect(() => {
    setTimeout(() => {
      // controla la persistencia, es un react hook
      try {
        const localStorageItem = localStorage.getItem(itemName); // localStorage.getItem recupera lo guardado en el navegador (localStorage).
        let parsedItem;
  
        if (!localStorageItem) {
          localStorage.setItem(itemName, JSON.stringify(initialValue)); // si no hay localStorageItem generamos uno por defecto que será un array vacío transformado a texto (JSON.stringify) para que localStorage pueda guardarlo
          parsedItem = initialValue; // además necesitamos un parsedItem, que será un array vacío también
        } else {
          parsedItem =JSON.parse(localStorageItem); // como tenemos un localStorage, que siempre es texto, lo pasamos a array (JSON.parse) y lo usamos como parsedItem
        }

        onSuccess(parsedItem);
      } catch(error) {
        onError(error);
      }
    }, 2000);
  }, [sincronizedItem]);
  
  const saveItem = (newItem) => { // funcion para actualizar estado con persistencia
    try {
      const stringifiedItem = JSON.stringify(newItem); // convierte newItem a texto (newItem se genera en los métodos para completar y eliminar, mas abajo)
      localStorage.setItem(itemName, stringifiedItem); // guarda en localStorage como item Item_V1 el texto generado anteriormente
      onSave(newItem); // actualiza el estado de Item igualándolo a newItem
    } catch(error) {
      onError(error);
    }
  };

  const sincronizeItem = () => {
    onSincronize();
  }
  
  return {
    item,
    saveItem,
    loading,
    error,
    sincronizeItem,
  }; // tenemos que usar return para que cuando la funcion App llame a esta funcion (useLocalStorage) le devuelva los dos valores que necesita, y también devuelve información de si está cargando o de si hay algún error
}

const initialState = ({ initialValue}) => ({
  sincronizedItem: true,
  error: false,
  loading: true,
  item: initialValue,
});

const actionTypes = {
  error: 'ERROR',
  success: 'SUCCESS',
  save: 'SAVE',
  sincronize: 'SINCRONIZE',
};

const reducerObject = (state, payload) => ({
  [actionTypes.error]: {
    ...state,
    error: true,
  },
  [actionTypes.success]: {
    ...state,
    error: false,
    loading: false,
    sincronizedItem: true,
    item: payload,
  },
  [actionTypes.save]: {
    ...state,
    item: payload,
  },
  [actionTypes.sincronize]: {
    ...state,
    sincronizedItem: false,
    loading: true,
  }
});

const reducer = (state, action) => {
  return reducerObject(state, action.payload)[action.type] || state;
};

export { useLocalStorage };