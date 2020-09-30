<script>
  import NavBar from "../components/NavBar.svelte";
  let githubUrl = "https://github.com/chris-koch-penn/polylang.git";
</script>

<style lang="scss">
  @import "../theme.scss";
  .primary {
    background-color: $main-color;
  }

  p {
    font-size: 20px;
  }
  .kofitext {
    color: $background !important;
    letter-spacing: -0.15px !important;
    text-wrap: none;
    vertical-align: middle;
    line-height: 33px !important;
    padding: 0;
    text-align: center;
    text-decoration: none !important;
    text-shadow: 0 1px 1px rgba(34, 34, 34, 0.05);
  }
  .kofiimg {
    height: 15px !important;
    width: 22px !important;
    display: initial;
  }

  .container {
    background-color: #2b2b2b;
  }
  .btn-lg {
    width: 250px;
  }
</style>

<NavBar />
<div class="container p-5">
  <h1 class="text-center mb-5">
    Thank you for taking the time to look at this page!
  </h1>
  <p class="mb-4">
    Polylang is committed to making programming accessible to everyone - that's
    why we opensourced our platform and provide shareable programming
    playgrounds in almost ten languages (with more coming soon!). Eventually, we
    will add coding challenges and educational tutorials - we want to be the
    Wikipedia for programming education.
    <br />
    <br />
    One way to contribute would be a monetary donation through our
    <a href="https://ko-fi.com/polylang">Ko-fi page</a>
    or by clicking the "Donate" button below. We plan on using the funding for
    dev costs, and for incentives to help us implement new language playgrounds
    for Rust, NodeJS, Objective-C, Kotlin, Java, C-Sharp, Haskell, R, and more.
    If you donate, make sure to include your favorite language in the donation
    message! This will help us prioritize which languages to add next.
    <br />
    <br />
    Secondly, as an open source project, we have a
    <a href={githubUrl}>Github page</a>
    where you can contribute code changes and bug reports. If you have compiler
    and Webassembly experience, or would like to learn, you'd be a good fit!
    Every language on Polylang is run completely in the browser using Wasm or by
    transpilation to JS.
    <br />
    <br />
    Lastly, I have a freelance development company called
    <a href="https://computesy.dev" target="_blank">Computesy</a>
    - if you or anyone you know needs an enterprise mobile app, website, or
    AI/ML tool developed, contact us!
  </p>
  <div class="row d-flex justify-content-center">
    <div class="col-md-4 col-12 mt-3 d-flex justify-content-center">
      <a
        class="btn btn-lg primary"
        href="https://ko-fi.com/polylang"
        target="_blank">
        <span class="kofitext d-flex align-items-center">
          <img
            src="https://storage.ko-fi.com/cdn/cup-border.png"
            class="kofiimg"
            alt="Donate to Polylang" />
          &nbsp;Donate to Polylang
        </span>
      </a>
    </div>
    <div class="col-md-4 col-12 mt-3 d-flex justify-content-center">
      <a class="btn btn-lg primary" href={githubUrl} target="_blank">
        <div class="kofitext d-flex align-items-center">
          <i
            class="fa fa-github"
            aria-hidden="true"
            alt="Contribute on Github" />
          &nbsp;Contribute on Github
        </div>
      </a>
    </div>
  </div>
</div>
