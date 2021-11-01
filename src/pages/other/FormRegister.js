import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import '../../styles/login.css';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../utils/constants';
import { registerAPI } from "../../apis/auth";
import Swal from 'sweetalert2';
import GooglePlaces from "./GooglePlaces";
import loadScript from "./loadScript";
import removeScript from "./removeScript";



const RegisterSchema = Yup.object().shape({
    name: Yup.string().required("Nombre Requerido"),
    lastName: Yup.string().required("Apellido Requerido"),
    //city: Yup.string().required("Ciudad Requerida"),
    postalCode: Yup.string().required("Código Postal Requerido"),
    email: Yup.string().email("Email inválido").required("Email Requerido"),
    password: Yup.string().required("Contraseña Requerida"),
    repeatPassword: Yup.string().required("Confirmar Contraseña Requerida")
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden'),
    checkbox: Yup.boolean().oneOf([true], 'Aceptar Términos y Condiciones')
});


const registerUser = async(values) =>{
    // console.log(values);
    // return true;
    const result = await registerAPI(values)
    console.log(result)

    if(result.data.status === 201) {
        Swal.fire(
          '¡Usuario registrado correctamente!',
          '',
          'success'
        )
    }
    else if(result.data.status === 202) {
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


const Register = () => {

    const GOOGLE_MAPS_API_KEY = 'AIzaSyDQGqbZH1EYcj2rvCtVzF9pvTGfGueNWDg';
    const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
    const geocodeJson = 'https://maps.googleapis.com/maps/api/geocode/json';

    const searchInput = useRef(null);
    const [address, setAddress] = useState({});
    const [location, setLocation] = useState("");
    const [errorCity, setErrorCity] = useState(2);

    const [mapsLoaded, setMapsLoaded] = useState(false);

    // https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&sensor=true&language=en

    useEffect(() => {
        removeScript(document, 'st-google-maps');
        loadScript(
            document,
            'script',
            'st-google-maps',
            `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places&language=en`,
            () => {
                setMapsLoaded(true);
            }
        );
        return () => {
            removeScript(document, 'st-google-maps');
            const scripts = document.querySelectorAll(
                "script[src*='maps.googleapis.com/maps-api-v3']"
            );
            for (let i = 0; i < scripts.length; i += 1) {
                scripts[i].parentNode.removeChild(scripts[i]);
            }
        };
    }, []);
    

    function handleAddressSelect(address, placesID){
        console.log(address);
    }

    return(
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
                status: "active",
                checkbox: false
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values) => {
                console.log(values);
                //console.log(city);
                console.log(location);
                //registerUser(values)
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
                                <ErrorMessage name="name">
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

                        
                            <label className="row row-input">Ciudad:</label>

                            { mapsLoaded ? ( <GooglePlaces
                                name="city"
                                type="text"
                                address={address}
                                onAddressSelect={handleAddressSelect}
                                className="row row-input"
                            
                            /> ) :null }
                            
                            <ErrorMessage name="city">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>


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
                                    id="password"
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
                                    id="repeatPassword"
                                />
                                <ErrorMessage name="repeatPassword">
                                    {(msg) => <span className="error">{msg}</span>}
                                </ErrorMessage>
                            </div>

                            <Field 
                                name="status" 
                                type="hidden" 
                                className="input" 
                            />

                            <div className="col text-center">
                                <Field 
                                    type="checkbox" 
                                    name="checkbox" 
                                    className="input" 
                                    id="checkbox"
                                />
                                
                                <span for="defaultUnchecked"> He leído y acepto los Terminos y condiciones y aviso de privacidad.</span>
                                <br></br>

                                <ErrorMessage name="checkbox">
                                    {(msg) => <span className="error">{msg}</span>}
                                </ErrorMessage>
                            </div>

                            <br></br>

                            <div className="col text-center">
                                <button 
                                    htmlType="submit" 
                                    type="submit" 
                                    className="btn"
                                >
                                Regístrate</button>
                            </div>

                        </Form>
                </div>
            </div>
        )}
        </Formik>
    </div>
    );
};

export default Register;