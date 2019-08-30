import React from 'react';
import "./main-banner.css";
import SearchTripForm from "./search-trip-form/search-trip-from.comp";

export default function MainBanner() {
  return (
    <section className="main-banner">
        <div className="container">
            <div className="row">
                <div className="col-md-6 col-12 pt-5">
                    <h1 className="mt-5">Bắt đầu chuyến đi của bạn</h1>
                    <h4>Đã có <span id="number-user">1152</span> thành viên sử dụng trên toàn quốc</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
                <div className="col-md-6 col-12">
                    <img src="./img/hugo-car-rental.png" alt="main banner imgage" className="img-fluid"/>
                </div>
            </div>

            <SearchTripForm className="mt-5"/>
        </div>
    </section>
  )
}
