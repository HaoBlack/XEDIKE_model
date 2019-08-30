import React from 'react'

export default function ActionGroup() {
    return (
        <div style={{ display: "flex" }}>
            <a href="/" data-toggle="modal" data-target="#modalLogin" className="nav-link">Đăng nhập</a>
            <button data-toggle="modal" data-target="#modalRegister" className="btn-xedike">Đăng ký</button>
        </div>
    )
}
