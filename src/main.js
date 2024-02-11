/* global canvas */
import Handlebars from 'handlebars';

let template = Handlebars.compile("Hello {{name}}");
let result = template({name: "World"});
console.log(result);  // Outputs: "Hello World"

console.log("Hello World! This code runs immediately when the file is loaded.");

Hooks.on("init", function() {
  console.log("This code runs once the Foundry VTT software begins its initialization workflow.");
});

Hooks.on("ready", function() {
  console.log("This code runs once core initialization is ready and game data is available.");

 });
 let ctrlDown = false;

// Listen for the keydown and keyup events to track when the control key is held down
document.addEventListener('keydown', event => {
  if (event.key === 'Control') {
    ctrlDown = true;
  }
});

document.addEventListener('keyup', event => {
  if (event.key === 'Control') {
    ctrlDown = false;
  }
});

Hooks.on('canvasReady', () => {
  // Listen for the mousemove event to rotate the token
  canvas.app.view.addEventListener('mousemove', event => {
    if (ctrlDown && canvas.tokens.controlled.length > 0) {
      // Get the first controlled token
      let token = canvas.tokens.controlled[0];

      // Calculate the angle between the token and the cursor
      let dx = event.clientX - token.center.x;
      let dy = event.clientY - token.center.y;
      let angle = Math.atan2(dy, dx);

      // Convert the angle to degrees and rotate the token
      token.update({rotation: angle * (180 / Math.PI)});
    }
  });
});