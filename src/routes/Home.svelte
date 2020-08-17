<script>
  import { push } from "svelte-spa-router";
  import NavBar from "../components/NavBar.svelte";
  let languages = [
    {
      name: "Python 3.8",
      link: "#/python",
      innerHTML:
        "Includes Numpy, Matplotlib, Pandas, NLTK, Biopython, \
        SciPy*, NetworkX, and <a href='#' style=>more</a>"
    },
    {
      name: "Julia",
      link: "#/julia",
      innerHTML: "Version 1.04. Only includes standard library currently."
    },
    {
      name: "Golang",
      link: "#/golang",
      innerHTML: "Version 1.12. Only includes runtime library currently."
    },
    {
      name: "Ruby",
      link: "#/ruby",
      innerHTML:
        "Version 2.1.2 of MRuby. Auto-imports standard libraries. No support for external libraries currently."
    },
    {
      name: "C/C++",
      link: "#/cpp",
      innerHTML: "Clang compiler 8.0.1 with C and C++ standard libraries."
    }
  ];
</script>

<style lang="scss">
  @import "../theme.scss";
  .card {
    background-color: $darkest;
    border-radius: 3%;
    cursor: pointer;
    height: 100%;
    border: 1px lightslategrey solid;
  }
  .card:hover {
    .card-title {
      color: white;
    }
    background-color: $main-color;
    color: black;
  }
  .card-title {
    font-size: 1.75rem;
    font-family: "montserrat";
    color: $main-color;
    font-weight: bold;
  }

  // :global is used because @html directive does not apply scoped classes.
  h6 :global(a),
  h6 :global(a:active),
  h6 :global(a:hover) {
    color: $main-color;
  }
  .card:hover h6 :global(a),
  .card:hover h6 :global(a:active),
  .card:hover h6 :global(a:hover) {
    color: white;
  }
</style>

<NavBar />
<div class="row d-flex justify-content-start px-5">
  {#each languages as language}
    <div class="col-md-4 col-sm-5 col-10 my-4">
      <div class="card p-3" on:click={() => push(language.link)}>
        <h5 class="text-center card-title">{language.name}</h5>
        <h6 class="text-center card-subtitle mb-2">
          {@html language.innerHTML}
        </h6>
      </div>
    </div>
  {/each}
</div>
