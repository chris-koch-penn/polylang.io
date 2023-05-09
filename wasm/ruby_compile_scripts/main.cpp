#include <stdint.h>
#include "emscripten.h"
#include <mruby.h>
#include <mruby/irep.h>
#include <iostream>
#include <string>
#include <sstream>
#include <streambuf>
using namespace std;

extern "C" {
  int EMSCRIPTEN_KEEPALIVE ruby_exec(int* program, int program_size)
  {
    std::string program_string;

    for (int i = 0; i < program_size; i++){
      int value = program[i];
      program_string += char(value);
    }

    const char* program_string_c = program_string.c_str();
    mrb_state *mrb = mrb_open();
    mrb_value res = mrb_load_string(mrb, program_string_c);
    mrb_close(mrb);
    return 0;
  }
}