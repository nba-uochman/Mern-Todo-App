import React, { useEffect, useState } from "react";
import fingerprintjs from "@fingerprintjs/fingerprintjs";
import Button from "./Button";




function ListItems({ text, handleClick, listId, list_id, editHandleClick, uniqueId }) {
    const [id, setId] = useState("");

    // generate unique visitorId id that does not change
    useEffect(() => {
        fingerprintjs.load().
            then(res => res)
            .then(fp => fp.get())
            .then(result => {
                setId(result.visitorId);
            })
            .catch(err => console.log(err, " no visitor"))
    });

    return (
        <div>
            {
                id === uniqueId ?
                    <div className='button-container  py-2 border-bottom '>
                        <li className="list-item ms-3 py-2">{text}</li>
                        <Button
                            handleClick={handleClick}
                            listId={listId}
                            list_id={list_id}
                            editHandleClick={editHandleClick}
                        />

                    </div> : null

            }

        </div>
    );
}


export default ListItems;