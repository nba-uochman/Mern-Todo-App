import React, { useEffect, useState } from "react";
import Header from "./Header";
import TodoList from "./TodoList";
import CreateList from "./CreateList";
import axios from 'axios';
import fingerprintjs from "@fingerprintjs/fingerprintjs";


function App() {

    // initial state for todolist and unique visitorId
    const [lists, setLists] = useState([]);
    const [visitor, setVisitor] = useState("");

    // render all visitors list when the browser loads
    window.addEventListener('DOMContentLoaded', (event) => {
        axios.get("/todolist")
            .then(res => {
                setLists(res.data);
            })
            .catch(err => console.log(err));
    });

    // generate unique string as visitorId 
    useEffect(() => {
        fingerprintjs.load().
            then(res => res)
            .then(fp => fp.get())
            .then(result => {
                setVisitor(result.visitorId);
            })
            .catch(err => console.log(err, " no visitor"));
    });

    // add new todolist
    function handleClick(event, todoList) {
        event.preventDefault();

        axios.post("/todolist/new", { item: todoList, user: visitor })
            .then(res => {
                setLists(res.data);
            })
            .catch(err => console.log(err, "new errrrr"));
    }

    //  update / edit list
    function updateList(DB_id, text) {

        axios.post(`/todolist/${DB_id}/edit`, { item: text })
            .then(res => {
                setLists(res.data);
            })
            .catch(err => console.log(err));
    }

    // delete list
    function deleteList(DB_id) {

        console.log(DB_id);
        axios.get(`/todolist/${DB_id}/delete`)
            .then(res => {
                setLists(res.data);
            })
            .catch(err => console.log(err));
    }

    return (

        <div className="container border px-0">
            <Header />
            <div>
                <ul className='px-0'>
                    {
                        lists.map((listItem, index) => {
                            return (
                                <TodoList
                                    key={index}
                                    listId={index}
                                    list_id={listItem._id}
                                    text={listItem.item}
                                    handleClick={deleteList}
                                    editItem={updateList}
                                    uniqueId={listItem.user.userId}
                                />
                            );
                        })
                    }
                </ul>
            </div>
            <CreateList
                handleClick={handleClick}
            />
        </div>
    );
}

export default App;