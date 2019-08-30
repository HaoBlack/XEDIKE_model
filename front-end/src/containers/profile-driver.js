import React, { Component } from 'react';
import HeaderComp from '../components/header/header.comp';
import FooterComp from "../components/footer/footer.comp";
import ModalRegister from '../components/modal-register/modal-register.comp';
import ModalLogin from "../components/modal-login//modal-login.comp";
import ProfileDriverContent from '../components/profile-driver-content/profile-driver-content.comp';

export default class ProfileDriver extends Component {
  render() {
    const { driverId } = (this.props.match.params);
    return (
      <div>
        <HeaderComp />
        <ProfileDriverContent driverId={driverId} />
        <FooterComp />
        <ModalRegister />
        <ModalLogin />
      </div>
    )
  }
}
