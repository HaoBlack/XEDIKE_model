import React from 'react';
import "./introduction-3.css";

export default function Introduction3() {
  return (
    <section className="introduction-3">
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-12 img-container">
                    <img src="./img/img_mac.png" alt="mac" width="100%" height="100%"/>
                    <img src="./img/img_iPad.png" alt="ipad" className="ipad"/>
                </div>
                <div className="col-sm-6 col-12">
                    <div className="row">
                        <div className="col-6">
                            <h3>677</h3>
                            <strong>Hành khách</strong>
                            <p>Hàng nghìn lượt khách tin tưởng chúng tôi để tìm những chuyến xe với chất lượng tốt nhất.</p>
                        </div>
                        <div className="col-6">
                            <h3>476</h3>
                            <strong>Tài xế</strong>
                            <p>Hệ thống của chúng tôi kết nối hàng trăm tài xế sẵn sàng phục vụ nhu cầu đi lại mỗi ngày.</p>
                        </div>
                        <div className="col-6">
                            <h3>456</h3>
                            <strong>Chuyến xe</strong>
                            <p>Số liệu này cho chúng tôi biết bạn đã về đến nhà an toàn.</p>
                        </div>
                        <div className="col-6">
                            <h3>4385.32</h3>
                            <strong>Khí CO2 được giảm (kg)</strong>
                            <p>Chúng ta đã góp phần làm giảm lượng khí CO2 trung bình mỗi ngày. Trái Đất sẽ rất biết ơn chúng ta về điều này.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
