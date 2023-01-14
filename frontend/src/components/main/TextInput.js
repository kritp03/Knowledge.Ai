import React from 'react';
import {
    TextField,
    Stack,
    Card,
    Box,
    Button,
    styled,
} from '@mui/material';
import { useState } from 'react';
import axios from "axios";
import jwt_decode from "jwt-decode";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

const TextCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FAFAFC',
    padding: '20px 0px 20px 0px',
    border: '2px solid #F0F2F6',
    borderRadius: '10px',
    marginTop: '30px',
}));

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
        <TextCard elevation={0}>
            <Box overflow="auto" sx={{ pt: 2, pl: 4, pb: 2, pr: 4 }}>
                <Stack spacing={2} alignItems="center" justifyContent="center">
                    <TextField
                        value={data} onChange={e => setData(e.target.value)}
                        label="Insert your text here"
                        multiline
                        fullWidth
                        rows={8}
                    />
                    <Button onClick={upload_data} variant="contained" color="success" style={{ width: "20%", marginTop: "2%" }}>Generate</Button>
                </Stack>
            </Box>
        </TextCard>
    );
}

export { TextInput }