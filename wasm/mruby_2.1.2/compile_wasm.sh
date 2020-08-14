#!/bin/zsh
# Using Emscripten 1.40.1 downloaded via homebrew.
# The tutorial http://www.blacktm.com/blog/ruby-on-webassembly was used to generate libmruby.a.
emcc ./main.cpp -I ./include ./emscripten/libmruby.a -Os -s WASM=1 -s EXPORTED_FUNCTIONS="['_malloc']" -s FORCE_FILESYSTEM=1 -o ../../public/ruby/main.js -std=c++11  -s ASSERTIONS=1 --pre-js pre.js
printf '%s\n%s\n' "function moduleOne() { " "$(cat ../../public/ruby/main.js)" > ../../public/ruby/main.js
echo "return Module;} window.RUBY = moduleOne();" >> ../../public/ruby/main.js
