import React from 'react';
import { useTodos } from './useTodos';
import { TodoHeader } from '../TodoHeader/index';
import { TodoCounter } from "../TodoCounter";
import { TodoSearch } from "../TodoSearch";
import { TodoList } from '../TodoList/index';
import { TodoItem } from '../TodoItem/index';
import { TodoForm } from '../TodoForm/index';
import { CreateTodoButton } from '../CreateTodoButton/index';
import { Modal } from '../Modal/index';
import { TodosError } from '../TodosError/index';
import { TodosLoading } from '../TodosLoading/index';
import { EmptyTodos } from '../EmptyTodos/index';
import { ChangeAlert } from '../ChangeAlert/index';

function App() {
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
          key={todo.text} 
          text={todo.text} 
          completed={todo.completed}
          onComplete={() => completeTodo(todo.text)} // con onComplete mandamos a la función completeTodo el texto de ese todo
          onDelete={() => deleteTodo(todo.text)} 
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

export default App;
