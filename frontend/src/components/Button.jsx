import React from "react";


function Button({ editHandleClick, list_id, handleClick, listId }) {
    return (
        <div className='button-holder   d-inline-block'>
            <button className='mx-2 btn btn-sm btn-warning'
                onClick={() => editHandleClick(list_id)}>
                <i className="bi bi-pencil-square"></i>
            </button>
            <button className='btn btn-sm btn-danger'
                onClick={() => handleClick(list_id)}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
    );
}

export default Button;