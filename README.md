# Polylang.io
Polylang.io provides free, open-source code playgrounds in 10 programming languages. No account is required, and all playgrounds are shareable. We currently support Python 3.4, Python 3.8 with scientific libraries, Julia, Golang, Ruby, C, C++, Perl, OCaml, and PHP. Check it out at [polylang.io]! See our mission statement and support us [here][polylang.io/#/support]!

## The Magic of WebAssembly
What makes Polylang different from other online code playgrounds is that it runs entirely in your browser - the compiler for the language you are using is a mixture of Javascript and WebAssembly running locally on your computer. There is no server running your code, just your computer and your browser!

## Deploying and Developing
The fronted is a static Svelte website and the backend is a Python API using the Sanic framework (check the folder /api for more information). The website is designed to be deployed on Vercel using Python serverless functions with a serverless AWS DynamoDB database. However, other static hosting platforms and serverless platforms would also work.

To develop on the frontend, install the npm dependencies then run `npm run dev`. Check [/api/README.md] for more information about running the backend.

Inside the [/public] folder are static assets including all of the .wasm files that contain the compilers and interpreters needed to run the various languages on Polylang.

## Todo
* Use a smaller C compiler. Currently, the Clang/C/C++ wasm files sum to about 50 mb. This takes a long time to load, doesn't fully fit in Vercel's CDN cache (10 mb limit), and uses a lot of bandwidth. There are small C compilers that are around 1 mb or less that would be a better fit for Polylang. [TCC][https://github.com/TinyCC/tinycc] implements C99 and [8cc][https://github.com/rui314/8cc] implements C11. C11 is preferred.
* Matrix operations in Julia are broken.
* Certain languages are large. Julia, C++, Golang, and OCaml are roughly 50 mb. I'm open to proposals on the best ways to shrink these. If anyone knows of a smaller C++ compiler than Clang, that would be great.
* Golang is around 50 mb - this could be brought down by compiling [TinyGo][https://github.com/tinygo-org/tinygo] to WebAssembly.
* Implement Rust, R, Objective-C, Kotlin, Java, C-Sharp, Haskell.

## Inspirations, Acknoledgements, and OSS Projects Used by Polylang
* [micropython][https://github.com/micropython/micropython/tree/master/ports/javascript]'s javascript port for Python 3.4.
* [pyodide][https://github.com/iodide-project/pyodide] for Python 3.8 with scientific libraries.
* [julia-wasm][https://github.com/Keno/julia-wasm] for Julia to WebAssembly compilation.
* [wasm-go-playground][https://github.com/ccbrown/wasm-go-playground] for Golang to WebAssembly compilation.
* [mruby][https://github.com/mruby/mruby] for a lightweight version of Ruby.
* [wasm-clang][https://github.com/binji/wasm-clang] for C/C++ to WebAssembly compilation.
* [webperl][https://github.com/haukex/webperl] for Perl to WebAssembly compilation.
* [js-of-OCaml][https://github.com/ocsigen/js_of_ocaml] for compiling the OCaml toplevel to Javascript.
* [pib][https://github.com/oraoto/pib] for PHP.
* Related and interesting work: see [compile-to-web][https://github.com/ChristianMurphy/compile-to-web] for languages with LLVM support and Wasm support.

