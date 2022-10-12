import { Routes, Route, Link, NavLink } from "react-router-dom";

import Form from "./components/Form/index";
import List from "./components/List/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/books/:id/edit" element={<Form />} />
        <Route path="/books/new" element={<Form />} />
        <Route path="/books/" element={<List />} />
      </Routes>
      <NavLink to="/books/new">Form</NavLink>
      <NavLink to="/books/">List</NavLink>
      <List />
      <Form />
    </div>
  );
}

export default App;
