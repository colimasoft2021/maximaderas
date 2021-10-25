import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../styles/login.css';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../utils/constants';
import { registerAPI } from "../../apis/auth";
import Swal from 'sweetalert2';



const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Nombre Requerido"),
    lastName: Yup.string().required("Apellido Requerido"),
    city: Yup.string().required("Ciudad Requerida"),
    postalCode: Yup.string().required("Código Postal Requerido"),
    email: Yup.string().email("Email inválido").required("Email Requerido"),
    password: Yup.string().required("Contraseña Requerida"),
    repeatPassword: Yup.string().required("Confirmar Contraseña Requerida")
});

const registerUser = async(values) =>{
    const result = await registerAPI(values)
    console.log(result)

    if(result.data.status === 202) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: 'error',
            title: 'El correo no existe'
        });

    } else if (result.data.status === 404) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
        });

        Toast.fire({
            icon: 'error',
            title: 'Contraseña incorrecta'
        });
    }

    if(result.message) {
        console.log('error')
    } else {
        const {accessToken, refreshToken} = result.data;
        localStorage.setItem(ACCESS_TOKEN, accessToken)
        localStorage.setItem(REFRESH_TOKEN, refreshToken)
    }
}

const Register = () => (
    <div>
        <Formik
            initialValues={{
                name: "",
                lastName: "",
                city: "",
                postalCode: "",
                email: "", 
                password: "",
                repeatPassword: "",
                status: "active" 
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
                console.log(values);
                registerUser(values)
            }}
        >
        {({ values, errors, touched }) => (
            <div className="container">
                <h2 className="text-center p-2 font-weight-bold">REGÍSTRATE</h2>
                <div className="container-form">

                    <Form className="form">

                        <div className="row row-input">
                            <label className="text">Nombre:</label>
                            <Field 
                                name="name" 
                                type="text" 
                                className="input"
                            />
                            <ErrorMessage name="firstName">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text">Apellido:</label>
                            <Field 
                                name="lastName" 
                                type="text" 
                                className="input" 
                            />
                            <ErrorMessage name="lastName">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text">Ciudad:</label>
                            <Field 
                                name="city" 
                                type="text" 
                                className="input"  
                            />
                            <ErrorMessage name="city">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text">Código Postal:</label>
                            <Field 
                                name="postalCode" 
                                type="text" 
                                className="input" 
                            />
                            <ErrorMessage name="postalCode">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text">Email:</label>
                            <Field 
                                name="email" 
                                type="email" 
                                className="input" 
                            />
                            <ErrorMessage name="email">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text-contraseña">Contraseña:</label>
                            <Field 
                                name="password" 
                                type="password" 
                                className="input"
                            />
                            <ErrorMessage name="password">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text-contraseña">Confirmar Contraseña:</label>
                            <Field 
                                name="repeatPassword" 
                                type="password" 
                                className="input" 
                            />
                            <ErrorMessage name="repeatPassword">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        {/* <Field 
                            name="status" 
                            type="hidden" 
                            className="input" 
                        /> */}

                        <div className="col text-center">
                            <input 
                                type="checkbox" 
                                name="status" 
                                className="input" 
                                // onChange={ inputValidation } 
                                // checked={ inputs.privacyPolicy } 
                            />
                            <span for="defaultUnchecked"> He leído y acepto los Terminos y condiciones y aviso de privacidad.</span>
                        </div>

                        <br></br>

                        <div className="col text-center">
                            <button htmlType="submit" type="submit" className="btn" >Regístrate</button>
                        </div>

                    </Form>

                </div>
            </div>
        )}
        </Formik>
    </div>
);

export default Register;