import * as s from "./styleprof";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Professor() {
  const [exibirLista, setExibirLista] = useState(true);
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();
  const notify = (mensagem, tipo) => toast(mensagem, { type: tipo });

  useEffect(() => {
    function fetchProfessores() {
      axios
        .get("http://localhost:3001/api/professor")
        .then((res) => {
          setLista(res.data);
        })
        .catch((e) => {
          if (e.response.data.message) notify(e.response.data.message, 'error');
          else notify('Erro ao obter professor', 'error');
        });
    }
    fetchProfessores();
  }, []);

  const excluirProfessor = (id) => {
    axios.delete(`http://localhost:3001/api/professor/${id}`).then((res) => {
      if (res.status === 200) {
        notify('Professor excluído com sucesso', 'success');
        setLista(lista.filter((e) => e.id !== id));
      }
    }).catch((e) => {
      if (e.response.data.message) notify(e.response.data.message, 'error');
      else notify('Erro ao excluir professor', 'error');
    });
  }

  return (
    <s.Geral>
      <s.PaginaLista onOff={exibirLista}>
        <s.Titulo>
          <h1>Lista de Professores</h1>
        </s.Titulo>
        
        <s.Box>
          <s.BoxForm>
            {lista.length > 0 ? (
              lista.map((e, i) => {
                return (
                  <s.card>
                    {e.nome} - {e.cpf}
                    <button onClick={() => navigate('/professor/cadastro/' + e.id)}>Editar</button>
                    <button onClick={() => excluirProfessor(e.id)}>Excluir</button>
                  </s.card>
                );
              })
            ) : (
              <s.card>NENHUM RESULTADO RETORNADO</s.card>
            )}
          </s.BoxForm>
        </s.Box>
      </s.PaginaLista>
    </s.Geral>
  );
}
