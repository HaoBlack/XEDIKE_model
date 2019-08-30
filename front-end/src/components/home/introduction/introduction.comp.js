import React, { Component } from 'react';
import "./introduction.css";

export default class Introduction extends Component {
  render() {
    return (
      <section className="introduction">
        <div className="container">
            <div className="introduction-item">
                <div className="row">
                    <div className="col-sm-6 col-12 my-auto">
                        <h2>Bắt đầu chuyến xe của bạn</h2>
                        <p>Là người sẽ mang những chuyến xe cũng như những trải nghiệm cho Khách hàng. Các tài xế luôn là những người hiểu rõ Khách hàng cần những gì là tốt nhất. Tất nhiên, chúng tôi có những Quy định cụ thể để đảm bảo lợi ích lớn nhất cho tất cả các bên.</p>
                    </div>
                    <div className="col-sm-6 col-12">
                        <img src="./img/hugo-navigation-support.png" className="img-fluid" alt="banner"/>
                    </div>
                </div>
            </div>

            <div className="introduction-item">
                <div className="row">
                    <div className="col-sm-6 col-12">
                        <img src="./img/hugo-location-access.png" className="img-fluid" alt="banner"/>
                    </div>
                    <div className="col-sm-6 col-12 my-auto">
                        <h2>Chọn chuyến đi mà bạn muốn</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    </div>                    
                </div>
            </div>

        </div>
      </section>
    )
  }
}
