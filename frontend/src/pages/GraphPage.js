import React, { useState } from 'react';
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
import { useNavigate } from "react-router-dom";

const TextCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FAFAFC',
    padding: '15px',
    border: '2px solid #F0F2F6',
    borderRadius: '10px',
    marginTop: '20px',
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
                    marginTop: '30px',
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

function GraphPage() {
    const navigate = useNavigate();

    return (
        <div className='flex flex-row w-full'>
            <div className='w-2/5'>
                <div className='flex flex-col h-screen'>
                    <div className='h-1/10'>
                        <ThemeProvider theme={backButtonStyle}>
                            <Button onClick={() => {
                                navigate('/home')
                            }}>
                                <ArrowBackIcon />
                                Back
                            </Button>
                        </ThemeProvider>
                    </div>
                    <div className='h-7/10 h-screen'>
                        <TextCard>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginRight: '30px' }}>
                                <Title>Title of Text</Title>
                            </Stack>
                            <TitleDivider sx={{ borderBottomWidth: 0 }} />
                            The goal of reducing sequential computation also forms the foundation of the Extended Neural GPU
                            [16], ByteNet [18] and ConvS2S [9], all of which use convolutional neural networks as basic building
                            block, computing hidden representations in parallel for all input and output positions. In these models,
                            the number of operations required to relate signals from two arbitrary input or output positions grows
                            in the distance between positions, linearly for ConvS2S and logarithmically for ByteNet. This makes
                            it more difficult to learn dependencies between distant positions [12]. In the Transformer this is
                            reduced to a constant number of operations, albeit at the cost of reduced effective resolution due
                            to averaging attention-weighted positions, an effect we counteract with Multi-Head Attention as
                            described in section 3.2.
                            Self-attention, sometimes called intra-attention is an attention mechanism relating different positions
                            of a single sequence in order to compute a representation of the sequence. Self-attention has been
                            used successfully in a variety of tasks including reading comprehension, abstractive summarization,
                            textual entailment and learning task-independent sentence representations [4, 27, 28, 22].
                            End-to-end memory networks are based on a recurrent attention mechanism instead of sequencealigned recurrence and have been shown to perform well on simple-language question answering and
                            language modeling tasks [34].
                            To the best of our knowledge, however, the Transformer is the first transduction model relying
                            entirely on self-attention to compute representations of its input and output without using sequencealigned RNNs or convolution. In the following sections, we will describe the Transformer, motivate
                            self-attention and discuss its advantages over models such as [17, 18] and [9]
                        </TextCard>
                    </div>
                    <div className='h-1/10 mx-auto'>
                        <ThemeProvider theme={downloadGraphStyle}>
                            <Button>
                                <DownloadIcon />
                                Download Knowledge Map
                            </Button>
                        </ThemeProvider>
                    </div>
                    <div className='h-1/10 mx-auto  '>
                        <ReportIssue>
                            Report an issue
                        </ReportIssue>
                    </div>
                </div>
            </div>
            <div className='w-3/5'>
                <KnowledgeMap />
            </div>
        </div>
    );
}

export { GraphPage }