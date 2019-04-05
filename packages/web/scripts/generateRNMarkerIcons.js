const fs = require("fs");
const { convert } = require("convert-svg-to-png");

const colors = [
  { key: "bauxite", value: "#AA6B51" },
  { key: "caterium", value: "#AF7C15" },
  { key: "coal", value: "#343434" },
  { key: "copper", value: "#AA4922" },
  { key: "iron", value: "#708090" },
  { key: "limestone", value: "#AA8F00" },
  { key: "oil", value: "#1C2A43" },
  { key: "quartz", value: "#8F2E53" },
  { key: "sam", value: "#263B41" },
  { key: "sulfur", value: "#483C0C" },
  { key: "uranium", value: "#6FA54A" }
];

const BASE_COLOR = "#AA8F00";
const pureIconString = fs
  .readFileSync(__dirname + "/icons/pure.svg")
  .toString();
const normalIconString = fs
  .readFileSync(__dirname + "/icons/normal.svg")
  .toString();
const impureIconString = fs
  .readFileSync(__dirname + "/icons/impure.svg")
  .toString();

const options = {
  height: 82,
  width: 52
};

colors.map(async color => {
  const [purePng, normalPng, impurePng] = await Promise.all([
    convert(pureIconString.replace(/#AA8F00/g, color.value), options),
    convert(normalIconString.replace(/#AA8F00/g, color.value), options),
    convert(impureIconString.replace(/#AA8F00/g, color.value), options)
  ]);

  await Promise.all([
    new Promise(r =>
      fs.writeFile(`${__dirname}/output/${color.key}_pure.png`, purePng, r)
    ),
    new Promise(r =>
      fs.writeFile(`${__dirname}/output/${color.key}_normal.png`, normalPng, r)
    ),
    new Promise(r =>
      fs.writeFile(`${__dirname}/output/${color.key}_impure.png`, impurePng, r)
    )
  ]);
});
