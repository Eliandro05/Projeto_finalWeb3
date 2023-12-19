import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as s from "./stylealuno";

export default function Aluno() {
  const [exibirLista, setExibirLista] = useState(true);
  const [lista, setLista] = useState([]);
  const navigate = useNavigate();
  const notify = (mensagem, tipo) => toast(mensagem, { type: tipo });

  useEffect(() => {
    function fetchAlunos() {
      axios
        .get("http://localhost:3001/api/aluno")
        .then((res) => {
          setLista(res.data);
        })
        .catch((e) => {
          if (e.response.data.message) notify(e.response.data.message, 'error');
          else notify('Erro ao obter alunos', 'error');
        });
    }
    fetchAlunos();
  }, []);

  const excluirAluno = (id) => {
    axios.delete(`http://localhost:3001/api/aluno/${id}`).then((res) => {
      if (res.status === 200) {
        notify('Aluno excluído com sucesso', 'success');
        setLista(lista.filter((e) => e.id !== id));
      }
    }).catch((e) => {
      if (e.response.data.message) notify(e.response.data.message, 'error');
         else notify('Erro ao excluir aluno', 'error');
    });
  }

  return (
    <s.Geral>
      <s.PaginaLista onOff={exibirLista}>
        <s.Titulo>
          <h1>Lista de Alunos</h1>
        </s.Titulo>
        
        <s.Box>
          <s.BoxForm>
            {lista.length > 0 ? (
              lista.map((e, i) => {
                return (
                  <s.card>
                    {e.nome} - {e.cpf}
                    <button onClick={() => navigate('/aluno/cadastro/' + e.id)}>Editar</button>
                    <button onClick={() => excluirAluno(e.id)}>Excluir</button>
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
