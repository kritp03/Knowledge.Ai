import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import jwt_decode from "jwt-decode";

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
    }, [])

    const history_page = (e) => {
        navigate('/kge', {
            state: { data_id: e }
          });
    }
    return (
        <div className="h-full">
            <div className="w-full h-full bg-gray-100 px-10">
                <div className="h-1/6 flex bg-gray-200 rounded-xl items-center">
                    <div className="w-1/6 px-3 text-gray-600 font-bold text-sm">
                        Date
                    </div>
                    <div className="w-1/6 px-3 text-gray-600 font-bold text-sm">
                        Title
                    </div>
                    <div className="w-2/6 px-3 text-gray-600 font-bold text-sm">
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
                    data.map((history, idx) => (
                        <div key={idx} onClick={() => history_page(history.id)} className="h-16 flex w-full border items-center hover:bg-white hover:cursor-pointer">
                            <div className="w-1/6 text-sm px-2 py-2 ">
                                {history.date}
                            </div>
                            <div className="w-1/6 text-sm px-2 py-2 ">
                                {history.title}
                            </div>
                            <div className="w-2/6 text-sm px-2 py-2 truncate">
                                {history.text}
                            </div>
                            <div className="w-1/6 text-sm px-2 py-2 ">
                                {history.status}
                            </div>
                            <div className="w-1/6 text-sm px-2 py-2 ">
                                Delete
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>

    );
}

export { HistoryTable }