import React from 'react';
import {
    Stack,
    styled,
    Card,
    ThemeProvider,
    Button,
    createTheme,
} from '@mui/material';
import { HistoryTable } from '../components/main/HistoryTable';
import { TextInput } from '../components/main/TextInput';
import AuthContext from '../context/AuthContext';
import { useContext } from "react";

const logoutButtonStyle = createTheme({
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#0C3B2E',
                    color: '#FFF',
                    fontSize: '0.875rem',
                    textTransform: 'capitalize',
                    borderRadius: '8px',
                    width: '100px',
                    '&:hover': {
                        backgroundColor: '#0A3529',
                        boxShadow: 'none',
                    },
                }
            }
        }
    },
});

const StyledCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FAFAFC',
    padding: '10px',
    border: '2px solid #F0F2F6',
    borderRadius: '10px',
    marginTop: '30px',
}));

function MainPage() {
    const { user, logoutUser } = useContext(AuthContext);
    return (
        <>
            <div className='flex flex-row'>
                <div className='w-1/5'>
                </div>
                <div className='flex flex-col w-3/5 ...'>
                    <div className='basis-1/3'>
                        <TextInput />
                    </div>
                    <div className='basis-2/3'>
                        <HistoryTable />
                    </div>
                </div>
                <div className='w-1/5'>
                    <div className='w-fit'>
                        <StyledCard>
                            <div className='flex flex-row h-full items-center'>
                                <div className='w-1/2'>
                                    Username12345
                                </div>
                                <div className='w-1/2'>
                                    <ThemeProvider theme={logoutButtonStyle}>
                                        <Button onClick={logoutUser}>
                                            Logout
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </div>
                        </StyledCard>
                    </div>
                </div>
            </div>
        </>
    )
}

export { MainPage }