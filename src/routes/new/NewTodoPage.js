import React from 'react';
import { TodoForm } from '../../ui/TodoForm/index';
import { useTodos } from '../useTodos';

function NewTodoPage() {
    const { stateUpdaters } = useTodos();
    const { addTodo } = stateUpdaters;

    return (
        <TodoForm
            label='Escribe tu nuevo ToDo'
            submitText='Añadir'
            submitEvent={(text) => addTodo(text)}
        />
    );
}

export { NewTodoPage };