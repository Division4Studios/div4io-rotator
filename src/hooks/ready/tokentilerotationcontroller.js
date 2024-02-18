/**
 * @file tokentilerotationcontroller.js
 * @description This file contains a function to update the rotation of a tile or token based on the cursor position.
 * It also sets up event listeners to trigger the rotation update when the z key is held down and the mouse is moved.
 */

/* global canvas */

import Div4LoggerModule from "../../div4loggermodule.js";

const TokenTileRotationController = (function() {
  // Variables
  const currentLogLevel = Div4LoggerModule.LogLevel.INFO; // Current log level
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Current log level is set to ${currentLogLevel}`, currentLogLevel);
  
  let zKeyDown = false; // Flag to check if z key is down
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Initial zKeyDown value is set to ${zKeyDown}`, currentLogLevel);

  // Log a message to the console when the core initialization is ready and game data is available
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, "Initializing the TokenTile TokenTileRotationController....", currentLogLevel);

  // Functions
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, "Defining updateTileAndTokenRotation function...", currentLogLevel);
  function updateTileAndTokenRotation(item) {
    try {
      // Calculate the angle between the item and the cursor
      let dx = canvas.mousePosition.x - item.center.x;
      let dy = canvas.mousePosition.y - item.center.y;
      let angle = Math.atan2(dy, dx);

      // Convert the angle to degrees, make it go clockwise, and adjust it to start from the top
      let rotation = angle * (180 / Math.PI) + 90;
      if (rotation < 0) {
        rotation += 360;
      }

      // Update the rotation of the item
      item.document.update({ rotation: rotation });
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Updated rotation of item to ${rotation}`, currentLogLevel);
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in updateTileAndTokenRotation: ${error}`, currentLogLevel);
    }
  }

  function handleActivationKeyPressed(event) {
    try {
      // If the key pressed is 'Control', set the flag to true and update rotation for controlled items
      if (event.key === 'Control') {
        zKeyDown = true;
        Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `z key pressed. zKeyDown set to ${zKeyDown}`, currentLogLevel);
        updateRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in keydown event listener: ${error}`, currentLogLevel);
    }
  }

  function handleActivationKeyReleased(event) {
    try {
      // If the key released is 'Control', set the flag to false
      if (event.key === 'Control') {
        zKeyDown = false;
        Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `z key released. zKeyDown set to ${zKeyDown}`, currentLogLevel);
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in keyup event listener: ${error}`, currentLogLevel);
    }
  }

  function handleMouseMove() {
    try {
      // If the z key is held down, update rotation for controlled items
      if (zKeyDown) {
        Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Mouse moved with z key down. Updating rotation for controlled items.`, currentLogLevel);
        updateRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in mousemove event listener: ${error}`, currentLogLevel);
    }
  }

  function updateRotationForControlledItems() {
    for (let item of [...canvas.tokens.controlled, ...canvas.tiles.controlled]) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Updating rotation for controlled item.`, currentLogLevel);
      updateTileAndTokenRotation(item);
    }
  }

  // Event Listeners
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, "Defining initializeEventListeners function...", currentLogLevel);
  function initializeEventListeners() {
    try {
      // Add event listeners for 'keydown', 'keyup', and 'mousemove' events
      document.addEventListener('keydown', handleActivationKeyPressed);
      document.addEventListener('keyup', handleActivationKeyReleased);
      canvas.app.view.addEventListener('mousemove', handleMouseMove);
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Event listeners initialized.`, currentLogLevel);

    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in initializeEventListeners: ${error}`, currentLogLevel);
    }
  }

  // Return an object with the methods you want to expose
  return {
    initializeEventListeners
  };
})();

export default TokenTileRotationController; // This line is required to expose the module to other modules
