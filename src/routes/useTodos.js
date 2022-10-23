import React from "react";
import { useLocalStorage } from './useLocalStorage';

function useTodos() { // hacemos un custom hook
    const {
        item: todos,
        saveItem: saveTodos,
        sincronizeItem: sincronizeTodos,
        loading,
        error,
      } = useLocalStorage('TODOS_V2', []); //llamamos a nuestro custom hook
      const [searchValue, setSearchValue] = React.useState(''); // el estado usa un array de searchValue y setSearchValue, es igual a un estado que es un array vacío. Esto se guarda en la constante searchValue, y setSearchValue cambia este estado, por tanto cambia searchValue
    
      const completedTodos = todos.filter(todo => !!todo.completed).length; // filtra nuestros todo y mira si tiene completed como true gracias a !!
      const totalTodos = todos.length; // totalTodos nos da el número total de todos que tenemos
    
      let searchedTodos = []; // nos crea searchedTodos que va a ser un array vacio
    
      if (!searchValue.length >= 1) {
        searchedTodos = todos; // si no hay al menos una letra de búsqueda iguala el array a nuestro todos, que por defecto es defaultTodos
      } else {
        searchedTodos = todos.filter(todo => { // si hay algo en la búsqueda por cada todo:
          const todoText = todo.text.toLowerCase(); // nos pasa a minúsculas el texto de todo
          const searchText = searchValue.toLowerCase(); // nos pasa a minúsculas el texto de la búsqueda
          return todoText.includes(searchText); // nos devuelte los todos cuyo texto incluye la búsqueda, al ser pasado a minúsculas nos lo va a encontrar independientemente de que se busque en mayúsculas o minúsculas
        });
      }

      const addTodo = (text) => {
        const id = newTodoId(todos); // le generamos automáticamente una id a cada nuevo todo
        const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
        newTodos.push({
          completed: false,
          text,
          id,
        });
        saveTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos y a la vez guarda para persistencia, ver la función más arriba
      };

      const getTodo = (id) => {
        const todoIndex = todos.findIndex(todo => todo.id === id); // va a buscarnos el índice del todo cuya id coincide con la id aportada a la funcion
        return todos[todoIndex]; // de la lista de ToDos nos devuelve el que tenga el todoIndex buscado previamente
      }
    
      const completeTodo = (id) => {
        const todoIndex = todos.findIndex(todo => todo.id === id); // va a buscarnos el índice del todo cuya id coincide con la id aportada a la funcion
        const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
        newTodos[todoIndex].completed = true; // de esta lista clonada el que tiene la id coincidente va a ser marcado como completado
        saveTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos y a la vez guarda para persistencia, ver la función más arriba
      };

      const editTodo = (id, newText) => {
        const todoIndex = todos.findIndex(todo => todo.id === id); // va a buscarnos el índice del todo cuya id coincide con la id aportada a la funcion
        const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
        newTodos[todoIndex].text = newText; // de esta lista clonada el que tiene la id coincidente va a sustituir su texto por el nuevo texto editado
        saveTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos y a la vez guarda para persistencia, ver la función más arriba
      };
    
      const deleteTodo = (id) => {
        const todoIndex = todos.findIndex(todo => todo.id === id); // va a buscarnos el índice del todo cuya id coincide con el texto aportado a la funcion
        const newTodos = [...todos]; // vamos a clonar la lista de todos (eso es con el ...)
        newTodos.splice(todoIndex, 1); // de esta lista clonada el que tiene la id coincidente va a ser eliminado
        saveTodos(newTodos); //vamos a actualizar el estado de todos para que sea igual a newTodos
      };

      const state = {
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        searchedTodos,
        getTodo,
      };

      const stateUpdaters = {
        setSearchValue,
        addTodo,
        completeTodo,
        editTodo,
        deleteTodo,
        sincronizeTodos,
      }

    return { state, stateUpdaters };
}

function newTodoId(todoList) { // recibe una lista de todos, es en minúscula porque no es el componente, sino el array de los todos
  if (!todoList.length) {
    return 1;
  }

  const idList = todoList.map(todo => todo.id); // por cada elemento de la lista de todos nos obtiene la id
  const idMax = Math.max(...idList); // Math.max nos busca el número más alto suministrado. Le suministramos el array de id obtenido antes, pero como elementos individuales gracias a los tres puntos ...
  return idMax + 1;
}

export { useTodos };