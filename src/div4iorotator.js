// The main.js file is used to handle events in the Foundry VTT software

// ready hooks
import TokenTileRotationController from "./hooks/ready/tokentilerotationcontroller.js";

// The 'init' hook is triggered when the Foundry VTT software begins its initialization workflow
Hooks.on("init", function() {

});

// The 'ready' hook is triggered when the core initialization is ready and game data is available
Hooks.on("ready", function() {
  // Initialize the TokenTileRotationController
    TokenTileRotationController.initializeEventListeners();
});

