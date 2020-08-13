<script>
  export let fx;
</script>

<style lang="scss">
  @import "../theme.scss";
  @mixin transition() {
    transition: all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  #button-wrapper {
    zoom: 0.35;
    -moz-transform: scale(0.35);
    position: absolute;
    #a {
      width: 100px;
      height: 100px;
      position: absolute;
      //   right: 40px;
      //   top: 40px;
      background-color: #ffffff;
      border-radius: 50px;
      opacity: 1;
      @include transition();
      -webkit-box-shadow: 0px 0px 30px 0px #ccc;
      -moz-box-shadow: 0px 0px 30px 0px #ccc;
      box-shadow: 0px 0px 30px 0px #ccc;

      & > span {
        background-color: rgba($main-color, 0.6);
        display: block;
        height: 12px;
        border-radius: 6px;
        position: relative;
        @include transition();
        position: absolute;
        top: 50%;
        margin-top: -6px;
        left: 18px;
        width: 64px;
        display: -webkit-box;
        display: -moz-box;
        display: -ms-flexbox;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: space-between;
        justify-content: space-between;
        -moz-justify-content: space-between;
        -ms-justify-content: space-between;

        span {
          display: block;
          background-color: $main-color;
          width: 12px;
          height: 12px;
          border-radius: 6px;
          @include transition();
          position: absolute;
          left: 0;
          top: 0;
        }

        &.left {
          transform: rotate(45deg);
          transform-origin: center;

          .circle-left {
            @include transition();
            margin-left: 0;
          }

          .circle-right {
            @include transition();
            margin-left: 52px;
          }
        }

        &.right {
          transform: rotate(-45deg);
          transform-origin: center;

          .circle-left {
            @include transition();
            margin-left: 0;
          }

          .circle-right {
            @include transition();
            margin-left: 52px;
          }
        }
      }

      &:hover {
        & > span {
          background-color: #2faee0;
          @include transition();

          span {
            @include transition();
            background-color: #008ac9;
          }

          &.left {
            .circle-left {
              @include transition();
              margin-left: 52px;
            }

            .circle-right {
              @include transition();
              margin-left: 0;
            }
          }

          &.right {
            .circle-left {
              @include transition();
              margin-left: 52px;
            }

            .circle-right {
              @include transition();
              margin-left: 0;
            }
          }
        }
      }
    }
  }

  .toplevel-wrapper {
    width: 50px;
    padding-top: 10px;
    display: block;
  }
</style>

<div class="column toplevel-wrapper">
  <div id="button-wrapper">
    <span id="a" on:click={() => fx()}>
      <span class="left">
        <span class="circle-left" />
        <span class="circle-right" />
      </span>
      <span class="right">
        <span class="circle-left" />
        <span class="circle-right" />
      </span>
    </span>
  </div>
</div>
