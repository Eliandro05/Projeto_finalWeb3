import React from "react";
import * as s from "./stylePrinc";

import Logo from "./../../img/Logo.png";
import IFPE from "./../../img/IFPE.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Principal() {
  const navigate = useNavigate();
  const [modelo, setModelo] = useState("");

  function changeModel(model) {
    console.log("model", model);
    if (model == 0) {
      alert("selecione qual seu tipo de usuário");
    } else {
      setModelo(model);
    }
  }

  function cadastrar() {
    if (!modelo) {
      alert("selecione qual seu tipo de usuário");
    } else {
      navigate(`/${modelo}/cadastro`);
    }
  }

  function click() {
    if (!modelo) {
      alert("selecione qual seu tipo de usuário");
      return;
    }
    if (modelo == "professor") {
      navigate(`/${modelo}`);
    } else {
      navigate("/solicitacao");
    }
  }

  return (
    <s.Geral>
      <s.Pagina>
        <s.Rodape>
          <img src={Logo} />
        </s.Rodape>
        <s.Box>
          <s.BoxImg />
          <s.BoxForm>
            <h1>LOGIN</h1>

            <s.BoxInput>
              <s.RadioInput>
                <h2>ALUNO</h2>
                <input
                  type="radio"
                  id="aluno"
                  name="cad"
                  onClick={() => changeModel("aluno")}
                />
              </s.RadioInput>
              <s.RadioInput>
                <h2>PROFESSOR</h2>
                <input
                  type="radio"
                  id="professor"
                  name="cad"
                  onClick={() => changeModel("professor")}
                />
              </s.RadioInput>
            </s.BoxInput>

            <s.InputBox>
              <input type="text" placeholder="Login..." />
            </s.InputBox>
            <s.InputBox>
              <input type="password" p laceholder="Senha..." />
            </s.InputBox>

            <button onClick={() => click()}>
              <div>Logar</div>
            </button>

            <button className="cadastrar" onClick={() => cadastrar()}>
              Cadastrar-se
            </button>
          </s.BoxForm>
        </s.Box>

        <s.Rodape>
          <img src={IFPE} />
        </s.Rodape>
      </s.Pagina>
    </s.Geral>
  );
}
