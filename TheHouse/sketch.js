const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [800, 800],
  animate: true,
  fps: 30,
};

const sketch = ({ context, width, height }) => {
  let x = 0;
  let y = 0;

  // Make Canvas
  context.fillStyle = "white";
  context.fillRect(0, 0, width, height);

  return ({ context, width, height, frame }) => {
    if (frame > 136) {
      return;
    }
    x += 10;

    if (x > 460) {
      y += 240;
      x = 0;
    }

    // re-diffine fillStyle
    context.fillStyle = frame % 2 ? "black" : "orange";
    context.strokeStyle = context.fillStyle;

    // Set Line width
    context.lineWidth = 10;

    // Wall
    context.strokeRect(x + 75, y + 140, 150, 110);

    // Door
    context.fillRect(x + 130, y + 190, 40, 60);

    //Roof
    context.beginPath();
    context.moveTo(x + 50, y + 140);
    context.lineTo(x + 150, y + 60);
    context.lineTo(x + 250, y + 140);
    context.closePath();
    context.stroke();
  };
};

canvasSketch(sketch, settings);
