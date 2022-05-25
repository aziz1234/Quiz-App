import React, { useEffect, useState, useRef, useContext } from 'react';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';

import QuizContext from '../store/quizContext';


function Question({ operator, operand }) {

    const [userAnswer, setUserAnswer] = useState(null);
    const [question, setQuestion] = useState(null);
    // const answer = useRef('');

    const { currUserAns, setCurrUserAns } = useContext(QuizContext);

    useEffect(() => {
        let newQuestion = `${operand[0]} ${operator} ${operand[1]}`;
        setQuestion(newQuestion);
        setUserAnswer('');
        setCurrUserAns('');
        // answer.current = eval(newQuestion).toFixed(2)
    }, [operand]);

    const handleInputChange = (e) => {
        setUserAnswer(e.target.value);
        setCurrUserAns(e.target.value);
    }

    return (
        <>
            <Grid item xs style={{ marginBottom: '10vh' }}>
                <Typography variant="h6" component="div">
                    {question} =
            </Typography>
            </Grid>
            <Grid item xs>
                <Input value={userAnswer} placeholder="Answer" type="number" onChange={handleInputChange} />
            </Grid>
        </>
    );
}

export default Question;