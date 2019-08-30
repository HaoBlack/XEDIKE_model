import React, { Component } from 'react';
import {connect} from "react-redux";

// TODO: import actions
import {actGetUserList} from "../actions/user-action";
import {actGetTripList} from "../actions/trip-action";

// TODO: import components
import HeaderComp from '../components/header/header.comp';
import FooterComp from '../components/footer/footer.comp';
import MainBannerComp from "../components/home/main-banner/main-banner.comp";
import TripList from '../components/home/trips-list-home/trips-list.comp';
import Introduction from "../components/home/introduction/introduction.comp";
import Introduction2 from "../components/home/introduction-2/introduction-2.comp";
import Introduction3 from "../components/home/introduction-3/introduction-3.comp";
import ModalRegister from '../components/modal-register/modal-register.comp';
import ModalLogin from "../components/modal-login//modal-login.comp";

class home extends Component {

    componentWillMount(){
      this.props.onStoreUsersList();
      this.props.onStoreTripList();
    }

  render() {    
    return (
      <div>
          <HeaderComp/>
          <MainBannerComp/>
          <TripList/>
          <Introduction/>
          <Introduction2/>
          <Introduction3/>
          <FooterComp/>     
          <ModalRegister/>     
          <ModalLogin/>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    onStoreUsersList: () => {
      dispatch(actGetUserList())
    },

    onStoreTripList: () => {
      dispatch(actGetTripList())
    },
  }
}

export default connect(null ,mapDispatchToProps)(home);