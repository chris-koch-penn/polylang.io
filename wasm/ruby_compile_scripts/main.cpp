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
  int EMSCRIPTEN_KEEPALIVE ruby_exec(int* a, int asize)
  {
    std::string str;

    for (int i = 0; i < asize; i++){
      int value = a[i];
      str += char(value);
    }

    const char* c = str.c_str();
    mrb_state *mrb = mrb_open();
    mrb_value res = mrb_load_string(mrb, c);
    mrb_close(mrb);
    return 0;
  }
}