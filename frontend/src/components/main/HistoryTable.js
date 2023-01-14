import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { AiFillDelete } from 'react-icons/ai';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function HistoryTable() {
    const user_id = jwt_decode(localStorage.getItem("authTokens")).user_id;
    const navigate = useNavigate()

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}kge/`, { params: { user_id: user_id } })
            .then(res => {
                setData(res.data);
                setIsLoading(false);
            }).catch(err => { })
    }, [data])

    const history_page = (e) => {
        navigate('/kge', {
            state: { data_id: e }
        });
    }

    const delete_document = (e) => {
        axios.post(`${BACKEND_URL}kge/`, {
            data_id: e,
            delete: true
        }).then(res => {
            navigate('/home')
        })
    }
    return (
        <div className="h-full">
            <div className="w-full h-full  px-10">
                <div className="p-3 flex bg-gray-200 rounded-t-xl items-center">
                    <div className="w-1/6 px-3 text-gray-600 font-bold text-sm">
                        Date
                    </div>
                    <div className="w-3/6 px-3 text-gray-600 font-bold text-sm">
                        Text
                    </div>
                    <div className="w-1/6 px-3 text-gray-600 font-bold text-sm">
                        Status
                    </div>
                    <div className="w-1/6 px-3 text-gray-600 font-bold text-sm">

                    </div>
                </div>
                <div className="overflow-y-auto h-5/6">
                    {!isLoading &&
                        data.reverse().map((history, idx) => (
                            <div key={idx} className="h-16 flex w-full border items-center hover:bg-gray-200 hover:cursor-pointer bg-gray-100">
                                <div className="w-1/6 text-sm px-2 py-2 ">
                                    {history.date}
                                </div>
                                <div onClick={() => history_page(history.id)}  className="w-3/6 text-sm px-2 py-2 truncate">
                                    {history.text}
                                </div>
                                <div className={`w-1/6 text-sm px-2 py-2 rounded-lg  font-semibold flex align-center w-max cursor-pointer 
                                text-white active:bg-gray-300 transition duration-300 ease ${history.status === "Processed" ? "bg-green-500" : "bg-red-300"}`}>
                                    {history.status}
                                </div>
                                <div className="w-1/6 text-sm px-2 py-2 ">
                                    <div className="w-fit mx-auto">
                                        <button onClick={() => delete_document(history.id)}>
                                        <AiFillDelete size={'1.5em'} color="#D9534F" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>

    );
}

export { HistoryTable }