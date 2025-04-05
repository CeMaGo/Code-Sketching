const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

let audio;

const sketch = () => {
  audio = document.createElement("audio");
  audio.src = "audio/Ge Filter Fish - Baby Im Stuck in a Cone.mp3";
  // audio.play();

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
  };
};

const addListeners = () => {
  window.addEventListener("mouseup", () => {
    audio.play();
  });
};

canvasSketch(sketch, settings);
