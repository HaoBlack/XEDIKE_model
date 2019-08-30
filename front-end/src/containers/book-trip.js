import React, { Component } from 'react';
import HeaderComp from '../components/header/header.comp';
import FooterComp from '../components/footer/footer.comp';
import ModalRegister from '../components/modal-register/modal-register.comp';
import ModalLogin from "../components/modal-login//modal-login.comp";
import BookTripContent from '../components/book-trip-page-content/book-trip-content.comp';



export default class BookTripPage extends Component {



    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {


        const { tripId } = (this.props.match.params);
        return (
            <div>
                <HeaderComp />
                <BookTripContent
                    tripId={tripId}
                />
                <FooterComp />
                <ModalRegister />
                <ModalLogin />
            </div>
        )
    }
}
