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