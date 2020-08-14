// Copyright 2012 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.
function PlaygroundOutput(el) {
    'use strict';

    return function (write) {
        if (write.Kind == 'start') {
            el.innerHTML = '';
            return;
        }

        var cl = 'system';
        if (write.Kind == 'stdout' || write.Kind == 'stderr')
            cl = write.Kind;

        var m = write.Body;
        if (write.Kind == 'end') {
            m = '\nProgram exited' + (m ? (': ' + m) : '.');
        }

        if (m.indexOf('IMAGE:') === 0) {
            // TODO(adg): buffer all writes before creating image
            var url = 'data:image/png;base64,' + m.substr(6);
            var img = document.createElement('img');
            img.src = url;
            el.appendChild(img);
            return;
        }

        // ^L clears the screen.
        var s = m.split('\x0c');
        if (s.length > 1) {
            el.innerHTML = '';
            m = s.pop();
        }

        m = m.replace(/&/g, '&amp;');
        m = m.replace(/</g, '&lt;');
        m = m.replace(/>/g, '&gt;');

        var span = document.createElement('span');
        span.className = cl;
        span.innerHTML = m;
        el.appendChild(span);
    };
}

(function () {
    function playground(opts) {
        let transport = opts['transport'];
        let running;
        let runBtn = document.getElementById("run");
        let outputEl = document.getElementById("output");
        console.log(runBtn, outputEl.innerHTML)
        outputEl.innerHTML = "";
        var node = document.createElement('pre');
        var output = outputEl.appendChild(node);

        function run() {
            if (running) running.Kill();
            running = transport.Run(window.GET_GOLANG_CODE(), PlaygroundOutput(output));
        }

        runBtn.addEventListener("click", run)
    }

    window.playground = playground;
})();