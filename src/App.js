import './App.css';
import {useState, useEffect} from 'react'
import React from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import axios from "axios";

const api = axios.create({
  baseURL:
    "https://6276da1a08221c96845ed8ed.mockapi.io/chat/chat",
});

function App() {
   const formik = useFormik({
    initialValues: {
      nomeSobrenome: '',
      cidadeEstado:'',
      dataNascimento:'',
      email:'',
      avaliacao:0,
    },
    validationSchema: yup.object({
      nomeSobrenome: yup.string().matches(/^[aA-zZ\s]+$/, 'Informe apenas letras.').required("Por favor informe o seu nome."),
      cidadeEstado: yup.string().required("Por favor informe a cidade e o estado onde mora."),
      dataNascimento: yup.string().required("Por favor informe a data do seu nascimento."),
      email: yup
        .string()
        .email("Por favor informe um e-mail valido")
        .required("Por favor informe o seu e-mail"),
      avaliacao: yup
        .number()
        .required("O campo é obrigatório.")
        .positive("Por favor insara um valor de 1 a 5")
        .integer("O campo deve ser um número inteiro.")
        .max(5, "Por favor insara um valor de 1 a 5"),
        
    }),
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
      sendData(JSON.stringify(values, null, 2));
    },
  });
  async function sendData(values) {
    try {
      const response = await api.post("/", values);
      console.log(response.status);
      if (response.status === 201) {
        alert("Dados Enviados");
      } else {
        alert("Falha no envio");
      }
    } catch (err) {
      alert("Houve uma falha no envio");
      return null;
    }
  }
  return (
    <div id='master'>
    <form onSubmit={formik.handleSubmit} >
      
        <div className='label'>
          <label  htmlFor="nomeSobrenome">Olá, eu sou Chatnilson, tudo bem? Para começarmos, preciso saber seu nome.</label>
        </div>
        <div >
          <input
            className={formik.errors.nomeSobrenome? 'inputError' :'input'}
            id="nomeSobrenome"
            name="nomeSobrenome"
            type="text"
            placeholder='Nome e Sobrenome'
            onChange={formik.handleChange}
            value={formik.values.nomeSobrenome}
          />
          {formik.errors.nomeSobrenome?(
            <p className='error'>{formik.errors.nomeSobrenome}</p>
          ):null}
        </div>
      
      {!formik.errors.nomeSobrenome && formik.values.nomeSobrenome?(
        <div>
          <div className='label'>
            <label  htmlFor="cidadeEstado">{`Que satisfação, ${formik.values.nomeSobrenome}. Agora que sei seu nome, qual a cidade e estado que você mora?`}</label>
          </div>
          <div >
            <input
              className={formik.errors.cidadeEstado? 'inputError' :'input'}
              id="cidadeEstado"
              name="cidadeEstado"
              type="text"
              placeholder='Cidade-Estado'
              onChange={formik.handleChange}
              value={formik.values.cidadeEstado}
            />
            {formik.errors.cidadeEstado?(
              <p className='error'>{formik.errors.cidadeEstado}</p>
            ):null}
          </div>
        </div>
      ):null}
        
      {(!formik.errors.cidadeEstado && formik.values.cidadeEstado) &&
       (!formik.errors.nomeSobrenome && formik.values.nomeSobrenome)       
      ?(
        <div>
          <div className='label'>
            <label  htmlFor="dataNascimento">Legal, agora que sabemos sua cidade e estado. Quando foi que você nasceu?</label>
          </div>
          <div >
            <input
              className='input'
              id="dataNascimento"
              name="dataNascimento"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.dataNascimento}
            />
            {formik.errors.dataNascimento?(
              <p className='error'>{formik.errors.dataNascimento}</p>
            ):null}
          </div>
        </div>
      ):null}

      {(!formik.errors.dataNascimento && formik.values.dataNascimento) &&
       (!formik.errors.cidadeEstado && formik.values.cidadeEstado) &&
       (!formik.errors.nomeSobrenome && formik.values.nomeSobrenome)      
      ?(
        <div>
          <div className='label'>
            <label  htmlFor="email">Agora me fala teu e-mail por gentileza.</label>
          </div>
          <div >
            <input
              className={formik.errors.email? 'inputError': 'input'}
              id="email"
              name="email"
              type="email"
              placeholder='exemplo@exemplo.com'
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email?(
              <p className='error'>{formik.errors.email}</p>
            ):null}
          </div>
        </div>
      ):null}
      
      {(!formik.errors.dataNascimento && formik.values.dataNascimento) &&
       (!formik.errors.cidadeEstado && formik.values.cidadeEstado) &&
       (!formik.errors.nomeSobrenome && formik.values.nomeSobrenome) &&
       (!formik.errors.email && formik.values.email)      
      ?(
        <div> 
          <div className='label'>
            <label  htmlFor="avaliacao">Você finaliazou o teste. Faça uma avaliação sobre o processo que realizou até chegar aqui. Nós agradecemos! </label>
          </div>
          <div >
            <input
              className={formik.errors.avaliacao? 'inputError': 'input'}
              id="avaliacao"
              name="avaliacao"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.avaliacao}
            />
          </div>
          {formik.errors.avaliacao?
            <p className='error'>{formik.errors.avaliacao}</p>
          :null}
          <button id='button'  type="submit">Enviar</button>
        </div>
      ):null}
      </form>
      </div>
    
  );
}

export default App;
