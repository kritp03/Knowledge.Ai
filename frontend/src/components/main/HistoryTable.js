import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Card,
    Box,
    Chip,
    ThemeProvider,
    createTheme,
    styled,
} from '@mui/material';

const processSuccessful = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: '13px',
                    backgroundColor: '#e6f9f0',
                    color: '#00BA34',
                    borderRadius: '16px',
                    paddingLeft: '5px',
                },

            }
        },
    }
});

const processFailed = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: '13px',
                    backgroundColor: '#fed1f9',
                    color: '#be29ec',
                    borderRadius: '16px',
                    paddingLeft: '5px',
                }
            }
        }
    }
});

const deleteStyle = createTheme({
    components: {
        MuiChip: {
            styleOverrides: {
                root: {
                    fontSize: '13px',
                    backgroundColor: '#FFE3EB',
                    color: '#FF2C2C',
                    borderRadius: '16px',
                    paddingLeft: '5px',
                },
                icon: {
                    color: '#FF2C2C',
                    fontSize: '18px'
                }
            }
        }
    }
});

const TableCard = styled(Card)(({ theme }) => ({
    backgroundColor: '#FAFAFC',
    padding: '20px 0px 20px 0px',
    border: '2px solid #F0F2F6',
    borderRadius: '10px',
    marginTop: '30px',
}));

const StyledHeaderCell = styled(TableCell)(({ theme }) => ({
    fontWeight: '700',
    fontSize: '0.9rem',
    color: "#3b5998",
    borderBottom: 'none',
}));

const StyledBodyCell = styled(TableCell)(({ theme }) => ({
    fontWeight: '700',
    lineHeight: '1.57143',
    fontSize: '0.875rem',
    color: '#0F1726',
}));

const tableHeaderStyle = createTheme({
    components: {
        MuiTableCell: {
            styleOverrides: {
                root: {
                    backgroundColor: '#F5F5F5',
                    "&:first-child": {
                        borderTopLeftRadius: "20px",
                        borderBottomLeftRadius: "20px"
                      },
                      "&:last-child": {
                        borderTopRightRadius: "20px",
                        borderBottomRightRadius: "20px"
                      }
                }
            }
        },
    },
});


function HistoryTable() {

    const navigate = useNavigate();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [historyData, setHistoryData] = useState([
        {
            id: 0,
            title: 'Title 1',
            date: '12/11/2021 16:23',
            status: 'Successful',
            text: "Lorem Ipsum...",
        },
        {
            id: 1,
            title: 'Title 2',
            date: '23/12/2021 12:01',
            status: 'Unsuccessful',
            text: "Lorem Ipsum...",
        },
        {
            id: 2,
            title: 'Title 3',
            date: '12/11/2021 11:10',
            status: 'Successful',
            text: "Lorem Ipsum...",
        },
        {
            id: 3,
            title: 'Title 4',
            date: '23/12/2021 10:24',
            status: 'Unsuccessful',
            text: "Lorem Ipsum...",
        },
        {
            id: 4,
            title: 'Title 5',
            date: '12/11/2021 9:50',
            status: 'Successful',
            text: "Lorem Ipsum...",
        },
        {
            id: 5,
            title: 'Title 6',
            date: '23/12/2021 22:54',
            status: 'Unsuccessful',
            text: "Lorem Ipsum...",
        },
    ])

    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleSelectedRow = (id) => {
        console.log(id);
        navigate('/graph', {
            state: { data_id: id }
        })
    }
    
    return(
        <TableCard elevation={0}>
            {/* <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ marginRight: '30px' }}>
                <Title>History</Title>
            </Stack> */}
            {/* <TitleDivider sx={{ borderBottomWidth: 0 }} /> */}
            <Box overflow="auto" sx={{ pt: 2, pl: 4, pb: 2, pr: 4 }}>
                <Table elevation={0}>
                    <ThemeProvider theme={tableHeaderStyle}>
                        <TableHead>
                            <TableRow>
                                <StyledHeaderCell>Date</StyledHeaderCell>
                                <StyledHeaderCell>Title</StyledHeaderCell>
                                <StyledHeaderCell>Text</StyledHeaderCell>
                                <StyledHeaderCell>Status</StyledHeaderCell>
                                <StyledHeaderCell></StyledHeaderCell>
                            </TableRow>
                        </TableHead>
                    </ThemeProvider>
                    <TableBody>
                        {historyData
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((item, index) => (
                            <TableRow key={index}  onClick={() => handleSelectedRow(item.id)} style={{cursor: 'pointer'}} hover>
                                <StyledBodyCell>{item.date}</StyledBodyCell>
                                <StyledBodyCell>{item.title}</StyledBodyCell>
                                <StyledBodyCell>{item.text}</StyledBodyCell>
                                <StyledBodyCell>
                                    {item.status == 'Successful' ? (
                                        <ThemeProvider theme={processSuccessful}>
                                            <Chip label="Processed" sx={{padding: 0}} />
                                        </ThemeProvider>
                                    ) : (
                                        <ThemeProvider theme={processFailed}>
                                            <Chip label="Not Processed" sx={{padding: 0}} />
                                        </ThemeProvider>
                                    )}
                                </StyledBodyCell>
                                <StyledBodyCell>
                                    <ThemeProvider theme={deleteStyle}>
                                        <Chip onClick="" icon={<DeleteIcon />} sx={{'& .MuiChip-label': {padding: 1}}} clickable/>
                                    </ThemeProvider>
                                </StyledBodyCell>
                            </TableRow>
                            ))}
                    </TableBody>
                </Table>

                <TablePagination
                    sx={{ px: 2 }}
                    page={page}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    count={historyData.length}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    nextIconButtonProps={{ "aria-label": "Next Page" }}
                    backIconButtonProps={{ "aria-label": "Previous Page" }}
                />
            </Box>
        </TableCard>
    );
}

export { HistoryTable }