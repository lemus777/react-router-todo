import React from 'react';
import './TodoForm.css';

function TodoForm({ addTodo, setOpenModal }) {
    const [newTodoValue, setNewTodoValue] = React.useState('');
    
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    }
    const onCancel = () => {
        setOpenModal(false);
    };
    const onSubmit = (event) => {
        event.preventDefault(); // Gracias a esto no se recarga la página al darle click al botón tipo submit
        if (newTodoValue.length <= 0) return; // Esta línea hace que en el caso de que dejemos el texto vacío no agrege nuevo todo
        addTodo(newTodoValue);
        setOpenModal(false);
    };

    return(
        <form onSubmit={onSubmit}>
            <label>Escribe tu nuevo ToDo</label>
            <textarea
                value={newTodoValue}
                onChange={onChange}
                placeholder='Introduce un nuevo ToDo'
            />
            <div className='TodoForm-buttonContainer'>
                <button
                    type='button'
                    className='TodoForm-button TodoForm-button--cancel'
                    onClick={onCancel}
                >
                    Cancelar
                </button>
                <button
                    type='submit'
                    className='TodoForm-button TodoForm-button--add'
                >
                    Añadir
                </button>
            </div>
        </form>
    );
}

export { TodoForm };