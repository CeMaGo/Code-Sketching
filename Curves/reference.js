const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1080, 1080],
  animate: true, // Keeps the canvas updating smoothly
};

let elCanvas;
let points;
let manager;

const sketch = ({ canvas }) => {
  points = [
    new Point({ x: 200, y: 540 }),
    new Point({ x: 400, y: 300, control: true }),
    new Point({ x: 880, y: 540 }),
    new Point({ x: 600, y: 700 }),
    new Point({ x: 640, y: 900 }),
  ];

  elCanvas = canvas;
  elCanvas.addEventListener("mousedown", onMouseDown);

  return ({ context, width, height }) => {
    // Clear the canvas
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Draw straight lines connecting points
    context.strokeStyle = "#999";
    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      context.lineTo(points[i].x, points[i].y);
    }
    context.stroke();

    // Draw smooth curves
    context.beginPath();
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];

      const mx = curr.x + (next.x - curr.x) * 0.5;
      const my = curr.y + (next.y - curr.y) * 0.5;

      if (i === 0) context.moveTo(curr.x, curr.y);
      else if (i === points.length - 2)
        context.quadraticCurveTo(curr.x, curr.y, next.x, next.y);
      else context.quadraticCurveTo(curr.x, curr.y, mx, my);
    }
    context.lineWidth = 4;
    context.strokeStyle = "magenta";
    context.stroke();

    // Draw points
    points.forEach((point) => point.draw(context));
  };
};

const onMouseDown = (e) => {
  window.addEventListener("mousemove", onMouseMove);
  window.addEventListener("mouseup", onMouseUp);

  const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
  const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

  let hit = false;
  points.forEach((point) => {
    point.isDragging = point.hitTest(x, y);
    if (point.isDragging) {
      console.log("Dragging point at:", point.x, point.y);
      hit = true;
    }
  });

  if (!hit) {
    console.log("Adding new point at:", x, y);
    points.push(new Point({ x, y }));
  }
};

const onMouseMove = (e) => {
  const x = (e.offsetX / elCanvas.offsetWidth) * elCanvas.width;
  const y = (e.offsetY / elCanvas.offsetHeight) * elCanvas.height;

  let moved = false;
  points.forEach((point) => {
    if (point.isDragging) {
      point.x = x;
      point.y = y;
      moved = true;
    }
  });

  if (moved && manager) {
    manager.render(); // Properly request a redraw instead of restarting the sketch
  }
};

const onMouseUp = () => {
  window.removeEventListener("mousemove", onMouseMove);
  window.removeEventListener("mouseup", onMouseUp);
};

// Run the sketch and store the manager
canvasSketch(sketch, settings).then((m) => {
  manager = m;
});

class Point {
  constructor({ x, y, control = false }) {
    this.x = x;
    this.y = y;
    this.control = control;
    this.isDragging = false; // Track dragging state
  }

  draw(context) {
    context.save();
    context.translate(this.x, this.y);
    context.fillStyle = this.control ? "red" : "black";

    context.beginPath();
    context.arc(0, 0, 10, 0, Math.PI * 2);
    context.fill();

    context.restore();
  }

  hitTest(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;
    const dd = Math.sqrt(dx * dx + dy * dy);
    return dd < 20;
  }
}
