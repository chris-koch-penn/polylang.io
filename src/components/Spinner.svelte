<style>
  .sk-grid {
    width: 60px;
    height: 60px;
    margin: auto;
  }
  .sk-grid-cube {
    width: 33.33%;
    height: 33.33%;
    background-color: #cfbff7;
    float: left;
    animation: sk-grid 1.3s infinite ease-in-out;
  }
  .sk-grid-cube:nth-child(1) {
    animation-delay: 0.2s;
  }
  .sk-grid-cube:nth-child(2) {
    animation-delay: 0.3s;
  }
  .sk-grid-cube:nth-child(3) {
    animation-delay: 0.4s;
  }
  .sk-grid-cube:nth-child(4) {
    animation-delay: 0.1s;
  }
  .sk-grid-cube:nth-child(5) {
    animation-delay: 0.2s;
  }
  .sk-grid-cube:nth-child(6) {
    animation-delay: 0.3s;
  }
  .sk-grid-cube:nth-child(7) {
    animation-delay: 0s;
  }
  .sk-grid-cube:nth-child(8) {
    animation-delay: 0.1s;
  }
  .sk-grid-cube:nth-child(9) {
    animation-delay: 0.2s;
  }
  @keyframes sk-grid {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    35% {
      transform: scale3D(0, 0, 1);
    }
  }
</style>

<link
  href="https://cdnjs.cloudflare.com/ajax/libs/spinkit/2.0.1/spinkit.min.css" />

<div class="sk-grid">
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
  <div class="sk-grid-cube" />
</div>
