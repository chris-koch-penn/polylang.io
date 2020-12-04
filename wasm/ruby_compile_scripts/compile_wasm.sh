#!/bin/zsh
# Using Emscripten 1.40.1 downloaded via homebrew.
# The tutorial http://www.blacktm.com/blog/ruby-on-webassembly was used to generate libmruby.a.
emcc ./main.cpp -I ./include ./emscripten/libmruby.a -Os -s WASM=1 -s EXPORTED_FUNCTIONS="['_malloc']" -s FORCE_FILESYSTEM=1 -o ../ruby_npm_pkg/ruby_main.js -std=c++11  -s ASSERTIONS=1 --pre-js pre.js
printf '%s\n%s\n' "function moduleOne() { " "$(cat ../../public/ruby/ruby_main.js)" > ../ruby_npm_pkg/ruby_main.js
echo "return Module;} window.RUBY = moduleOne();" >> ../ruby_npm_pkg/ruby_main.js
