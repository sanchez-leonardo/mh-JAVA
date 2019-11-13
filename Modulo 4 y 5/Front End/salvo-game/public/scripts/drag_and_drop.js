/* eslint-disable no-console */
// import { customFetch, getQueryVariable } from './utilities_script';

//contenedor para barcos ubicados
let shipsForPost = [];

//Envío de lista de barcos
// async function postShipList(evt) {
//   evt.preventDefault();

//   if (shipsForPost.length == 5) {
//     let gpId = getQueryVariable('gp');

//     customFetch(
//       'POST',
//       '/api/games/players/' + gpId + '/ships',
//       [
//         {
//           'Content-Type': 'application/json;charset=UTF-8'
//         }
//       ],
//       JSON.stringify(shipsForPost)
//     )
//       .then(response => {
//         if (response.ok) {
//           window.location.reload();
//         }
//       })
//       .catch(error => console.log(error));
//   } else {
//     alert('Place all your ships to continue');
//   }
// }

// Ship placement madness
// Drag'n Droppin

//Variable necesaria para transportar el ID a los eventos donde no llega DataTransfer
let draggedItemId;

//Necesario para pasar info de posiciones de barco durante el drag
let shipLocations;

//Ubicacion temporal del barco movido en caso q el destino no sea valido
let provisoryShip;

/* Eventos sobre elemento arrastrado */
document.addEventListener(
  "drag",
  function(event) {
    let ship = event.target;
    ship.classList.add("hide");
  },
  false
);

document.addEventListener(
  "dragstart",
  function(event) {
    //referencia de elemento arrastrado, no todos los eventListener tienen acceso
    event.dataTransfer.setData("shipId", event.target.id);
    event.dataTransfer.effectAllowed = "move";

    draggedItemId = event.dataTransfer.getData("shipId");

    let cell = event.target.parentElement;

    if (cell.classList.contains("piece")) {
      let availableSpace = availableSpaceTakingIntoAccountShipRotation(
        cell,
        draggedItemId
      );

      let data = fits(draggedItemId, availableSpace);

      provisoryShip = data.positions;

      data.positions.forEach(square => square.classList.remove("piece"));

      event.target.nextSibling.remove();
    }
  },
  false
);

document.addEventListener(
  "dragend",
  function(event) {
    let ship = event.target;

    ship.classList.remove("hide");
  },
  false
);

/*Eventos sobre el contenedor destino*/
//efecto permitido del contenedor destino drop/no drop
document.addEventListener(
  "dragover",
  function(event) {
    let cell = event.target;
    if (cell.classList.contains("wah")) {
      // prevent default to allow drop
      event.preventDefault();
      event.dataTransfer.effectAllowed = "move";
    } else {
      event.preventDefault();
      event.dataTransfer.effectAllowed = "none";
    }
  },
  false
);

//Lógica de mostrar posiciones permitidas
document.addEventListener(
  "dragenter",
  function(event) {
    let cell = event.target;

    if (cell.classList.contains("wah")) {
      event.preventDefault();

      let availableSpace = availableSpaceTakingIntoAccountShipRotation(
        cell,
        draggedItemId
      );
      let data = fits(draggedItemId, availableSpace);

      if (data.fits) {
        shipLocations = data.positions;

        shipLocations.forEach(square => {
          if (!square.classList.contains("piece")) {
            square.classList.add("space");
            square.classList.remove("noSpace");
          } else {
            square.classList.add("noSpace");
          }
        });
      } else {
        shipLocations = availableSpace;
        availableSpace.forEach(square => square.classList.add("noSpace"));
      }
    } else {
      Array.from(document.getElementsByClassName("wah")).forEach(square =>
        square.classList.remove("space", "noSpace")
      );
    }
  },
  false
);

document.addEventListener(
  "dragleave",
  function(event) {
    //Resetear celdas cuando se quita el barco del lugar
    let cell = event.target;

    if (cell.classList.contains("wah")) {
      let availableSpace = availableSpaceTakingIntoAccountShipRotation(
        cell,
        draggedItemId
      );

      let removeData = fits(draggedItemId, availableSpace);

      removeData.positions
        .filter(square => !shipLocations.includes(square))
        .forEach(square => square.classList.remove("space", "noSpace"));
    }
  },
  false
);

