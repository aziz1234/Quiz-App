import React, {useEffect, useState, useRef, useMemo} from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Question from './question';
import ResultSheet from './resultSheet';
import QuizContext from '../store/quizContext';

function Home({form, resetQuiz}) {
    
    const [time, setTime] = useState(null);
    const [questionNo, setQuestionNo] = useState(0);
    const [operator, setOperator] = useState(null);
    const [operand, setOperand] = useState(null);
    const [score, setScore] = useState(0);
    const [resultSheet, setResultSheet] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const interval = useRef(null);

    // This var will store the user Input/ Answer
    const [currUserAns, setCurrUserAns] = useState('');
    const value = useMemo(
        () => ({currUserAns, setCurrUserAns}),
        [currUserAns]
    );

    useEffect(() => {
        if(time !== null) {
            interval.current = setInterval(() => {
                if(interval.current) 
                    clearInterval(interval.current);
                if(time>0)
                    setTime(t => t-1)
                else if(questionNo) {
                    evalAnswer();
                }
            },1000);
        }
        return () => clearInterval(interval.current);
    },[time]);

    useEffect(() => {
        setNewParams();
    },[]);

    const evalAnswer = () => {
        if(interval.current) 
                clearInterval(interval.current);
        if(questionNo <= (form?.totalQuestions ?? 10)) {
            let newQuestion = `${operand[0]} ${operator} ${operand[1]}`;
            let newAns = Number(eval(newQuestion).toFixed(2));
            let updatedResSheet = [...resultSheet];
            console.log(newAns)
            if(currUserAns !== '' && (Number(currUserAns) === newAns)) {
                updatedResSheet.push({
                    ques: newQuestion,
                    ans: newAns,
                    userAns: currUserAns,
                    correct: true
                })
                setScore(score+1);
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
    
    const setNewParams = () => {
        if(questionNo < (form?.totalQuestions ?? 10)) {
            if(interval.current) 
                clearInterval(interval.current);
            let newOperator = form.operator
            if(newOperator === 'random') {
                let operatorArray = ['+', '-', '*', '/'];
                newOperator = operatorArray[Math.floor(Math.random() * Math.floor(4))];
            }
            let newOperand = [];
            for(let i=0; i<2; i++) {
                 newOperand.push(Math.floor(Math.random() * Math.floor((form?.totalOperands ?? 10))) + 1);   
            }
            setOperator(newOperator);
            setOperand(newOperand);
            setQuestionNo(questionNo+1);
            if(time!== 10)
                setTime(10);
        }
        else {
            setShowResult(true);
        }
    }

    const handleResetQuiz = () => {
        resetQuiz();
    }
    
  return (
    <>
        <QuizContext.Provider value = {value}>
        {
        !showResult ?
        <Grid container spacing = {4}>
            <Grid container item spacing = {1}>
                <Grid item xs>
                    <Typography variant="button" gutterBottom component="div">
                    Score: {score}/{form?.totalQuestions?? 10}
                    </Typography>
                </Grid>
                <Grid item xs = {6}>
                    <Typography variant="h5" gutterBottom component="div">
                    Question: {questionNo}/{form?.totalQuestions?? 10}
                    </Typography>
                </Grid>
                <Grid item xs>
                    <Typography variant="button" gutterBottom component="div">
                    Time: 00:{time}
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} >
                {operator && operator?.length ?
                <Question operator = {operator} operand = {operand} /> : null}
                
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick = {evalAnswer}>Next</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" onClick = {handleResetQuiz}>Reset</Button>
            </Grid>
        </Grid> 
        : 
        <ResultSheet resultSheet={resultSheet} score = {score} resetQuiz = {resetQuiz}/> 
        }
        </QuizContext.Provider>
    </>
  );
}

export default Home;