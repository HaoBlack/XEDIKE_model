import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from "axios";
import SidebarProfile from './sidebar-profile/sidebar-profile.comp';
import ProfileInfo from './profile-info/profile-info.comp';
import { actGetDriverProfile } from "../../actions/driver-action";
import ProfileDriver from './profile-driver/profile-driver.comp';

class ProfileContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            dateOfBirth: '',
            email: '',
            fullName: '',
            isActive: false,
            numberOfTrips: 0,
            password: '',
            phone: '',
            registerDate: '',
            userType: ''
        }
    }

    componentDidMount() {
        if (Object.keys(this.props.user).length) {
            axios({
                method: 'GET',
                url: `http://localhost:5500/api/user/${this.props.user.id}`
            })
                .then(res => {
                    const { avatar, dateOfBirth, email, fullName, isActive, numberOfTrips, password, phone, registerDate, userType } = res.data;
                    this.setState({
                        avatar,
                        dateOfBirth,
                        email,
                        fullName,
                        isActive,
                        numberOfTrips,
                        password,
                        phone,
                        registerDate,
                        userType
                    })
                })
                .catch(err => {
                    console.log(err);
                })
        }

        if (this.props.user.userType === "driver") {
            this.props.actGetDriverProfile(this.props.user.id);
        }
    }

    render() {
        const {
            registerDate, avatar, userType, fullName, email, phone, numberOfTrips, dateOfBirth
        } = this.state;

        return (
            <section className="main profile-page-main">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-12">
                            <SidebarProfile
                                registerDate={registerDate}
                                avatar={avatar}
                                userType={userType}
                                fullName={fullName}
                                numberOfTrips={numberOfTrips}
                            />
                        </div>
                        <div className="col-sm-9 col-12">
                            <ProfileInfo
                                fullName={fullName}
                                email={email}
                                phone={phone}
                                dateOfBirth={dateOfBirth}
                            />
                            {userType === "driver" ? <ProfileDriver /> : null}
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user
    }
}

export default connect(mapStateToProps, { actGetDriverProfile })(ProfileContent);