import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
// import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import NuevaClave from "./CrearNuevaClave";

const NuevaClaveUser = ({ location }) => {

  // const { pathname } = location;
  return (
    <Fragment>
      <MetaTags> 
      <title>Maximaderas | Nueva Contraseña</title>      
      </MetaTags>
      {/* <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Inicio</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem> */}
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <div className="login-form-container">
                    <div className="login-register-form">
                      <NuevaClave/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

NuevaClaveUser.propTypes = {
  location: PropTypes.object
};

export default RecoveryPassword;
