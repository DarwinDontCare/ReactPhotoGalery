import React from "react";

export default function InputField({setFilter}) {

    function addSearchFilter(e) {
        e.preventDefault();
        setFilter(e.target[0].value);
    }

    return (
        <form onSubmit={addSearchFilter}>
            <input type="text" />
            <button>🔍</button>
        </form>
    );
};