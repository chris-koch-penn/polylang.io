<script>
  import NavBar from "../components/NavBar.svelte";
  let languages = [
    {
      name: "Python 3.4",
      link: "#/python34",
      innerHTML:
        "Micropython, an embedded version of Python 3.4. Only includes standard libraries.",
    },
    {
      name: "Python 3.10",
      link: "#/python",
      innerHTML:
        "Includes Numpy, Matplotlib, Pandas, NLTK, Biopython, \
        SciPy*, NetworkX, and \
        <a href='https://github.com/iodide-project/pyodide/tree/main/packages' target='_blank'>more</a>",
    },
    {
      name: "Julia",
      link: "#/julia",
      innerHTML: "Julia 1.04. Only includes standard library currently.",
    },
    {
      name: "Golang",
      link: "#/golang",
      innerHTML: "Golang 1.12. Only includes runtime library currently.",
    },
    {
      name: "Ruby",
      link: "#/ruby",
      innerHTML: "Version 2.1.2 of MRuby. Auto-imports standard libraries.",
    },
    {
      name: "C/C++",
      link: "#/cpp",
      innerHTML: "Clang compiler 8.0.1 with C and C++ standard libraries.",
    },
    {
      name: "Perl",
      link: "#/perl",
      innerHTML: "Perl 5 with standard libraries.",
    },
    {
      name: "OCaml",
      link: "#/ocaml",
      innerHTML: "OCaml 4.10.0 with standard libraries.",
    },
    {
      name: "PHP",
      link: "#/php",
      innerHTML: "PHP 7.4.5-dev with standard libraries.",
    },
  ];
</script>

<NavBar />
<div class="row d-flex justify-content-start px-5">
  {#each languages as language}
    <div class="col-md-4 col-sm-5 col-10 my-4 col-lg-3">
      <a href={language.link} style="all: unset !important;">
        <div class="card p-3">
          <h5 class="text-center card-title">{language.name}</h5>
          <h6 class="text-center card-subtitle mb-2">
            {@html language.innerHTML}
          </h6>
        </div>
      </a>
    </div>
  {/each}
</div>

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

  // :global is used because the @html directive used above does not apply scoped classes.
  :global(a),
  :global(a:active),
  :global(a:hover) {
    color: $main-color !important;
  }
  .card:hover h6 :global(a),
  .card:hover h6 :global(a:active),
  .card:hover h6 :global(a:hover) {
    color: white !important;
  }
</style>
