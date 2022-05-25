import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Home from './quizHome';

// Setup based on which questions are generated
function QuizSetup({ screenNo, handleSetScore }) {

    const [start, setStart] = useState(false);
    const defaultVals = {
        totalQuestions: 10,
        totalOperands: 10,
        operator: 'random'
    }
    const [form, setForm] = useState(defaultVals);

    const handleChange = (e) => {
        let name = e.target.name;
        if (name) {
            setForm({ ...form, [name]: e.target.value });
        }
    }

    const handleStart = () => {
        setStart(true);
    }

    const resetQuiz = () => {
        setForm(defaultVals);
        setStart(false);
    }

    return (
        <>
            {!start ?
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& .MuiTextField-root': { width: '25ch' },
                    }}
                >
                    <Typography variant="h5" gutterBottom component="div">
                        Screen {screenNo}
                    </Typography>
                    <TextField
                        value={form.totalQuestions}
                        name='totalQuestions'
                        onChange={handleChange}
                        label='No of Questions'
                        type="number"
                        size="small"
                        margin="normal"
                    />
                    <TextField
                        value={form.totalOperands}
                        name='totalOperands'
                        onChange={handleChange}
                        label='Operands Range'
                        type="number"
                        size="small"
                        margin="normal"
                    />
                    <TextField
                        select
                        value={form.operator}
                        name='operator'
                        onChange={handleChange}
                        label='Operator'
                        size="small"
                        margin="normal"
                    >
                        <MenuItem value={'+'}>
                            +
            </MenuItem>
                        <MenuItem value={'-'}>
                            -
            </MenuItem>
                        <MenuItem value={'*'}>
                            *
            </MenuItem>
                        <MenuItem value={'/'}>
                            /
            </MenuItem>
                        <MenuItem value={'random'}>
                            Random
            </MenuItem>
                    </TextField>
                    <Button variant="contained" onClick={handleStart}>
                        Start
        </Button>
                </Box> :
                <Home form={form} resetQuiz={resetQuiz} screenNo = {screenNo} handleSetScore={handleSetScore}/>
            }
        </>
    );
}

export default QuizSetup
