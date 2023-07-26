import React from "react";
import menuImg from "../assets/images/menu-regular-24.png"

export default function InputField({setFilter, setSideBarClassName, sideBarClassName}) {

    function addSearchFilter(e) {
        e.preventDefault();
        setFilter(e.target[0].value);
    }

    function toggleSidebar() {
        if (sideBarClassName === "sidebar-closed" || sideBarClassName === "sidebar") {
            setSideBarClassName("sidebar-open")
        } else {
            setSideBarClassName("sidebar-closed");
        }
    }

    return (
        <form onSubmit={addSearchFilter} className="Search-form">
            <img onClick={toggleSidebar} className="Sidebar-toggle" src={menuImg}></img>
            <input type="text" className="Search-input"/>
            <button className="Search-button" type="submit">🔍</button>
        </form>
    );
};