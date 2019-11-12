<template>
  <div class="available-ships">
    <div class="holder">
      <img
        src="../assets/ships/carrierhor.png"
        class="image shadow"
        alt="carrier shadow"
        draggable="false"
      />
      <img
        src="../assets/ships/carrierhor.png"
        id="carrier"
        class="ship image"
        alt="carrier image"
        draggable="true"
        @drag="drag"
        @dragstart="dragstart"
        @dragend="dragend"
      />
    </div>
    <div class="holder">
      <img
        src="../assets/ships/battleshiphor.png"
        class="image shadow"
        alt="battleship shadow"
        draggable="false"
      />
      <img
        src="../assets/ships/battleshiphor.png"
        id="battleship"
        class="ship image"
        alt="battleship image"
        draggable="true"
        @drag="drag"
        @dragstart="dragstart"
        @dragend="dragend"
      />
    </div>
    <div class="holder">
      <img
        src="../assets/ships/destroyerhor.png"
        class="image shadow"
        alt="destroyer shadow"
        draggable="false"
      />
      <img
        src="../assets/ships/destroyerhor.png"
        id="destroyer"
        class="ship image"
        alt="destroyer image"
        draggable="true"
        @drag="drag"
        @dragstart="dragstart"
        @dragend="dragend"
      />
    </div>
    <div class="holder">
      <img
        src="../assets/ships/submarinehor.png"
        class="image shadow"
        alt="submarine shadow"
        draggable="false"
      />
      <img
        src="../assets/ships/submarinehor.png"
        id="submarine"
        class="ship image"
        alt="submarine image"
        draggable="true"
        @drag="drag"
        @dragstart="dragstart"
        @dragend="dragend"
      />
    </div>
    <div class="holder">
      <img
        src="../assets/ships/patrolboathor.png"
        class="image shadow"
        alt="patrolboat shadow"
        draggable="false"
      />
      <img
        src="../assets/ships/patrolboathor.png"
        id="patrolboat"
        class="ship image"
        alt="patrolboat image"
        draggable="true"
        @drag="drag"
        @dragstart="dragstart"
        @dragend="dragend"
      />
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {
  draggedItemId,
  // eslint-disable-next-line no-unused-vars
  provisoryShip,
  availableSpaceTakingIntoAccountShipRotation,
  fits
} from "../scripts/drag_and_drop";

export default {
  data() {
    return {};
  },

  methods: {
    /* Eventos sobre elemento arrastrado */
    drag(event) {
      let ship = event.target;
      ship.classList.add("hide");
    },

    dragstart(event) {
      //referencia de elemento arrastrado, no todos los eventListener tienen acceso
      event.dataTransfer.setData("text/plain", event.target.id);
      event.dataTransfer.effectAllowed = "move";

      draggedItemId = event.dataTransfer.getData("text");

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

    dragend(event) {
      let ship = event.target;

      ship.classList.remove("hide");
    }
  }
};
</script>

<style>
</style>