document.addEventListener(
  "drop",
  function(event) {
    let cell = event.target;
    let ship = document.getElementById(event.dataTransfer.getData("shipId"));

    //Si es en un lugar permitido
    if (cell.classList.contains("wah")) {
      // prevent default
      event.preventDefault();

      if (dropPossible(shipLocations)) {
        cell.appendChild(ship);

        shipLocations.forEach(square => {
          square.classList.remove("space");
          square.classList.add("piece");
        });

        addShipToArray(shipsForPost, ship.id, shipLocations);

        addRotateBtn(cell, draggedItemId);

        console.log("drop succesfull");
      } else {
        if (provisoryShip.length != 0) {
          provisoryShip.forEach(square => {
            square.classList.add("piece");
          });

          addRotateBtn(provisoryShip[0], draggedItemId);
        }

        console.log("drop failed, orangy thingy");
      }

      Array.from(document.getElementsByClassName("wah")).forEach(square =>
        square.classList.remove("space", "noSpace")
      );
      event.dataTransfer.clearData();
      draggedItemId = "";
      shipLocations = [];
      provisoryShip = [];
    } else {
      if (provisoryShip.length != 0) {
        provisoryShip.forEach(square => {
          square.classList.add("piece");
        });

        addRotateBtn(provisoryShip[0], draggedItemId);
      }
      console.log("drop failed, not valid area");

      Array.from(document.getElementsByClassName("wah")).forEach(square =>
        square.classList.remove("space", "noSpace")
      );
      event.dataTransfer.clearData();
      draggedItemId = "";
      shipLocations = [];
      provisoryShip = [];
    }
  },
  false
);

//Si hay espacio suficiente, devuelve true y un array de posiciones del barco
function fits(id, array) {
  switch (id) {
    case "carrier":
      return array.length >= 5
        ? {
            fits: true,
            positions: array.slice(0, 5)
          }
        : {
            fits: false,
            positions: array
          };
    case "battleship":
      return array.length >= 4
        ? {
            fits: true,
            positions: array.slice(0, 4)
          }
        : {
            fits: false,
            positions: array
          };
    case "destroyer":
      return array.length >= 3
        ? {
            fits: true,
            positions: array.slice(0, 3)
          }
        : {
            fits: false,
            positions: array
          };
    case "submarine":
      return array.length >= 3
        ? {
            fits: true,
            positions: array.slice(0, 3)
          }
        : {
            fits: false,
            positions: array
          };
    case "patrolboat":
      return array.length >= 2
        ? {
            fits: true,
            positions: array.slice(0, 2)
          }
        : {
            fits: false,
            positions: array
          };
  }
}
//true si es una posición válida
function dropPossible(array) {
  return (
    array.every(square => !square.classList.contains("piece")) &&
    array.every(square => !square.classList.contains("noSpace"))
  );
}

//botton para rotar barcos
function addRotateBtn(cell, imgId) {
  let btn = document.createElement("button");
  btn.setAttribute("class", "rotate-btn");
  btn.setAttribute("onclick", `rotateShip("${imgId}")`);

  cell.appendChild(btn);
}

//función que agrega la clase para rotar barcos
// eslint-disable-next-line no-unused-vars
function rotateShip(imgId) {
  let shipImg = document.getElementById(imgId);
  let cell = shipImg.parentElement;
  let availableSpace;
  let data;

  if (cell.classList.contains("piece")) {
    availableSpace = availableSpaceTakingIntoAccountShipRotation(cell, imgId);

    data = fits(imgId, availableSpace);

    provisoryShip = data.positions;

    data.positions.forEach(square => square.classList.remove("piece"));
  }

  shipImg.classList.toggle("rotated");

  let posibleSpace = availableSpaceTakingIntoAccountShipRotation(cell, imgId);

  let posibleData = fits(imgId, posibleSpace);

  if (dropPossible(posibleData.positions) && posibleData.fits) {
    posibleData.positions.forEach(square => square.classList.add("piece"));

    addShipToArray(shipsForPost, imgId, posibleData.positions);
  } else {
    shipImg.classList.toggle("rotated");

    provisoryShip.forEach(square => square.classList.add("piece"));
  }
}

//funcion para transformar posiciones
function availableSpaceTakingIntoAccountShipRotation(cell, shipId) {
  let ship = document.getElementById(shipId);

  if (ship.classList.contains("rotated")) {
    let gridLetters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

    let gridLetterNumber = gridLetters.indexOf(cell.id.slice(1, 2));

    let grid = Array.from(document.getElementsByClassName("wah"));

    let gridRow = grid.filter(square => square.id.slice(2) == cell.id.slice(2));

    return gridRow.slice(gridLetterNumber);
  } else {
    let gridRow = cell.parentElement.children;

    return Array.from(gridRow).slice(cell.id.slice(2));
  }
}

//Agregar barco a array para envio
function addShipToArray(shipArr, shipId, locations) {
  let ids = shipArr.map(ship => ship.shipType);

  if (shipArr.length == 0 || !ids.includes(shipId)) {
    shipArr.push({
      shipType: shipId,
      shipLocations: locations.map(loc => loc.id.slice(1))
    });
  } else {
    let index = shipArr.findIndex(el => el.shipType == shipId);
    shipArr[index].shipLocations = locations.map(loc => loc.id.slice(1));
  }
}
