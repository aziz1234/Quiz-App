import React, { useEffect, useState, useRef, useMemo } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Question from './question';
import ResultSheet from './resultSheet';
import QuizContext from '../store/quizContext';
import './quizHome.css';

function Home({ form, resetQuiz, screenNo, handleSetScore }) {

    const CLOCK_TIME = 20; // 10s for each question
    const [time, setTime] = useState(null);
    const [questionNo, setQuestionNo] = useState(0);
    const [operator, setOperator] = useState(null);
    const [operand, setOperand] = useState(null);
    const [score, setScore] = useState(0);
    const [resultSheet, setResultSheet] = useState([]); // Final Data set to be shown to User at the end
    const [showResult, setShowResult] = useState(false);
    const interval = useRef(null);

    // This var will store the user Input/ Answer
    const [currUserAns, setCurrUserAns] = useState('');
    const value = useMemo(
        () => ({ currUserAns, setCurrUserAns }),
        [currUserAns]
    );

    // This useEffect maintains the timer logic
    useEffect(() => {
        if (time !== null) {
            interval.current = setInterval(() => {
                if (interval.current)
                    clearInterval(interval.current);
                if (time > 0)
                    setTime(t => t - 1)
                else if (questionNo) {
                    evalAnswer();
                }
            }, 1000);
        }
        return () => clearInterval(interval.current);
    }, [time]);

    useEffect(() => {
        setNewParams();
    }, []);

    useEffect(() => {
        handleSetScore(score, 'screen'+screenNo);

        return () => handleSetScore(null, 'screen'+screenNo);
    }, [score])

    // Check if User's Answer Matches with Actual Answer
    const evalAnswer = () => {
        if(time === CLOCK_TIME) // prevent accidental clicks
            return;
        if (interval.current)
            clearInterval(interval.current);
        if (questionNo <= (form ?.totalQuestions ?? 10)) {
            let newQuestion = `${operand[0]} ${operator} ${operand[1]}`;
            let newAns = Number(eval(newQuestion).toFixed(2));
            let updatedResSheet = [...resultSheet];
            if (currUserAns !== '' && (Number(currUserAns) === newAns)) {
                updatedResSheet.push({
                    ques: newQuestion,
                    ans: newAns,
                    userAns: currUserAns,
                    correct: true
                })
                setScore(score + 1);
                setResultSheet(updatedResSheet);
            }
            else {
                updatedResSheet.push({
                    ques: newQuestion,
                    ans: newAns,
                    userAns: currUserAns,
                    correct: false
                });
                setResultSheet(updatedResSheet);
            }
        }
        setNewParams();
    }

    // Generate New Question when time runs out or user clicks Next
    const setNewParams = () => {
        if (questionNo < (form ?.totalQuestions ?? 10)) {
            if (interval.current)
                clearInterval(interval.current);
            let newOperator = form.operator
            if (newOperator === 'random') {
                let operatorArray = ['+', '-', '*', '/'];
                newOperator = operatorArray[Math.floor(Math.random() * Math.floor(4))];
            }
            let newOperand = [];
            for (let i = 0; i < 2; i++) {
                newOperand.push(Math.floor(Math.random() * Math.floor((form ?.totalOperands ?? 10))) + 1);
            }
            setOperator(newOperator);
            setOperand(newOperand);
            setQuestionNo(questionNo + 1);
            setTime(CLOCK_TIME);
        }
        else {
            setShowResult(true);
        }
    }

    // Reset the Quiz and take user to setup page
    const handleResetQuiz = () => {
        resetQuiz();
    }

    return (
        <>
            <QuizContext.Provider value={value}>
                {
                    !showResult ?
                        <Grid container spacing={4}>
                            <Grid container item spacing={1}>
                                <Grid item xs>
                                    <Typography variant="button" className = "score" gutterBottom component="div">
                                        Score: {score}/{form ?.totalQuestions ?? 10}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="h5" gutterBottom component="div">
                                        Question: {questionNo}/{form ?.totalQuestions ?? 10}
                                    </Typography>
                                </Grid>
                                <Grid item xs>
                                    <Typography variant="button" className = "time" gutterBottom component="div">
                                        Time: 00:{time < 10 ? `0${time}` : time}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} >
                                {operator && operator ?.length ?
                                    <Question operator={operator} operand={operand} /> : null}

                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={evalAnswer}>Next</Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Button variant="contained" onClick={handleResetQuiz}>Reset</Button>
                            </Grid>
                        </Grid>
                        :
                        <ResultSheet resultSheet={resultSheet} score={score} resetQuiz={resetQuiz} />
                }
            </QuizContext.Provider>
        </>
    );
}

export default Home;