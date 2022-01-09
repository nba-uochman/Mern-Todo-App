import React, { useState } from 'react';

function CreatList({ handleClick }) {
    const [todoList, setTodoList] = useState("");

    function handleChange(event) {
        const newItem = event.target.value;

        setTodoList(newItem);
    }

    return (
        <div>
            <form className='my-2'>
                <input
                    className='text-center'
                    type="text"
                    value={todoList}
                    placeholder="add item"
                    onChange={handleChange} />
                <button className="add-button btn btn-sm btn-primary ms-3 border add-button"
                    type="submit"
                    onClick={(event) => {
                        handleClick(event, todoList)
                        setTodoList("");
                    }
                    }>
                    <i className='bi bi-plus-lg'></i>
                </button>
            </form>
        </div>
    );
}

export default CreatList;
