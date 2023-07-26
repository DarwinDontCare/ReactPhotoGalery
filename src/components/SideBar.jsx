import React from "react";

export default function SideBar({sideBarClassName, setCurrentScreen}) {

    function changeMenu(e) {
        setCurrentScreen(e.target.value);
    }

    return (
        <div className={sideBarClassName}>
            <button className="Sidebar-menus" value="main" onClick={changeMenu}>Galery</button>
            <br />
            <button className="Sidebar-menus" value="favorites" onClick={changeMenu}>Favorites</button>
        </div>
    );
}