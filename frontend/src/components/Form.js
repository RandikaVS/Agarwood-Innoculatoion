import { Grid} from "@mui/material";
import React, { useState, useEffect,useRef } from "react";
import "./Form.css";
import axios from "axios";
import Swal from "sweetalert2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider,styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';



const rain = [
  { label: "Yes", code: "1" },
  { label: "No", code: "0" },
];
const wRoots = [
  { label: "Yes", code: "1" },
  { label: "No", code: "0" },
];
const pAttacks = [
  { label: "Yes", code: "1" },
  { label: "No", code: "0" },
];
const sType = [
  { label: "Red-Yellow", code: "0" },
  { label: "Reddish-Brown", code: "1" },
  { label: "Noncalic-Brown", code: "2" }
];
const fSeason = [
  { label: "Yes", code: "1" },
  { label: "No", code: "0" },
];

const StyledAutocomplete = styled(Autocomplete)({
  "& .MuiAutocomplete-inputRoot": {
    color: "white",
  }
});

const Form = () => {

  const [width, setWidth] = useState();
  const [age, setAge] = useState();
  const [temperature, setTemperature] = useState();
  const [rainIn2Weeks, setRainIn2Weeks] = useState();
  const [soilType, setSoilType] = useState();
  const [whiteRoots, setWhiteRoots] = useState();
  const [pestAttacks, setPestAttacks] = useState();
  const [floweringSeason, setFloweringSeason] = useState();

    const handleSubmit = async (event) => {
      event.preventDefault();
      var isSuccess = true;

    console.log(rainIn2Weeks);
      if (!width) {
        Swal.fire({
          title: "Error!",
          text: "Please enter width !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!age) {
        Swal.fire({
          title: "Error!",
          text: "Please enter age !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!temperature) {
        Swal.fire({
          title: "Error!",
          text: "Please enter temperature !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!rainIn2Weeks) {
        Swal.fire({
          title: "Error!",
          text: "Please enter rain in 2 Weeks !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!soilType) {
        Swal.fire({
          title: "Error!",
          text: "Please enter soil type !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!whiteRoots) {
        Swal.fire({
          title: "Error!",
          text: "Please enter white roots !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!pestAttacks) {
        Swal.fire({
          title: "Error!",
          text: "Please enter pest attacks !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }
      if (!floweringSeason) {
        Swal.fire({
          title: "Error!",
          text: "Please enter flowering season !!!",
          icon: "error",
          confirmButtonText: "Ok",
          confirmButtonColor: "red",
        });
        isSuccess = false;
      }

      if (isSuccess) {

        const rainCode = rainIn2Weeks.code;
        const whiteRootCode = whiteRoots.code;
        const pestAttacksCode = pestAttacks.code;
        const soiltypecode = soilType.code;
        const ftypecode = floweringSeason.code;
        setFloweringSeason(floweringSeason.code);
        setSoilType(soilType.code);
        
        console.log("Rain"+rainCode);
        console.log("Rain" + whiteRootCode);
        console.log("Rain" + pestAttacksCode);
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          const { data } = await axios.post(
            "http://localhost:5000/api/prediction",
            {
              width,
              age,
              temperature,
              rainCode,
              soilType,
              whiteRootCode,
              pestAttacksCode,
              floweringSeason,
            },

            config
          );
          console.log(data);

          if(data.result==="1"){
            Swal.fire({
              title: data.resultMessage ? data.resultMessage : null,
              text: "Prediction Result is : " + data.actualResult,
              width: 600,
              padding: "3em",
              color: "#6ddd6a",
              icon: "success",
              confirmButtonText: "Close",
              background: "#fff url(/images/trees.png)",
              backdrop: `
                rgba(0,255,0,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `,
            });
          }
          else{

            Swal.fire({
              title: data.resultMessage ? data.resultMessage : null,
              text: "Prediction Result is : " + data.actualResult,
              width: 600,
              padding: "3em",
              color: "#dd6a6a",
              icon: "error",
              confirmButtonText: "Close",
              background: "#fff url(/images/trees.png)",
              backdrop: `
                rgba(255,0,0,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
              `,
            });
        }

        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.error,
            footer: '<a href="">Why do I have this issue?</a>',
          });

          console.log(`Error occured ${error}`);
          console.log(error);
        }
      }

  }
  

  const defaultTheme = createTheme({
    
    palette: {
      white: {
        main: '#ffffff',
        contrastText: '#ffffff',
      },
    },
  });

  const inputStyle = {
    color: '#ffffff', // Change the color to your desired color
  };

  
    return (
      <div>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
            <AppBar
              sx={{
                position: 'absolute',
                borderBottom: (t) => `1px solid ${t.palette.divider}`,
                backgroundColor:"white",
                opacity:0.5,
                boxShadow:"black"
              }}
              overlayStyle={{backgroundColor: 'transparent'}}
            >
        
            <Toolbar>
              <Typography variant="h6" color="black" noWrap sx={{ml:5}}>
                Agarwood
              </Typography>
            </Toolbar>
          </AppBar>

          <Avatar 
          sx={{
            backgroundColor:"black",
            position: 'absolute',
            mt:1.4,
            ml:2}} 
          alt="Cindy Baker" 
          src="https://res.cloudinary.com/cake-lounge/image/upload/v1685529590/Pngtree_digital_leaf_tree_company_logo_5075871_cyugx9.jpg" 
          />


            <Grid
             container component="main"
              sx={{
                backgroundImage:
                  "url(https://res.cloudinary.com/cake-lounge/image/upload/v1685946554/ag1_e3v0dx.jpg)",
                backgroundRepeat: "no-repeat",
                backgroundColor: (t) =>
                  t.palette.mode === "light"
                    ? t.palette.grey[50]
                    : t.palette.grey[900],
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight:"100vh"
              }}
             >

            <Grid
                item
                xs={12}
                sm={6}
                md={7}
                elevation={6}
                square
                sx={{backgroundColor:"transparent"}}
                overlayStyle={{backgroundColor: 'transparent'}}
                
              >
          
              <TextField
                id="filled-number"
                label="With of the Tree"
                type="number"
                sx={{ width: "30vw", marginTop: "150px"}}
                onChange={(e) => setWidth(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                color="white"
                focused
                inputProps={{ style: inputStyle }}
              />

              <TextField
                id="filled-number"
                label="Age"
                type="number"
                style={{ width: "30vw", marginTop: "10px" }}
                onChange={(e) => setAge(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                color="white"
                focused
                inputProps={{ style: inputStyle }}
              />

              <TextField
                id="filled-number"
                label="Temperature"
                type="number"
                style={{ width: "30vw", marginTop: "10px",backgroundColor:'transparent' }}
                onChange={(e) => setTemperature(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="standard"
                color="white"
                focused
                inputProps={{ style: inputStyle }}
              />

              <StyledAutocomplete
                id="clear-on-escape"
                options={rain}
                clearOnEscape
                className="custom-autocomplete"
                style={{ width: "30vw", marginTop: "10px", marginLeft: "218px",backgroundColor:'transparent' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rain Expected in two weeks"
                    variant="standard"
                    color="white"
                    focused
                    
                  />
                )}
                onChange={(event, newValue) => {
                  setRainIn2Weeks(newValue);
                }}
              />

              <StyledAutocomplete
                id="clear-on-escape"
                options={sType}
                clearOnEscape
                style={{ width: "30vw", marginTop: "10px", marginLeft: "218px",backgroundColor:'transparent'  }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Soil type"
                    variant="standard"
                    color="white"
                    focused
                  />
                )}
                onChange={(event, newValue) => {
                  setSoilType(newValue.code);
                }}
              />

              <StyledAutocomplete
                id="clear-on-escape"
                options={wRoots}
                clearOnEscape
                style={{ width: "30vw", marginTop: "10px", marginLeft: "218px",backgroundColor:'transparent' }}
                renderInput={(params) => (
                  <TextField {...params} label="White Roots" 
                  variant="standard"
                  color="white"
                  focused 
                  />
                )}
                onChange={(event, newValue) => {
                  setWhiteRoots(newValue);
                }}
              />

              <StyledAutocomplete
                id="clear-on-escape"
                options={pAttacks}
                clearOnEscape
                style={{ width: "30vw", marginTop: "10px", marginLeft: "218px",backgroundColor:'transparent' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pest Attacks"
                    variant="standard"
                    color="white"
                    focused
                  />
                )}
                onChange={(event, newValue) => {
                  setPestAttacks(newValue);
                }}
              />

              <StyledAutocomplete
                id="clear-on-escape"
                options={fSeason}
                clearOnEscape
                style={{ width: "30vw", marginTop: "10px", marginLeft: "218px",backgroundColor:'transparent' }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Flowering Season"
                    variant="standard"
                    color="white"
                    focused
                  />
                )}
                onChange={(event, newValue) => {
                  setFloweringSeason(newValue.code);
                }}
              />
            

              <Button
                variant="contained"
                onClick={handleSubmit}
                style={{
                  width: "30vw",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
              >
                Prediction
              </Button>

            </Grid>

            <Grid
              item
              xs={false}
              sm={6}
              md={5}
              sx={{
                backgroundColor: "none",
              }}
            >
              <div style={{ fontWeight: "bold", marginTop: "100px" }} id="banner_id">
                
              <Avatar
                alt="Agarwood"
                src="https://res.cloudinary.com/cake-lounge/image/upload/v1685529590/Pngtree_digital_leaf_tree_company_logo_5075871_cyugx9.jpg"
                sx={{ width: 300, height: 300,ml:10 }}
              />

              </div>
              
            </Grid>

        </Grid>

     </ThemeProvider>
    </div>
  );
}

export default Form;