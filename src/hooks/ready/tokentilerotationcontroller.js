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
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Current log level is set to ${currentLogLevel}`);
  
  let zKeyDown = false; // Flag to check if z key is down
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Initial zKeyDown value is set to ${zKeyDown}`);

  // Log a message to the console when the core initialization is ready and game data is available
  Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, "Initializing the TokenTile TokenTileRotationController....");

  // Function to update the rotation of the item's mesh
  function updateTileAndTokenMeshRotation(item) {
    try {
      let rotation = calculateRotation(item);
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Calculated rotation of item to ${rotation}`);
      item.mesh.rotation = rotation; 
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Updated rotation of item to ${rotation}`);
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in updateTileAndTokenMeshRotation: ${error}`);
    }
  }

  // Function to update the rotation of the item's document
  function updateTileAndTokenDocumentRotation(item) {
    try {
      let rotation = calculateRotation(item);
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Calculated rotation of item to ${rotation}`);
      item.document.update({rotation: rotation});
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Updated rotation of item to ${rotation}`);
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in updateTileAndTokenDocumentRotation: ${error}`);
    }
  }

  // Function to calculate the rotation of the item
  function calculateRotation(item) {
    try {
      let dx = canvas.mousePosition.x - item.center.x;
      let dy = canvas.mousePosition.y - item.center.y;
      let angle = Math.atan2(dy, dx);
      let rotation = angle * (180 / Math.PI) + 90;
      if (rotation < 0) {
        rotation += 360;
      }
      return rotation;
    }
    catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in calculateRotation: ${error}`);
    }
  }
  
  // Event handlers
  function handleActivationKeyPressed(event) {
    try {
      if (event.key === 'z') {
        zKeyDown = true;
        Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `z key pressed. zKeyDown set to ${zKeyDown}`);
        updateMeshRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in keydown event listener: ${error}`);
    }
  }

  function handleActivationKeyReleased(event) {
    try {
      if (event.key === 'z') {
        zKeyDown = false;
        updateDocumentRotationForControlledItems();
        Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `z key released. zKeyDown set to ${zKeyDown}`);
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in keyup event listener: ${error}`);
    }
  }

  function handleMouseMove() {
    try {
      if (zKeyDown) {
        Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Mouse moved with z key down. Updating rotation for controlled items.`);
        updateMeshRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in mousemove event listener: ${error}`);
    }
  }

  // Functions to update rotation for controlled items
  function updateMeshRotationForControlledItems() {
    for (let item of [...canvas.tokens.controlled, ...canvas.tiles.controlled]) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Updating mesh rotation for controlled item.`);
      updateTileAndTokenMeshRotation(item);
    }
  }

  function updateDocumentRotationForControlledItems() {
    for (let item of [...canvas.tokens.controlled, ...canvas.tiles.controlled]) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.DEBUG, `Updating document rotation for controlled item.`);
      updateTileAndTokenDocumentRotation(item);
    }
  }

  // Function to initialize event listeners
  function initializeEventListeners() {
    try {
      document.addEventListener('keydown', handleActivationKeyPressed);
      document.addEventListener('keyup', handleActivationKeyReleased);
      canvas.app.view.addEventListener('mousemove', handleMouseMove);
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Event listeners initialized.`);
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in initializeEventListeners: ${error}`);
    }
  }

  // Return an object with the methods you want to expose
  return {
    initializeEventListeners
  };
})();

export default TokenTileRotationController;