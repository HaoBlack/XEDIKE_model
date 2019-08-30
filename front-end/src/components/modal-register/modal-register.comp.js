import React, { Component } from 'react';
import "./modal-register.css";
import classnames from "classnames";
import { connect } from "react-redux";
import { actRegisterUser } from "../../actions/user-action";

class ModalRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            password2: "",
            phone: "",
            userType: "",
            fullName: "",
            dateOfBirth: "",
        }
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmitRegister = (e) => {

        e.preventDefault();
        const { email, password, password2, phone, userType, fullName, dateOfBirth } = this.state;

        const newUser = { email, password, password2, phone, userType, fullName, dateOfBirth };

        this.props.actRegisterUser(newUser);

        setTimeout(() => {
            if (Object.keys(this.props.errors).length === 0) {
                document.querySelector(".close").click();
                document.querySelector(".modal__form-register").reset();
                document.querySelector(".toogleModalLogin").click();
            }
        }, 500);

    }

    render() {
        const { errors } = this.props;

        return (

            <div className="modal fade" id="modalRegister" tabIndex="-1" role="dialog" aria-labelledby="modal register" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">

                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">x</button>
                            <h3 className="modal-title text-center">Đăng ký tài khoản Xe đi ké</h3>
                            <p className="text-center">Bạn đã có tài khoản? <a href="/" data-toggle="modal" data-target="#modalLogin" data-dismiss="modal" aria-label="Close" className="toogleModalLogin">Đăng nhập</a></p>
                            <br />

                            <form className="modal__form-register" onSubmit={this.handleSubmitRegister}>

                                <div className="form-group">
                                    <label htmlFor="email">
                                        Email:
                                    </label>
                                    <input id="email"
                                        name="email"
                                        className={classnames("form-control", { "is-invalid": errors.email })}
                                        placeholder="Nhập địa chỉ email của bạn"
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fullName">
                                        Họ và tên:
                                    </label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        className={classnames("form-control", { "is-invalid": errors.fullName })}
                                        placeholder="Nhập họ tên của bạn"
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.fullName && (<div className="invalid-feedback">{errors.fullName}</div>)}
                                </div>

                                <div className="form-group inline-group pr-1">
                                    <label htmlFor="password">
                                        Mật khẩu:
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        className={classnames("form-control", { "is-invalid": errors.password })}
                                        type="password"
                                        placeholder="Nhập mật khẩu"
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                                </div>

                                <div className="form-group inline-group pl-1">
                                    <label htmlFor="password2">
                                        Mật khẩu xác thực:
                                    </label>
                                    <input
                                        id="password2"
                                        name="password2"
                                        className={classnames("form-control", { "is-invalid": errors.password2 })}
                                        type="password"
                                        placeholder="Nhập mật khẩu xác thực"
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">
                                        Số điện thoại
                                    </label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        className={classnames("form-control", { "is-invalid": errors.phone })}
                                        placeholder="Nhập số điện thoại của bạn"
                                        autoCorrect="false"
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.phone && (<div className="invalid-feedback">{errors.phone}</div>)}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="dateOfBirth">
                                        Ngày sinh
                                    </label>
                                    <input
                                        id="dateOfBirth"
                                        name="dateOfBirth"
                                        className={classnames("form-control", { "is-invalid": errors.dateOfBirth })}
                                        type="date"
                                        placeholder="Nhập ngày sinh của bạn"
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.dateOfBirth && (<div className="invalid-feedback">{errors.dateOfBirth}</div>)}
                                </div>

                                <div className="form-group">
                                    <label>Bạn muốn trở thành !?</label>
                                    <input
                                        type="radio"
                                        name="userType"
                                        id="passenger"
                                        value="passenger"
                                        className={classnames("d-none", { "is-invalid": errors.userType })}
                                        onChange={this.handleInputChange} />
                                    <input
                                        type="radio"
                                        name="userType"
                                        id="driver"
                                        value="driver"
                                        className={classnames("d-none", { "is-invalid": errors.userType })}
                                        onChange={this.handleInputChange}
                                    />
                                    {errors.userType && (<div className="invalid-feedback d-block">{errors.userType}</div>)}
                                    <br />
                                    <div className="inline-wrapper pr-2">
                                        <label htmlFor="passenger" className="label-choice float-left" id="labelPassenger">
                                            <img src="./img/img_signup_passenger.png" alt="signup passenger" className="img-fluid" />
                                            <p className="text-center mt-3">Hành khách</p>
                                        </label>
                                    </div>
                                    <div className="inline-wrapper pl-2" >
                                        <label htmlFor="driver" className="label-choice float-right" id="labelDriver">
                                            <img src="./img/img_signup_driver.png" alt="signup driver" className="img-fluid" />
                                            <p className="text-center mt-3">Tài xế</p>
                                        </label>
                                    </div>
                                    <div  >
                                    </div>

                                </div>

                                <p className="text-center">Khi đăng ký tài khoản, mặc định bạn đã đồng ý với các <a href="/">Điều khoản</a> và <a href="/">Điều kiện</a> hoạt động của chúng tôi.</p>

                                <button className="btn btn-block btn-xedike">Đăng kí</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, { actRegisterUser })(ModalRegister);