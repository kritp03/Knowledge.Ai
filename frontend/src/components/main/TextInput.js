import React from 'react';
import { useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

function TextInput() {

    const [data, setData] = useState("");
    const user_id = jwt_decode(localStorage.getItem("authTokens")).user_id;
    const upload_data = () => {
        if (data !== "") {
            axios.post(`${BACKEND_URL}kge/`, {
                user_id: user_id,
                data: data
            })
                .then(res => {
                    alert("Uploaded!")
                }).catch(err => { })
        } else {
            alert("Cannot upload empty content!")
        }
    }


    return (
        <div className='h-full'>
            <div className=' h-full py-2'>
                <div className='w-5/6 mx-auto h-4/6 items-center'>
                    <textarea className="h-full overflow-y-auto resize-none w-full border border-gray-400 rounded-md px-2 py-2 hover:border-purple text-black text-sm" value={data} onChange={e => setData(e.target.value)} />
                </div>
                <div className='pt-2 flex justify-center items-center'>
                    <button onClick={upload_data} className="text-white bg-theme items-center py-2 px-10  drop-shadow-md rounded-lg">GENERATE</button>
                </div>
            </div>
        </div>
        // <TextCard elevation={0}>
        //     <Box overflow="auto" sx={{ pt: 2, pl: 4, pb: 2, pr: 4 }}>
        //         <Stack spacing={2} alignItems="center" justifyContent="center">
        //             <TextField
        //                 value={data} onChange={e => setData(e.target.value)}
        //                 label="Insert your text here"
        //                 multiline
        //                 fullWidth
        //                 rows={8}
        //             />
        //             <Button onClick={upload_data} variant="contained" color="success" style={{ width: "20%", marginTop: "2%" }}>Generate</Button>
        //         </Stack>
        //     </Box>
        // </TextCard>
    );
}

export { TextInput }