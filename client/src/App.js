import { useState } from "react";
import "./App.css";
import * as yup from "yup";
import { ErrorMessage, Formik, Form, Field } from "formik";
import Axios from "axios";

function App() {
  const handleLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      idvendedor: values.idvendedor,
    }).then((response) => {
      alert(response.data.msg);
    });
  };

  const handleRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      nome: values.nome,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationsLogin = yup.object().shape({
    idvendedor: yup
      .string()
      .min(1)
      .required("O ID do vendedor é obrigatório"),
  });

  const validationsRegister = yup.object().shape({
    email: yup
      .string()
      .email("email inválido")
      .required("O email é obrigatório"),
    nome: yup
      .string()
      .min(3)
      .required("O nome é obrigatório"),
  });


  const validationsRegisterVendas = yup.object().shape({
    idvendedor: yup
      .string()
      .required("O ID é obrigatório"),
    valor: yup
      .string()
      .min(1)
      .required("O valor é obrigatório"),
  });

  return (
    
    /* Listar vendas de 1 vendedor */
    <div className="container">
      <h2>Login do vendedor</h2>
      <Formik
        initialValues={{}}
        onSubmit={handleLogin}
        validationSchema={validationsLogin}
      >
        <Form className="login-form">
          <div className="login-form-group">
            <Field name="idvendedor" className="form-field" placeholder="ID do vendedor" />

            <ErrorMessage
              component="span"
              name="idvendedor"
              className="form-error"
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </Form>
      </Formik>

      <h2>Cadastro de vendedor</h2>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegister}
      >
        <Form className="register-form">
          <div className="register-form-group">
            <Field name="email" className="form-field" placeholder="Email" />

            <ErrorMessage
              component="span"
              name="email"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="nome" className="form-field" placeholder="Nome" />

            <ErrorMessage
              component="span"
              name="nome"
              className="form-error"
            />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </Formik>

      <h2>Cadastro de Vendas</h2>
      <Formik
        initialValues={{}}
        onSubmit={handleRegister}
        validationSchema={validationsRegisterVendas}
      >
        <Form className="register-form">
          <div className="register-form-group">
            <Field name="IdVendedor" className="form-field" placeholder="ID do vendedor" />

            <ErrorMessage
              component="span"
              name="IdVendedor"
              className="form-error"
            />
          </div>

          <div className="form-group">
            <Field name="valor" className="form-field" placeholder="Valor da venda" />

            <ErrorMessage
              component="span"
              name="valor"
              className="form-error"
            />
          </div>
          <button className="button" type="submit">
            Cadastrar Venda
          </button>
        </Form>
      </Formik>
    </div>
  );
}
export default App;