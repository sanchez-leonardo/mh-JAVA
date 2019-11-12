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
        draggable="true"
        alt="carrier image"
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
        draggable="true"
        alt="battleship image"
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
        draggable="true"
        alt="destroyer image"
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
        draggable="true"
        alt="submarine image"
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
        draggable="true"
        alt="patrolboat image"
      />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.available-ships {
  display: flex;
  height: 30px;
}

.holder {
  float: left;
  position: relative;
}

.image {
  position: absolute;
  z-index: 2;
  left: 0;
}

.shadow {
  opacity: 0.5;
  position: relative;
  z-index: 0;
}

.holder .image {
  width: 100%;
}

.wah .image {
  height: 100%;
}

.space {
  background-color: darkgreen;
}

.noSpace {
  background-color: coral;
}

.rotate-btn {
  height: 50%;
  width: 50%;
  position: relative;
  z-index: 5;
  background-image: url("../assets/rotate.png");
}

.rotated {
  transform-origin: 10%;
  transform: rotate(90deg);
}
</style>
