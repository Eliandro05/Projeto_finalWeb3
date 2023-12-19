import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as s from "./stylealuno";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "./../../img/Logo.png";

export default function Cadastro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const notify = (mensagem, tipo) => toast(mensagem, { type: tipo });

  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/api/aluno/${id}`)
        .then((resp) => {
          if (resp.status === 200) {
            console.log(getValues());
            setValue("nome", resp.data.nome);
            setValue("email", resp.data.email);
            setValue("cpf", resp.data.cpf);
            setValue("telefone", resp.data.telefone);
            setValue("celular", resp.data.celular);
            setValue("sexo", resp.data.sexo);
            setValue("dataNascimento", resp.data.dataNascimento.split("T")[0]);

            setValue("cep", resp.data.endereco.cep);
            setValue("logradouro", resp.data.endereco.logradouro);
            setValue("numero", resp.data.endereco.numero);
            setValue("complemento", resp.data.endereco.complemento);
            setValue("bairro", resp.data.endereco.bairro);
            setValue("cidade", resp.data.endereco.cidade);
            setValue("estado", resp.data.endereco.estado);

            setValue("descricao", resp.data.Curso.descricao);
            setValue("instituicao", resp.data.Curso.instituicao);
            setValue("periodo", resp.data.Curso.periodo);
          }
        })
        .catch((e) => {
          console.log("🚀 ~ file: Cadastro.jsx:51 ~ e", e);
          if (e.response.data.message) notify(e.response.data.message, "error");
          else notify("Erro ao buscar aluno", "error");
        });
    }
    console.log(errors);
  }, [errors]);

  const onSubmit = (data) => {
    if (!data.dataNascimento.includes("T")) {
      setValue("dataNascimento", data.dataNascimento + "T00:00:00.000Z");
    }

    const method = id ? "put" : "post";
    axios[method](`http://localhost:3001/api/aluno${id ? "/" + id : "/"}`, data)
      .then((resp) => {
        if (resp.status === 201 || resp.status === 200) {
          notify(
            `Aluno ${id ? "atualizado" : "cadastrado"} com sucesso`,
            "success"
          );
          navigate("/aluno");
        }
      })
      .catch((e) => {
        if (e.response.data.message) notify(e.response.data.message, "error");
        else
          notify(
            `Erro ao ${id ? "atualizado" : "cadastrado"} o aluno`,
            "error"
          );
      });
  };

  async function handleChangeCep(event) {
    let cep = event.target.value.replace(/[^0-9]/g, "");
    if (cep.length <= 7) return;

    try {
      let respCorreio = await axios.get(
        `https://brasilapi.com.br/api/cep/v2/${cep}`
      );

      if (respCorreio.status === 200) {
        const data = respCorreio.data;
        setValue("cep", data.cep);
        setValue("logradouro", data.street);
        setValue("cidade", data.city);
        setValue("bairro", data.neighborhood);
        setValue("estado", data.state);
      } else {
        notify("CEP não encontrado", "error");
      }
    } catch (e) {
      console.log("e", e);
    }
  }

  return (
    <s.Geral>
      <s.Pagina>
        <s.Titulo>
          <h1>ALUNO</h1>
        </s.Titulo>
        <s.Box onSubmit={handleSubmit(onSubmit)}>
          <s.BoxForm>
            <s.InputBox>
              <h2>Nome:</h2>
              <input
                defaultValue={getValues("nome")}
                {...register("nome", { required: true })}
                className="gravar_ apagar_"
                id="nome"
              />
              {errors.nome && <s.SpanError>Campo obrigatório</s.SpanError>}
            </s.InputBox>
            <s.InputBox>
              <h2>Data de Nascimento:</h2>
              <input
                className="gravar_ apagar_"
                title="Data Nascimento:"
                type="date"
                id="dataNasc"
                defaultValue={getValues("dataNascimento")}
                {...register("dataNascimento", { required: true })}
              />
            </s.InputBox>
            <s.InputBox>
              <h2>CPF:</h2>
              <input
                defaultValue={getValues("cpf")}
                {...register("cpf", { required: true })}
                className="gravar_ apagar_"
                title="CPF:"
                id="cpf"
              />
            </s.InputBox>

            <s.InputBox>
              <h2>Senha:</h2>
              <input
                defaultValue={getValues("senha")}
                {...register("senha", { required: true })}
                className="gravar_ apagar_"
                title="Senha:"
                id="senha"
              />
            </s.InputBox>

            <s.InputBox>
              <h2>Sexo:</h2>
              <s.InputRadio>
                <div>
                  <input
                    type="radio"
                    id="masculino"
                    defaultChecked={getValues("sexo")}
                    {...register("sexo", { required: true })}
                    value="M"
                  />
                  <label for="masculino">Masculino</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="feminino"
                    defaultChecked={getValues("sexo")}
                    {...register("sexo", { required: true })}
                    value="F"
                  />
                  <label for="feminino">Feminino</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="outro"
                    defaultChecked={getValues("sexo")}
                    {...register("sexo", { required: true })}
                    value="Outro"
                  />
                  <label for="outro">Outro</label>
                </div>
              </s.InputRadio>
            </s.InputBox>
          </s.BoxForm>

          <h3>CONTATOS</h3>
          <s.BoxForm>
            <s.InputBox>
              <h2>E-mail:</h2>
              <input
                defaultValue={getValues("email")}
                {...register("email", { required: true })}
                className="gravar_ apagar_"
                id="email"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Telefone:</h2>
              <input
                defaultValue={getValues("telefone")}
                {...register("telefone", { required: true })}
                className="gravar_ apagar_"
                id="telefone"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Celular:</h2>
              <input
                defaultValue={getValues("celular")}
                {...register("celular", { required: true })}
                className="gravar_ apagar_"
                type="text"
                id="celular"
              />
            </s.InputBox>
          </s.BoxForm>

          <h3>INFORMAÇÃO</h3>
          <s.BoxForm>
            <s.InputBox>
              <h2>Curso:</h2>
              <input
                defaultValue={getValues("descricao")}
                {...register("descricao", { required: true })}
                className="gravar_ apagar_"
                id="curso"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Instituição de Ensino:</h2>
              <input
                defaultValue={getValues("instituicao")}
                {...register("instituicao", { required: true })}
                className="gravar_ apagar_"
                id="instituicao"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Período:</h2>
              <input
                defaultValue={getValues("periodo")}
                {...register("periodo", { required: true })}
                className="gravar_ apagar_"
                type="text"
                id="periodo"
              />
            </s.InputBox>
          </s.BoxForm>

          <h3>ENDEREÇO</h3>
          <s.BoxForm>
            <s.InputBox>
              <h2>CEP:</h2>
              <input
                title="cep"
                id="cep"
                onChange={(e) => handleChangeCep(e)}
                defaultValue={getValues("cep")}
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Logradouro:</h2>
              <input
                className="gravar_ apagar_"
                title="logradouro:"
                id="logradouro"
                defaultValue={getValues("logradouro")}
                {...register("logradouro", { required: true })}
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Número:</h2>
              <input
                defaultValue={getValues("numero")}
                {...register("numero", { required: true })}
                className="gravar_ apagar_"
                title="numero:"
                id="numero"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Complemento:</h2>
              <input
                defaultValue={getValues("complemento")}
                {...register("complemento", { required: true })}
                className="gravar_ apagar_"
                id="complemento"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Bairro:</h2>
              <input
                defaultValue={getValues("bairro")}
                {...register("bairro", { required: true })}
                className="gravar_ apagar_"
                title="bairro:"
                id="bairro"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>Cidade:</h2>
              <input
                defaultValue={getValues("cidade")}
                {...register("cidade", { required: true })}
                className="gravar_ apagar_"
                title="cidade:"
                id="cidade"
              />
            </s.InputBox>
            <s.InputBox>
              <h2>UF:</h2>
              <input
                defaultValue={getValues("estado")}
                {...register("estado", { required: true })}
                className="gravar_ apagar_"
                title="uf:"
                id="uf"
              />
            </s.InputBox>
          </s.BoxForm>

            <s.BotaoDiv type="submit">
              <h2>Salvar</h2>
            </s.BotaoDiv>
            <s.BotaoDiv type="reset">
              <h2>Novo</h2>
            </s.BotaoDiv>
            <s.BotaoDiv type="reset" onClick={() => navigate(-1)}>
              <h2>Voltar</h2>
            </s.BotaoDiv>
            <s.Rodape>
              <img src={Logo} />
            </s.Rodape>
        </s.Box>
      </s.Pagina>
    </s.Geral>
  );
}
