
import React, { useState } from 'react';
import Button from './Button';
import ListItems from "./ListItems";


function TodoList({ text, editItem, handleClick, listId, list_id, uniqueId }) {

    const [isEditable, setIsEditable] = useState(false);
    const [editList, setEditList] = useState("");

    function editHandleClick() {
        setIsEditable(true);
    }

    function editHandleChange(event) {
        const newEditInput = event.target.value;

        setEditList(newEditInput);
    }


    return (
        <div>
            {isEditable ?
                <div className='py-2 border-bottom'>
                    <input type="text"
                        value={editList}
                        onChange={editHandleChange}
                        autoFocus
                    />

                    <button className="btn btn-primary mx-2"
                        onClick={() => {
                            editItem(list_id, editList);
                            setEditList("");
                            setIsEditable(false);
                        }

                        }>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                    <button className="btn  btn-warning"
                        onClick={() => setIsEditable(false)}>
                        <i className="bi bi-x-octagon"></i>
                    </button>
                </div>
                :
                <ListItems
                    text={text}
                    handleClick={handleClick}
                    list_id={list_id}
                    editHandleClick={editHandleClick}
                    uniqueId={uniqueId} />
            }
        </div>
    )
}

{/* <div className='button-container  py-2 border-bottom '>
                    <li className="list-item ms-3 py-2">{text}</li>
                    <Button
                        handleClick={handleClick}
                        listId={listId}
                        list_id={list_id}
                        editHandleClick={editHandleClick}
                    />

                </div>  */}

export default TodoList;