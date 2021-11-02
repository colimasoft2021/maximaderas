import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "../../styles/login.css";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { claveNuevaAPI } from "../../apis/auth";

const ContraseñaSchema = Yup.object().shape({
  password: Yup.string().required("Ingresa contraseña"),
  retypepassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "La contraseña no coincide"
  ),
});

const Recuperacion = async (values) => {
  const result = await claveNuevaAPI(values);
  console.log(result);

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
  });

  Toast.fire({
    icon: "success",
    title: "Contraseña actualizada",
  });

  setTimeout(()=>{
    window.location.href = '/login-register'
  }, 1500)
};

const NuevaClave = (props) => {
  const query = new URLSearchParams(props.location.search);
  const token = query.get('token')
  document.title = 'Nueva contraseña'

  return (
    <div>
      <Formik
        initialValues={{
          password: "",
          retypepassword: "",
          token: token
        }}
        validationSchema={ContraseñaSchema}
        onSubmit={(values) => {
          Recuperacion(values);
          console.log(values)
        }}
      >
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-form-container login-register-wrapper">
                  <div>
                    <div className="login-form-container">
                      <h2 className="text-center p-2 font-weight-bold">
                       Crear nueva contraseña
                      </h2>
                      <Form>
                        <div className="row row-input mt-5 mx-auto">
                          <label className="text">Contraseña:</label>
                          <Field
                            name="password"
                            type="password"
                            className="input"
                          />
                          <ErrorMessage name="password">
                            {(msg) => <span className="error">{msg}</span>}
                          </ErrorMessage>
                        </div>
                        <div className="row row-input mt-5 mx-auto">
                          <label className="text">Confirmar password:</label>
                          <Field
                            name="retypepassword"
                            type="password"
                            className="input"
                          />
                          <ErrorMessage name="retypepassword">
                            {(msg) => <span className="error">{msg}</span>}
                          </ErrorMessage>
                          <button
                            htmlType="submit"
                            type="submit"
                            className="btn"
                          >
                            Enviar
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </div>
  );
};

export default NuevaClave;
