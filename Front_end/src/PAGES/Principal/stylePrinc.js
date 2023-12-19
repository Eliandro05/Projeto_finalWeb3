import styled from "styled-components";
import ProfAluno from "./../../img/ProfAluno.png";

export const Geral = styled.div`
  width: 100%;
  heigth: auto;
  padding: 4px;
`;

export const Pagina = styled.div`
  width: 100%;
  height: auto;
`;

export const BoxImg = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 10px;
  background-image: url(${ProfAluno});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 600px;
  padding: 10px 14px;
  opacity: 0.4;
  position: relative;
  
  @media screen and (max-width: 640px) {
    background-size: 400px;
    
  }
`;

export const Box = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px 10px;
`;

export const Rodape = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  border: 1px solid #000;
  text-align: center;

  img {
    width: 200px;
    height: auto;
  }
`;

export const BoxInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  /* margin: 4px; */
  padding: 4px;
  text-align: center;
  justify-content: space-between;

`;

export const RadioInput = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 4px;
  padding: 4px;

  h2 {
    font-size: 13px;
  }
`;

export const InputBox = styled.div`
  min-width: 250px;
  margin: 2px;
  padding: 2px;
`;

export const BoxForm = styled.div`
  flex: 1;
  max-width: 400px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  border: 1px solid #000;
  border-radius: 10px;
  margin: 90px;
  padding: 4px;
  position: absolute;

  button{
    margin: 2px;
    background-color: #00f;
    color: #fff;
    border: none;
    border-radius: 4px;
    font-weight: bold;

  }

  .cadastrar {
    color: #00f;
    background-color: transparent;
    border: none;
  }
`;

export const BotaoDiv = styled.div`
  width: 250px;
  height: auto;
  background-color: #000;
  border: 1px solid #fff;
  cursor: point;
  border-radius: 10px;
  margin: 4px;
  padding: 6px 4px;

  :hover {
    background-color: #f00;
  }
`;
