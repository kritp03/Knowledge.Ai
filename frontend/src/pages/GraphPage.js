import React, { useEffect, useState } from 'react';
import { KnowledgeMap } from '../components/graph/KnowledgeMap';
import {
    styled,
    Card,
    ThemeProvider,
    Button,
    createTheme,
    Typography,
    Divider,
    Stack,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DownloadIcon from '@mui/icons-material/Download';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL


const TextCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FAFAFC',
    padding: '15px',
    border: '2px solid #F0F2F6',
    borderRadius: '10px',
    marginTop: '10px',
    height: '100%',
    fontSize: 16,
    fontWeight: 'semi-bold',
}));

const backButtonStyle = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#FFF',
                    color: '#0F1726',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    border: '1px solid #F0F2F6',
                    width: '100px',
                    boxShadow: 'none',
                    marginTop: '10px',
                    '&:hover': {
                        backgroundColor: '#EEEEF0',
                        boxShadow: 'none',
                    }
                }
            }
        }
    }
});

const downloadGraphStyle = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#66AA66',
                    color: '#FFF',
                    fontSize: '0.875rem',
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    width: '100%',
                    margin: '30px 0px 10px 0px',
                    '&:hover': {
                        backgroundColor: '#30592f',
                        boxShadow: 'none',
                    },
                }
            }
        }
    },
});

const Title = styled(Typography)(({ theme }) => ({
    fontWeight: '900',
    fontSize: '1.3rem',
    color: '#0F1726',
    padding: '0',
}));

const ReportIssue = styled(Typography)(({ theme }) => ({
    fontWeight: '900',
    fontSize: '0.8rem',
    color: '#0073FF',
    padding: '0',
}));

const TitleDivider = styled(Divider)(({ theme }) => ({
    marginTop: '15px',
    background: '#F4F3F7',
    width: '100%',
    height: '2px'
}));

const GraphPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [data, setData] = useState({});
    const id = params.id
    useEffect(() => {
        axios.get(`${BACKEND_URL}kge/${id}`)
            .then(res => {
                setData(res.data[0]);
            }).catch(err => { })
    }, [])

    return (
        <div className='flex flex-row w-full'>
            <div className='w-2/5 ml-5'>
                <div className='flex flex-col h-screen'>
                    <div className='h-5'>
                        <ThemeProvider theme={backButtonStyle}>
                            <Button onClick={() => {
                                navigate('/home')
                            }}>
                                <ArrowBackIcon />
                                Back
                            </Button>
                        </ThemeProvider>
                    </div>
                    <div className='h-85'>
                        <TextCard className="relative">
                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                <Title>Title of Text</Title>
                            </Stack>
                            <TitleDivider sx={{ borderBottomWidth: 0 }} />
                            <div className='text-justify overflow-y-auto h-[90%]'>
                                {data.text}
                            </div>
                            <TitleDivider sx={{ borderBottomWidth: 0 }} className="absolute bottom-7" />
                            <Stack direction="row" className="justify-center">
                                <ReportIssue className='absolute bottom-1'>Report an issue</ReportIssue>
                            </Stack>
                        </TextCard>
                    </div>
                    <div className='h-10 mx-auto'>
                        <ThemeProvider theme={downloadGraphStyle}>
                            <Button>
                                <DownloadIcon />
                                Download Knowledge Map
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </div>
            <div className='w-3/5'>
                <KnowledgeMap data_json={data.text_json}/>
            </div>
        </div>
    );
}

export { GraphPage }