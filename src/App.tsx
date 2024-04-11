import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { HeaderSection } from './Components/HeaderSection';
import { TodoList } from './Components/TodoList';

function App() {
  return (
    <div className="App">
      <HeaderSection />
      <TodoList />
    </div>
  );
}

export default App;
