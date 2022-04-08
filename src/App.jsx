import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IniciarSesion from "./layout/IniciarSesion";
import Layout from "./layout/Layout";
import Inicio from "./paguinas/Inicio";
import LoginForm from "./paguinas/LoginForm";
import NuevoCliente from "./paguinas/NuevoCliente";
import EditarCliente from "./paguinas/EditarCliente";
import VerCliente from "./paguinas/VerCliente";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
