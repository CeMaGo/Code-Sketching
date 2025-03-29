const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  let x, y, w, h;

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    x = width * 0.5;
    y = height * 0.5;
    w = width * 0.6;
    h = height * 0.1;

    // start a draw
    context.save();

    context.translate(x, y);

    context.strokeStyle = "blue";

    context.beginPath();
    context.moveTo(w * -0.5, h * -0.5);
    context.lineTo(w * 0.5, h * -0.5);
    context.lineTo(w * 0.5, h * 0.5);
    context.lineTo(w * -0.5, h * 0.5);
    context.closePath();

    context.stroke();

    context.restore();
    // end a draw
  };
};

canvasSketch(sketch, settings);
