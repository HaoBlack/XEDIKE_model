import React, { Component } from 'react';
import ProfileDirverInfo from "./profile-driver-info/profile-driver-info.comp";
import ProfileDriverSidebar from "./profile-driver-sidebar/profile-driver-sidebar.comp";
import axios from "axios";

export default class ProfileDriverContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            dateOfBirth: '',
            email: '',
            fullName: '',
            phone: '',
            registerDate: '',
            driverProfile: {}
        }
    }

    componentDidMount() {
        // get user's profile
        axios({
            method: 'GET',
            url: `http://localhost:5500/api/user/${this.props.driverId}`
        })
            .then(res => {
                const { avatar, dateOfBirth, email, fullName, phone, registerDate } = res.data;
                this.setState({
                    avatar,
                    dateOfBirth,
                    email,
                    fullName,
                    phone,
                    registerDate
                })
            })
            .catch(err => {
                console.log(err.response);
            })

        // get driver's profile
        axios({
            method: 'GET',
            url: `http://localhost:5500/api/user/driver/${this.props.driverId}`
        })
            .then(res => {
                this.setState({
                    driverProfile: res.data
                })
            })
            .catch(err => console.log(err.response))
    }

    render() {
        const { avatar, dateOfBirth, email, fullName, phone, registerDate, driverProfile } = this.state;
        return (
            <section className="main profile-driver-content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-3 col-12">
                            <ProfileDriverSidebar
                                avatar={avatar}
                                registerDate={registerDate}
                                passengerRates={driverProfile.passengerRates}
                                fullName={fullName}
                                driverId={this.props.driverId}
                            />
                        </div>
                        <div className="col-sm-9 col-12">
                            <ProfileDirverInfo
                                dateOfBirth={dateOfBirth}
                                email={email}
                                fullName={fullName}
                                phone={phone}
                                driverProfile={driverProfile}
                            />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}
