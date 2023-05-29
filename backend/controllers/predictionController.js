const asyncHandler = require("express-async-handler");
const Prediction = require("../models/Prediction");
const { green } = require("colors");
const spawn = require("child_process").spawn;

const addPrediction = asyncHandler(async (req, res) => {
  var result;

  //rainCode Yes =0 / No = 1
  //whiteRootCode Yes =0 / No = 1
  //pestAttacksCode Yes =0 / No = 1

  const {
    width,
    age,
    temperature,
    rainCode,
    soilType,
    whiteRootCode,
    pestAttacksCode,
    floweringSeason,
  } = req.body;

  if (
    !width ||
    !age ||
    !temperature ||
    !rainCode ||
    !soilType ||
    !whiteRootCode ||
    !pestAttacksCode ||
    !floweringSeason
  ) {
    res.send(400).json({
      error: "Please fill all the fields",
    });
    throw new error("Please enter all the fields!!!");
  }
  
  console.log("Width "+width);
  console.log("age "+age);
  console.log("temperature "+temperature);
  console.log("rainCode "+rainCode);
  console.log("soilType "+soilType);
  console.log("whiteRootCode "+whiteRootCode);
  console.log("pestAttacksCode "+pestAttacksCode);
  console.log("floweringSeason "+floweringSeason);
  console.log(
    width,
    age,
    temperature,
    rainCode,
    soilType,
    whiteRootCode,
    pestAttacksCode,
    floweringSeason
  );

  const predictionResult = await Prediction.create({
    width,
    age,
    temperature,
    rainCode,
    soilType,
    whiteRootCode,
    pestAttacksCode,
    floweringSeason,
    result,
  });

  const option = {
    url: "./ML/main2.py",
    args: [
      width,
      age,
      temperature,
      rainCode,
      soilType,
      whiteRootCode,
      pestAttacksCode,
      floweringSeason,
    ],
  };

  if (predictionResult) {
    const pythonProcess = spawn("python", [
      option.url,
      option.args[0],
      option.args[1],
      option.args[2],
      option.args[3],
      option.args[4],
      option.args[5],
      option.args[6],
      option.args[7],
    ]);

    await pythonProcess.stdout.on("data", async (data) => {
      if (data) {

        const output = data.toString();
        const predictionRegex = /Prediction by model: \[\[(\d+\.\d+)\]\]/;
        const sendRegex = /(\d+)/;
        const predictionMatch = output.match(predictionRegex);
        const sendMatch = output.match(sendRegex);

        if (predictionMatch && sendMatch) {
          let finalValue;
          const prediction = parseFloat(predictionMatch[1]);
          const sendValue = parseInt(sendMatch[1]);
          console.log("Prediction by Model : ", prediction);
          if(prediction>0.5){
            finalValue=1;
          }
          else{
            finalValue=0;
          }
          console.log("Result : ", finalValue);

          result = finalValue.toString();

          console.log("ID : " + predictionResult._id);
          const updatePrediction = await Prediction.findByIdAndUpdate(
            predictionResult._id,
            {
              result: finalValue,
            },
            {
              new: true,
            }
          );

          if (updatePrediction) {

            if (width < 18) {
              res.status(201).json({
                _id: updatePrediction._id,
                result:"0",
                actualResult: updatePrediction.result,
                resultMessage: "Tree is not matured enough",
              });
            } 
            else if (age < 5) {
              res.status(201).json({
                _id: updatePrediction._id,
                result:"0",
                actualResult: updatePrediction.result,
                resultMessage: "Tree is not matured enough",
              });
            } 
            else if (temperature > 37) {
              res.status(201).json({
                _id: updatePrediction._id,
                result:"0",
                actualResult: updatePrediction.result,
                resultMessage: "Temperature should less than 37",
              });
            } 
            else if (updatePrediction.result==0) {
              res.status(201).json({
                _id: updatePrediction._id,
                result:"0",
                actualResult: updatePrediction.result,
                resultMessage: "Oops!, Tress is not ready for the innoculation",
              });
            } 
            else {
              res.status(201).json({
                _id: updatePrediction._id,
                result:"1",
                actualResult: updatePrediction.result,
                resultMessage: "Great! Tree is ready for the innoculation",
              });
            }
          } 
          else {
            res.status(404).json({
              result: "Result is not genarated",
            });
          }
        }
      }
    });

    // pythonProcess.stderr.on("data", (data) => {
    //   console.log(`error:${data}`);
    // });
  }
});

module.exports = {
  addPrediction,
  
};
