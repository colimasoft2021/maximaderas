import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../../styles/login.css';
import * as Yup from "yup";
import MetaTags from "react-meta-tags";
import LayoutOne from "../../layouts/LayoutOne";
// // import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../../utils/constants';
import { contactUsAPI } from "../../apis/auth";
import Swal from 'sweetalert2';


const ContactSchema = Yup.object().shape({
  name: Yup.string().required("Nombre Requerido"),
  email: Yup.string().required("Email Requerido"),
  subject: Yup.string().required("Asunto Requerido"),
  messageSubject: Yup.string().required("Mensaje Requerido")
});


const contactUser = async(values) =>{
  const result = await contactUsAPI(values)
  console.log(result);

  if(result.data.status === 200) {
    Swal.fire(
      '¡Mensaje enviado correctamente!',
      '',
      'success'
    )
  } 
  if(result.data.status === 404) {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 4000,
    });

    Toast.fire({
        icon: 'error',
        title: 'Error, intentelo nuevamente'
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


const Contact = ({ location }) => {
  // const { pathname } = location;

  return (
    <Fragment>
      <MetaTags>
        <title>Maximaderas | Contacto</title>
        <meta
          name="description"
          content="Contact of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutOne headerTop="visible">
        {/* <Breadcrumb /> */}
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            <div className="custom-row-2">
              <div className="col-lg-6 col-md-7">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  subject: "",
                  messageSubject: "" 
                }}
                validationSchema={ContactSchema}
                onSubmit={(values) => {
                    console.log(values);
                    contactUser(values)
                }}
              >
              {({ values, errors, touched }) => (

                <div className="container">
                  <h2 className="text-center p-2 font-weight-bold">Escríbenos</h2>
                    <div className="container-form">
                  
                      <Form className="form">

                        <div className="row row-input">
                            <label className="text">Nombre Completo:</label>
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
                            <label className="text">Email:</label>
                            <Field 
                                name="email" 
                                type="text" 
                                className="input" 
                            />
                            <ErrorMessage name="email">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text">Asunto:</label>
                            <Field 
                                name="subject" 
                                type="text" 
                                className="input"  
                            />
                            <ErrorMessage name="subject">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <div className="row row-input">
                            <label className="text">Mensaje:</label>
                            <Field
                                as="textarea" 
                                name="messageSubject" 
                                type="text" 
                                className="input" 
                            />
                            <ErrorMessage name="messageSubject">
                                {(msg) => <span className="error">{msg}</span>}
                            </ErrorMessage>
                        </div>

                        <br></br>

                        <div className="col text-center">
                            <button htmlType="submit" type="submit" className="btn" >Envíar Mensaje</button>
                        </div>

                        <br></br>
                        
                      </Form>
                    </div>
                  </div>
                )}
                </Formik>
              </div>
              <div className="col-md-4">
                <div className="contact-form">
                  <div className="contact-title mb-10">
                    <div className="contact-img">
                      <img
                        src={
                          process.env.PUBLIC_URL +
                          "/assets/img/contact/contact-img.png"
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row-md-6">
                <div className="contact-info-wrap">
                
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Camino Al Rancho El Encino 400, Santa Anita, Jal.</p>
                    </div>
                  </div>

                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>(33) 3687-1100, (33) 3687-1200,</p>
                      <p>(33) 3687-1300, (33) 3687-1100,</p>
                      <p>(33) 3687-1200, (33) 3687-1300</p>
                    </div>
                  </div>

                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-envelope " />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a href="ventas@maderaspolanco.com">
                          ventas@maderaspolanco.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-clock-o" />
                    </div>
                    <div className="contact-info-dec">
                      <p>Lunes-Sábado de 10:00pm - 7:00pm</p>
                    </div>
                  </div>

                  {/* <div className="contact-social text-center">
                    <h3>Follow Us</h3>
                    <ul>
                      <li>
                        <a href="//facebook.com">
                          <i className="fa fa-facebook" />
                        </a>
                      </li>
                      <li>
                        <a href="//pinterest.com">
                          <i className="fa fa-pinterest-p" />
                        </a>
                      </li>
                      <li>
                        <a href="//thumblr.com">
                          <i className="fa fa-tumblr" />
                        </a>
                      </li>
                      <li>
                        <a href="//vimeo.com">
                          <i className="fa fa-vimeo" />
                        </a>
                      </li>
                      <li>
                        <a href="//twitter.com">
                          <i className="fa fa-twitter" />
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </div>
              </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Contact.propTypes = {
  location: PropTypes.object
};

export default Contact;
