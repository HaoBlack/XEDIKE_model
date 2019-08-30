import React, { Component } from 'react';
import HeaderComp from '../components/header/header.comp';
import FooterComp from "../components/footer/footer.comp";
import ProfileContent from "../components/profile-content/profile-content.comp";
import ModalRegister from '../components/modal-register/modal-register.comp';
import ModalLogin from "../components/modal-login//modal-login.comp";
import { connect } from "react-redux";

class Profile extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  componentDidMount() {
    if (!localStorage.jwtToken) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <div>
        <HeaderComp />
        <ProfileContent />
        <FooterComp />
        <ModalRegister />
        <ModalLogin />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, null)(Profile);
