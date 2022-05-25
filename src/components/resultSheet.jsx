import React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import './resultSheet.css';

// Show the Final Summary in Tabular format
const ResultSheet = ({ resultSheet, score, resetQuiz }) => {

    const handleResetQuiz = () => {
        resetQuiz();
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h5" gutterBottom component="div">
                        Result Summary
                    </Typography>
                </Grid>
                <Grid item xs>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Sr No</TableCell>
                                    <TableCell>Question</TableCell>
                                    <TableCell align="right">Correct Answer</TableCell>
                                    <TableCell align="right">Your Answer</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {resultSheet.map((res, index) => (
                                    <TableRow className={res.correct ? 'correct' : 'incorrect'} key={index}>
                                         <TableCell>
                                            {index+1+")"}
                                        </TableCell>
                                        <TableCell>
                                            {res.ques}
                                        </TableCell>
                                        <TableCell align="right">
                                            {res.ans}
                                        </TableCell>
                                        <TableCell align="right">
                                            {res.userAns === "" ? "-": userAns}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12}>
                    Score: {`${score}/${resultSheet.length}`}
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" onClick={handleResetQuiz}>Reset</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default ResultSheet;