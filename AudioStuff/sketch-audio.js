const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
};

let audio;
let audioContext, audioData, sourceNode, analyserNode;
let manager;

const sketch = () => {
  const numCircles = 5;
  const numSlices = 9;
  const slice = (Math.PI * 2) / numSlices;
  const radius = 200;

  //  const bins = [4, 12, 37];

  return ({ context, width, height }) => {
    console.log("slice:", slice);

    context.fillStyle = "#EEEAE0";
    context.fillRect(0, 0, width, height);

    // if (!audioContext) return;

    //analyserNode.getFloatFrequencyData(audioData);

    context.save();
    context.translate(width * 0.5, height * 0.5);

    for (let i = 0; i < numCircles; i++) {
      context.save();
      // context.rotate(slice);

      for (let j = 0; j < numSlices; j++) {
        context.lineWidth = 10;
        context.rotate(slice);

        // for the shape:
        context.beginPath();
        context.arc(0, 0, radius, 0, slice);
        context.stroke();
      }
      context.restore();
    }

    context.restore();

    // old loop simple circles

    /*   for (let i = 0; i < bins.length; i++) {
      const bin = bins[i];
      const mapped = math.mapRange(
        audioData[bin],
        analyserNode.minDecibels,
        analyserNode.maxDecibels,
        0,
        1,
        true,
      );

      const radius = Math.max(mapped * 300, 10);
      // const radius = mapped * 300;}*/
  };
};

const addListeners = () => {
  window.addEventListener("mouseup", () => {
    if (!audioContext) createAudio();

    if (audio.paused) {
      audio.play();
      manager.play();
    } else {
      audio.pause();
      manager.pause();
    }
  });
};

const createAudio = () => {
  audio = document.createElement("audio");
  audio.src = "audio/Ge Filter Fish - Baby Im Stuck in a Cone.mp3";

  audioContext = new AudioContext();

  sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect(audioContext.destination);

  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 512;
  analyserNode.smoothingTimeConstant = 0.9;
  sourceNode.connect(analyserNode);

  audioData = new Float32Array(analyserNode.frequencyBinCount);

  console.log("audioData:", audioData.length);
};

const getAverage = (data) => {
  let sum = 0;

  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }

  return sum / data.length;
};

const start = async () => {
  addListeners();
  manager = await canvasSketch(sketch, settings);
  manager.pause();
};

start();
