import React, { Component } from 'react'
import TripInfoComp from './trip-info/trip-info.comp';
import BookTripFormComp from './book-trip-form/book-trip-form.comp';
import { Icon } from "antd";

export default class BookTripContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationGetIn: '',
            locationGetOff: '',
            paymentMethod: '',
            numberOfBookingSeats: 0,
            notes: ''
        }
    }
    render() {
        const { tripId } = this.props;
        return (
            <div className="container main">
                <div className="box-wrapper mb-5">
                    <TripInfoComp tripId={tripId} />
                </div>
                <div className="box-wrapper">
                    <h4 className="mt-3 mb-5"><Icon type="profile" /> Đặt chỗ:</h4>
                    <BookTripFormComp tripId={tripId} />
                </div>
            </div>
        )
    }
}
