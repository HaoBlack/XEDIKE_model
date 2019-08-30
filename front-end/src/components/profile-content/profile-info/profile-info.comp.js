import React, { Component } from 'react';
import { connect } from "react-redux";
import { Icon } from "antd";
import "./profile-info.css";
import PersonalInfoFormComp from './personal-info-form/personal-info-form.comp';
import ChangePasswordFormComp from './change-password-form/change-password-form.comp';
import axios from "axios";

class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    axios.get("http://localhost:5500/api/user/" + nextProps.user.id)
      .then(user => {
        this.setState({
          oldPassword: user.data.password
        })
      })
      .catch(err => {
        console.log(err.response);
      })
  }

  render() {
    const { email, dateOfBirth, phone, fullName } = this.props;
    const { oldPassword } = this.state;
    return (
      <div className="box-wrapper profile--info">
        <div className="personal-info-box">
          <h5><Icon type="user" /> Thông tin cá nhân</h5>
          <PersonalInfoFormComp
            email={email}
            dateOfBirth={dateOfBirth}
            phone={phone}
            fullName={fullName}
          />
        </div>
        <div className="change-password-box">
          <h5><Icon type="lock" /> Đổi mật khẩu</h5>
          <ChangePasswordFormComp
            oldPassword={oldPassword}
          />
        </div>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, null)(ProfileInfo);