import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TodoForm } from '../../ui/TodoForm/index';
import { useTodos } from '../useTodos';

function EditTodoPage() {
    const location = useLocation(); // vamos a usar esta location para evitar cargar el texto en editar porque ya existe en home en realidad, no necesita consulta de nuevo
    const params = useParams(); // esto nos dará los parámetros del todo, useParams viene por defecto en React. Uno de ellos es la id
    const id = Number(params.id); // los parámetros por defecto son string, como necesitamos un número usamos number para transformar la id
    const { state, stateUpdaters } = useTodos(); // stateUpdaters es el objeto de useTodo que nos contiene los actualizadores de estado, state contiene estados
    const { loading, getTodo } = state; // necesitamos el estado getTodo que nos dirá cual es el ToDo actual usando su id, y el estado loading para saber cuando acaba de cargar y la id está disponible
    const { editTodo } = stateUpdaters; // y nos interesa ese objeto porque es el que contiene nuestra función editTodo

    let todoText; // auxiliar que nos ayudará con el texto

    if (location.state && location.state.todo) { // si existe el estado location.state comprueba si existe location.state.todo
        todoText= location.state.todo.text; // el texto del todo será el mismo que el de nuestro estado existente
    } else if (loading) { // si no hay estado comprueba si estamos cargando
        return <p>Cargando...</p>; // mientras esté cargando no avanzará y nos mostrará el mensaje de carga
    } else { // una vez que acabe la carga hace la consulta
        const todo = getTodo(id); // ahora obtenemos nuestro todo usando la función getTodo que usará ya nuestro todo de id específica 
        todoText = todo.text; // e igualamos nuestro todoText al texto del todo obtenido
    }

    return (
        <TodoForm
            label='Edita tu ToDo'
            defaultTodoText={todoText} // ahora con nuestro todo ya definido usamos todo.text para mostrar por defecto su texto antes de editar
            submitText='Editar'
            submitEvent={(newText) => editTodo(id, newText)}
        />
    );
}

export { EditTodoPage };