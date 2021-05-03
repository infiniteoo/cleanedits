import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    
  },
  gridContainer: {
    width: "100%",
    justifyContent: "center",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      
    },
  },
  container: {
    /* width: "600px", */
    margin: "5px 0",
    padding: 0,
    
    [theme.breakpoints.down("xs")]: {
      width: "80%",
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 0,
  },
  paper: {
    padding: "10px 20px",
    border: "2px solid black",
    marginRight: "10px",
    boxShadow: "20px 20px 20px 0 rgba(0,0,0)"
   
  },
}));

const InputForm = (props) => {
  
  const [email, setEmail] = useState("");
  const [totalTracks, setTotalTracks] = useState("");
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6" style={{fontFamily: 'Freckle Face', fontSize: "50px"}}>
                Your Info
              </Typography>
              
              <TextField 
                label="Email:" 
                fullWidth
                onChange={event => setEmail(event.target.value)}
              ></TextField>
              <TextField 
                label="# of Tracks:" 
                fullWidth
                onChange={event => setTotalTracks(event.target.value)}
              ></TextField>
              <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                className={classes.margin}
                onClick={() => {
                  props.setInfoEntered(true);
                  props.setNumOfEdits(totalTracks)
                  
                  props.setEmail(email)
                  console.log("totalTracks, name, email", totalTracks, email)
                }}
                
                > Submit </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default InputForm;
