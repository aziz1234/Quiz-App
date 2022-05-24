import React from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';

// import Home from './components/quizHome';
import Setup from './components/quizSetup'

function App() {
  return (
    <main>
        <Grid container spacing ={2}>
            <Grid items xs = {12} >
                <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Math Quiz App
              </Typography>
            </Toolbar>
        </AppBar>
            </Grid>
            <Grid item xs className = "left-grid">
                <Setup screenNo = {1}/>
            </Grid>
            <Grid item xs>
                <Setup screenNo={2}/>
            </Grid>
        </Grid>
    </main>
  );
}

export default App;