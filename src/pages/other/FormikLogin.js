import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../styles/login.css';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../utils/constants'
import { loginAPI } from "../../apis/auth";
import Swal from 'sweetalert2'


const LogInSchema = Yup.object().shape({
  email: Yup.string().email("Email inválido").required("Email requerido"),
  password: Yup.string().required("Contraseña Requerida"),
});

const loginUser = async(values) =>{
  const result = await loginAPI(values)
  console.log(result)

  if(result.data.status === 202){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    })

    Toast.fire({
      icon: 'error',
      title: 'El correo no existe'
    })
  }else if( result.data.status === 404){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
    })

    Toast.fire({
      icon: 'error',
      title: 'Contraseña incorrecta'
    })
  }

  if(result.message){
    console.log('error')
  }else{
    const {accessToken, refreshToken} = result.data;
    localStorage.setItem(ACCESS_TOKEN, accessToken)
    localStorage.setItem(REFRESH_TOKEN, refreshToken)
  }
}

const Login = () => (
  <div>
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={LogInSchema}
      onSubmit={(values) => {
        console.log(values);
        loginUser(values)
      }}
    >
      {({ values, errors, touched }) => (
        <div className="container">
          <div className="container-form">
            <Form className="form">
              <div className="row row-input">
                <label className="text">Email:</label>
                <Field name="email" type="email" className="input" />
                <ErrorMessage name="email">
                  {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="row row-input">
                <label className="text-contraseña">Contraseña:</label>
                <Field name="password" type="password" className="input" />
                <ErrorMessage name="password">
                  {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
              </div>
              <a href="/" className="recordarContra">
                ¿Olvidaste tu contraseña?
              </a>
              <button type="submit" className="btn" >Iniciar sesion</button>
              <p>
                ¿Aún no tienes una cuenta? <a href="/register"><b>REGISTRATE</b></a>
              </p>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  </div>
);

export default Login;
