import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./../../img/Logo.png";
import * as s from "./styleSolic";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const Solicitacao = () => {
  const { register, getValues, setValue, handleSubmit, formState: { errors } } = useForm({
    defaultValue: {
      disciplinaId: 0,
      assunto: "",
      horarioAgendado: "",
      status: "PENDENTE",
      data: "",
      alunoId:1
    }
  });
  const [exibirLista, setExibirLista] = useState(true);
  const [lista, setLista] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const navigate = useNavigate();
  const notify = (mensagem, tipo) => toast(mensagem, { type: tipo });

  useEffect(() => {
    function Pesqlista() {
      axios.get('http://localhost:3001/api/solicitacao').then((response) => {
        setLista(response.data);
      }).catch((error) => {
        console.log("error: " + error);
        notify('Erro ao obter as solicitações', 'error')
      });
    }

    function PesqDisciplinas() {
      axios.get('http://localhost:3001/api/disciplina').then((response) => {
        setDisciplinas(response.data);
      }).catch((error) => {
        console.log("error: " + error);
        notify('Erro ao obter as solicitações', 'error')
      });
    }

    if (disciplinas.length === 0) PesqDisciplinas();
    if (lista.length === 0) Pesqlista();
  }, []);

  const onSubmit = (data) => {
    axios.post('http://localhost:3001/api/solicitacao', {...data, alunoId: 1}).then((response) => {
      notify('Solicitação gravada com sucesso', 'success');
      console.log('response', response)
    }).catch((err) => {
      console.log('err', err)
      notify('Erro ao gravar a solicitação', 'error');
    })
  }

  function selSolicitacao(e) {
    setExibirLista(true);

    if ((e) != null) {
      for (const fields in e) {
        const Valor = e[fields];

        try {
          document.querySelector(`#${fields}`).value = Valor;
        } catch (e) { }
      }
    }
    setExibirLista(false);
  }


  const handleChangeDisciplina = (e) => {
    setValue('disciplinaId', Number(e.target.value));
  };


  return (
    <s.Geral>
      <s.PaginaLista style={{ display: exibirLista ? 'block' : 'none' }}>
        <s.Titulo>
          <h1>Lista de Solicitações</h1>
        </s.Titulo>
        <s.Box>
          <s.BoxForm>
            {lista.length > 0 ? (
              lista.map((e, i) => {
                return (
                  <s.card
                    onClick={() => {
                      selSolicitacao(e);
                    }}
                  >
                    {e?.assunto} - {e?.Disciplina.descricao} - {e?.status}
                  </s.card>
                );
              })
            ) : (
              <s.card>NENHUM RESULTADO RETORNADO</s.card>
            )}
          </s.BoxForm>
        </s.Box>
        <s.BotaoDiv
          onClick={() => {
            setExibirLista(false);
          }}
        >
          <h2>NOVO</h2>
        </s.BotaoDiv>
        <s.BotaoDiv
          onClick={() => {
            navigate(-1);
          }}
        >
          <h2>VOLTAR</h2>
        </s.BotaoDiv>
        <s.Rodape>
          <img src={Logo} alt="alguma coisa" />
        </s.Rodape>
      </s.PaginaLista>

      <s.PaginaCad style={{ display: !exibirLista ? 'block' : 'none' }}>
        <s.Titulo>
          <h1>Solicitação de Aula</h1>
        </s.Titulo>
        <s.Box>

          <s.BoxForm onSubmit={handleSubmit(onSubmit)}>
            <s.InputBox>
              <h2>Matéria Solicitada:</h2>
              
              <s.SelectComponent
                value={getValues('disciplinaId')}
                onChange={handleChangeDisciplina}
              >
                <option value="0">Selecione a disciplina</option>
                {disciplinas && disciplinas.map((d) => (
                  <option key={d.id} value={d.id}>{d.descricao}</option>
                ))}
              </s.SelectComponent>
            </s.InputBox>
            <s.InputBox>
              <h2>Assunto:</h2>
              <input {...register('assunto')} className="gravar_ apagar_" type="text" id="assunto" />
            </s.InputBox>
            <s.InputBox>
              <h2>Data: </h2>
              <input {...register('data')} className="gravar_ apagar_" type="date" id="date" />
            </s.InputBox>
            <s.InputBox>
              <h2>Horário:</h2>
              <input {...register('horarioAgendado')} className="gravar_ apagar_" type="text" id="horario" />
            </s.InputBox>

            <s.BtnRow>
              <s.BotaoDiv type="submit">Gravar</s.BotaoDiv>
              <s.BotaoDiv onClick={() => { setExibirLista(true) }}>Cancelar</s.BotaoDiv>
            </s.BtnRow>

          </s.BoxForm>
        </s.Box>
        <s.Rodape>
          <img src={Logo} />
        </s.Rodape>
      </s.PaginaCad>
    </s.Geral>
  );
}

export default Solicitacao;