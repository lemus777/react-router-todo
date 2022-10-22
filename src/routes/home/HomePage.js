import React from 'react';
import { useTodos } from '../useTodos';
import { TodoHeader } from '../../ui/TodoHeader/index';
import { TodoCounter } from "../../ui/TodoCounter";
import { TodoSearch } from "../../ui/TodoSearch";
import { TodoList } from '../../ui/TodoList/index';
import { TodoItem } from '../../ui/TodoItem/index';
import { TodoForm } from '../../ui/TodoForm/index';
import { CreateTodoButton } from '../../ui/CreateTodoButton/index';
import { Modal } from '../../ui/Modal/index';
import { TodosError } from '../../ui/TodosError/index';
import { TodosLoading } from '../../ui/TodosLoading/index';
import { EmptyTodos } from '../../ui/EmptyTodos/index';
import { ChangeAlert } from '../../ui/ChangeAlert/index';

function HomePage() {
  const { state, stateUpdaters } = useTodos();

  const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    searchedTodos,
    openModal,
  } = state;

  const {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
  } = stateUpdaters;

  return(
    <React.Fragment>
      <TodoHeader loading={loading}>
        <TodoCounter
          totalTodos={totalTodos}
          completedTodos={completedTodos}
        />
        <TodoSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
      </TodoHeader>

    <TodoList
      error={error}
      loading={loading}
      searchedTodos={searchedTodos}
      searchText={searchValue}
      totalTodos={totalTodos}
      onError={() => <TodosError />}
      onLoading={() => <TodosLoading />}
      onEmptyTodos={() => <EmptyTodos />}
      onEmptySearchResults={
        (searchText) => <p>No hay resultados para {searchText}</p>
      }

    >
      {todo => (
        <TodoItem 
          key={todo.id} 
          text={todo.text} 
          completed={todo.completed}
          onEdit={() => console.log('Editar ToDo')}
          onComplete={() => completeTodo(todo.id)} // con onComplete mandamos a la función completeTodo el texto de ese todo
          onDelete={() => deleteTodo(todo.id)} 
        />
        )}
    </TodoList>
  
    {!!openModal && (
        <Modal>
            <TodoForm
              addTodo={addTodo}
              setOpenModal={setOpenModal}
            />
        </Modal>
    )}

    <CreateTodoButton
        setOpenModal={setOpenModal}
    />
    <ChangeAlert
      sincronize={sincronizeTodos}
    />
    </React.Fragment>
  );
}

export { HomePage };
