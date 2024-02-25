/**
 * @file TokenTileRotationController.js
 * @description This file contains a function to update the rotation of a tile or token based on the cursor position.
 * It also sets up event listeners to trigger the rotation update when the z key is held down and the mouse is moved.
 * The rotation is calculated in both degrees and radians.
 * The code has been refactored for better readability and adherence to SOLID principles.
 */

/* global canvas */

import Div4LoggerModule from "../../div4loggermodule.js";

const TokenTileRotationController = (function() {

  // Current log level for debugging
  let currentLogLevel = Div4LoggerModule.LogLevel.INFO;

  // Flag to check if z key is down
  let zKeyDown = false;

  // Function to calculate the rotation of the item in radians
  function calculateRotationInRadians(item) {
    let dx = canvas.mousePosition.x - item.center.x;
    let dy = canvas.mousePosition.y - item.center.y;
    let angle = Math.atan2(dy, dx);
    let offset = 90 * (Math.PI / 180); 
    let rotationInRadians = angle + offset;
    return rotationInRadians;
  }

  // Function to calculate the rotation of the item in degrees
  function calculateRotationInDegrees(item) {
    let dx = canvas.mousePosition.x - item.center.x;
    let dy = canvas.mousePosition.y - item.center.y;
    let angle = Math.atan2(dy, dx);
    let rotationInDegrees = angle * (180 / Math.PI) + 90;
    if (rotationInDegrees < 0) {
      rotationInDegrees += 360;
    }
    return rotationInDegrees;
  }

  // Function to update the rotation of the item's mesh
  function updateTileAndTokenMeshRotation(item) {
    let rotation = calculateRotationInRadians(item);
    item.mesh.rotation = rotation; 
  }

  // Function to update the rotation of the item's document
  function updateTileAndTokenDocumentRotation(item) {
    let rotation = calculateRotationInDegrees(item);
    item.document.update({rotation: rotation});
  }

  // Function to update rotation for controlled items
  function updateMeshRotationForControlledItems() {
    for (let item of [...canvas.tokens.controlled, ...canvas.tiles.controlled]) {
      updateTileAndTokenMeshRotation(item);
    }
  }

  // Function to update rotation for controlled items
  function updateDocumentRotationForControlledItems() {
    for (let item of [...canvas.tokens.controlled, ...canvas.tiles.controlled]) {
      updateTileAndTokenDocumentRotation(item);
    }
  }

  // Event handlers
  function handleActivationKeyPressed(event) {
    try {
      if (event.key === 'z') {
        zKeyDown = true;
        updateMeshRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in handleActivationKeyPressed: ${error}`, currentLogLevel);
    }
  }
  
  function handleActivationKeyReleased(event) {
    try {
      if (event.key === 'z') {
        zKeyDown = false;
        updateDocumentRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in handleActivationKeyReleased: ${error}`, currentLogLevel);
    }
  }
  
  function handleMouseMove() {
    try {
      if (zKeyDown) {
        updateMeshRotationForControlledItems();
      }
    } catch (error) {
      Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in handleMouseMove: ${error}`, currentLogLevel);
    }
  }

// Function to initialize event listeners
function initializeEventListeners() {
  try {
    document.addEventListener('keydown', handleActivationKeyPressed);
    document.addEventListener('keyup', handleActivationKeyReleased);
    canvas.app.view.addEventListener('mousemove', handleMouseMove);
    Div4LoggerModule.log(Div4LoggerModule.LogLevel.INFO, `Event listeners initialized...`, currentLogLevel);
  } catch (error) {
    Div4LoggerModule.log(Div4LoggerModule.LogLevel.ERROR, `Error in initializeEventListeners: ${error}`, currentLogLevel);
  }
}

  // Return an object with the methods you want to expose
  return {
    initializeEventListeners
  };
})();

export default TokenTileRotationController;