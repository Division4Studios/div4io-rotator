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
  canvas.app.view.addEventListener('mousemove', () => {
    if (ctrlDown) {
      // Loop through all controlled tokens and tiles
      for (let item of [...canvas.tokens.controlled, ...canvas.tiles.controlled]) {
        // Calculate the angle between the item and the cursor
        let dx = canvas.mousePosition.x - item.center.x;
        let dy = canvas.mousePosition.y - item.center.y;
        let angle = Math.atan2(dy, dx);
        console.log(angle);
        console.log(dx + " " + dy + " " + ((angle * (180/Math.PI) + 90)));

        // Convert the angle to degrees, make it go clockwise, and adjust it to start from the top
        let rotation = angle * (180 / Math.PI) + 90;
        if (rotation < 0) {
          rotation += 360;
        }
        item.document.update({rotation: rotation});
      }
    }
  });
});