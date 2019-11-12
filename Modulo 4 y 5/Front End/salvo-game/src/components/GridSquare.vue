<template>
  <v-col
    v-html="renderContent"
    @dragover="dragover"
    @dragenter="dragenter"
    @dragleave="dragleave"
    @drop="drop"
  ></v-col>
</template>

<script>
import {
  draggedItemId,
  provisoryShip,
  shipLocations,
  shipsForPost,
  availableSpaceTakingIntoAccountShipRotation,
  fits,
  dropPossible,
  addRotateBtn,
  addShipToArray
} from "../scripts/drag_and_drop";

export default {
  props: { letter: String, number: Number },

  computed: {
    renderContent() {
      if (this.letter === "0") {
        return `<p>${this.number - 1}</p>`;
      } else if (this.number - 1 === 0) {
        return `<p>${this.letter.toUpperCase()}</p>`;
      } else if (this.letter === "0" && this.number - 1 === 0) {
        return `<p>${this.number - 1}</p>`;
      } else {
        return "";
      }
    }
  },

  methods: {
    /*Eventos sobre el contenedor destino*/
    //efecto permitido del contenedor destino drop/no drop
    dragover(event) {
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

    //Lógica de mostrar posiciones permitidas
    dragenter(event) {
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

    dragleave(event) {
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

    drop(event) {
      let cell = event.target;
      let ship = document.getElementById(event.dataTransfer.getData("text"));

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

          // eslint-disable-next-line no-console
          console.log("drop succesfull");
        } else {
          if (provisoryShip.length != 0) {
            provisoryShip.forEach(square => {
              square.classList.add("piece");
            });

            addRotateBtn(provisoryShip[0], draggedItemId);
          }

          // eslint-disable-next-line no-console
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
        // eslint-disable-next-line no-console
        console.log("drop failed, not valid area");

        Array.from(document.getElementsByClassName("wah")).forEach(square =>
          square.classList.remove("space", "noSpace")
        );
        event.dataTransfer.clearData();
        draggedItemId = "";
        shipLocations = [];
        provisoryShip = [];
      }
    }
  }
};
</script>
