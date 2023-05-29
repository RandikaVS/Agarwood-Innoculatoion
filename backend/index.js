const spawn = require("child_process").spawn;
const pythonProcess = spawn('python',["E:/SubProjets/Agarwood/1121/backend/ML/main.ipynb", "1", "2"]);

pythonProcess.stdout.on("data", (data) => {
    if(data)console.log(data.toString());
  //console.log(data);
});