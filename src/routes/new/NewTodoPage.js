import React from 'react';
import { TodoForm } from '../../ui/TodoForm/index';

function NewTodoPage() {
    return (
        <TodoForm
            label='Escribe tu nuevo ToDo'
            submitText='Añadir'
            submitEvent={() => console.log('Llamar a addTodo')}
        />
    );
}

export { NewTodoPage };