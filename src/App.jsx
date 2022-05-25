import React from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import './App.css';

// import Home from './components/quizHome';
import Setup from './components/quizSetup'

function App() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [scoreCard, setScoreCard] = React.useState({
        screen1: null,
        screen2:null
    });

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSetScore = (score, screen) => {
        setScoreCard({...scoreCard, [screen]: score});
    }

  const open = Boolean(anchorEl);
    
    return (
        <main>
            <Grid container spacing={2}>
                <Grid items xs={12} >
                    <AppBar position="static">
                        <Toolbar>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Math Quiz App
                            </Typography>
                            <Button color = "inherit"  onClick={handleClick}>
                                Scorecard
                            </Button>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Typography sx={{ p: 2 }} component="div">
                                    <div class = "score-card">
                                        <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                Score
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                Screen 1
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                {scoreCard.screen1 === null ? "-" : scoreCard.screen1}
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                Screen 2
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                {scoreCard.screen2 === null ? "-" : scoreCard.screen2}
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                Total
                                                </Typography>
                                        </div>
                                         <div>
                                            <Typography sx={{ p: 2 }} component="div">
                                                {scoreCard.screen1 + scoreCard.screen2}
                                                </Typography>
                                        </div>
                                    </div>
                                </Typography>
                            </Popover>
                        </Toolbar>
                    </AppBar>
                </Grid>
                <Grid item xs className="left-grid">
                    <Setup screenNo={1} handleSetScore = {handleSetScore}/>
                </Grid>
                <Grid item xs>
                    <Setup screenNo={2} handleSetScore = {handleSetScore}/>
                </Grid>
            </Grid>
        </main>
    );
}

export default App;