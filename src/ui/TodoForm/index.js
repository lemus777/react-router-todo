import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TodoForm.css';

function TodoForm(props) {
    const navigate = useNavigate();
    const [newTodoValue, setNewTodoValue] = React.useState('');
    
    const onChange = (event) => {
        setNewTodoValue(event.target.value);
    }
    const onCancel = () => {
        navigate('/');
    };
    const onSubmit = (event) => {
        event.preventDefault(); // Gracias a esto no se recarga la página al darle click al botón tipo submit
        if (newTodoValue.length <= 0) return; // Esta línea hace que en el caso de que dejemos el texto vacío no agrege nuevo todo
        navigate('/');
        props.submitEvent(newTodoValue);
    };

    return(
        <form onSubmit={onSubmit}>
            <label>{props.label}</label>
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
                    {props.submitText}
                </button>
            </div>
        </form>
    );
}

export { TodoForm };