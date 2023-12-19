import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import Principal from "../PAGES/Principal/Principal";
import Aluno from "../PAGES/Aluno/aluno";
import Professor from "../PAGES/Professor/professor";
import Solicitacao from "../PAGES/Solicitacao/solicitacao";
import Cadastro from "../PAGES/Aluno/Cadastro";
import CadastroProf from "../PAGES/Professor/Cadastro";

const Rotas = () => {

  return (
    <Routes>
      <Route
        element={<Principal />}
        path="/" exact
      />

      <Route
        element={<Solicitacao />}
        path="/solicitacao"
      />

      <Route
        element={<Cadastro />}
        path="/aluno/cadastro"
      />

      <Route
        element={<Cadastro />}
        path="/aluno/cadastro/:id"
      />

      <Route
        element={<Aluno />}
        path="/aluno"
      />

      <Route
        element={<Professor />}
        path="/professor"
      />

      <Route
        element={<CadastroProf />}
        path="/professor/cadastro"
      />

      <Route
        element={<CadastroProf />}
        path="/professor/cadastro/:id"
      />
    </Routes>
  );
};

export default Rotas;
