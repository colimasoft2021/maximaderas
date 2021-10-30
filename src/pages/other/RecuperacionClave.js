import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../styles/login.css";
import * as Yup from "yup";
import Swal from "sweetalert2";
import {recuperacionClaveAPI} from '../../apis/auth'


const ContraseñaSchema = Yup.object().shape({
  email: Yup.string().email('Email invalido').required('Email Requerido')
})

const Recuperacion = async(values)=>{
  const result = recuperacionClaveAPI(values)
 console.log(values)

 const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

Toast.fire({
  icon: "success",
  title: "Correo enviado",
});
}

const RecuperacionClave = () => {
  return (
    <div>
      <Formik
      initialValues={{
        email: ""
      }}
      validationSchema={ContraseñaSchema}
      onSubmit={(values) => {
        Recuperacion(values)
      }}
      >
        <div className="container">
          <h2 className="text-center p-2 font-weight-bold">
            ¿Olvidaste tu contraseña?
            <p className="texto">
              Se mandará una enlace de restablecimiento de contraseña al correo que se haya
              registrado
            </p>
          </h2>
          <div>
            <Form>
              <div className="row row-input mt-5">
                <label className="text">Email:</label>
                <Field name="email" type="email" className="input" />
                <ErrorMessage name="email">
                  {(msg) => <span className="error">{msg}</span>}
                </ErrorMessage>
                <button htmlType="submit" type="submit" className="btn">
                  Enviar 
                </button>
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default RecuperacionClave;
