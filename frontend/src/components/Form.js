import { Grid} from "@mui/material";
import React, { useState, useEffect } from "react";
import "./Form.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useHistory } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";

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
  

    return (
      <div>



            <Grid
             component="form"
             noValidate
             onSubmit={handleSubmit}
             
             sx={{maxHeight:"70vh"}}
             >

            <Grid item xs={8} md={8}>

            <Grid item xs={12} md={12}>
              <TextField
                id="filled-number"
                label="With of the Tree"
                type="number"
                style={{ width: "30vw", marginTop: "50px" }}
                onChange={(e) => setWidth(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                id="filled-number"
                label="Age"
                type="number"
                style={{ width: "30vw", marginTop: "50px" }}
                onChange={(e) => setAge(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <TextField
                id="filled-number"
                label="Temperature"
                type="number"
                style={{ width: "30vw", marginTop: "50px" }}
                onChange={(e) => setTemperature(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                id="clear-on-escape"
                options={rain}
                clearOnEscape
                style={{ width: "30vw", marginTop: "30px", marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Rain Expected in two weeks"
                    variant="filled"
                  />
                )}
                onChange={(event, newValue) => {
                  setRainIn2Weeks(newValue);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                id="clear-on-escape"
                options={sType}
                clearOnEscape
                style={{ width: "30vw", marginTop: "30px", marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Soil type"
                    variant="filled"
                  />
                )}
                onChange={(event, newValue) => {
                  setSoilType(newValue.code);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                id="clear-on-escape"
                options={wRoots}
                clearOnEscape
                style={{ width: "30vw", marginTop: "30px", marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField {...params} label="White Roots" variant="filled" />
                )}
                onChange={(event, newValue) => {
                  setWhiteRoots(newValue);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                id="clear-on-escape"
                options={pAttacks}
                clearOnEscape
                style={{ width: "30vw", marginTop: "30px", marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pest Attacks"
                    variant="filled"
                  />
                )}
                onChange={(event, newValue) => {
                  setPestAttacks(newValue);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Autocomplete
                id="clear-on-escape"
                options={fSeason}
                clearOnEscape
                style={{ width: "30vw", marginTop: "30px", marginLeft: "15px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Flowering Season"
                    variant="filled"
                  />
                )}
                onChange={(event, newValue) => {
                  setFloweringSeason(newValue.code);
                }}
              />
            </Grid>

            <Grid item xs={12} md={12}>
              <Button
                variant="contained"
                type="submit"
                style={{
                  width: "30vw",
                  marginTop: "50px",
                  marginBottom: "50px",
                }}
              >
                Prediction
              </Button>
            </Grid>

            </Grid>

            <Grid item xs={4} md={4}>
                hi
            </Grid>

            </Grid>


      </div>
    );
  }

export default Form;