import React from 'react';
import { TodoForm } from '../../ui/TodoForm/index';

function EditTodoPage() {
    return (
        <TodoForm
            label='Edita tu ToDo'
            submitText='Editar'
            submitEvent={() => console.log('Llamar a editTodo')}
        />
    );
}

export { EditTodoPage };