// Copyright 2012 The Go Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

/*
In the absence of any formal way to specify interfaces in JavaScript,
here's a skeleton implementation of a playground transport.
        function Transport() {
                // Set up any transport state (eg, make a websocket connection).
                return {
                        Run: function(body, output, options) {
                                // Compile and run the program 'body' with 'options'.
				// Call the 'output' callback to display program output.
                                return {
                                        Kill: function() {
                                                // Kill the running program.
                                        }
                                };
                        }
                };
        }
	// The output callback is called multiple times, and each time it is
	// passed an object of this form.
        var write = {
                Kind: 'string', // 'start', 'stdout', 'stderr', 'end'
                Body: 'string'  // content of write or end status message
        }
	// The first call must be of Kind 'start' with no body.
	// Subsequent calls may be of Kind 'stdout' or 'stderr'
	// and must have a non-null Body string.
	// The final call should be of Kind 'end' with an optional
	// Body string, signifying a failure ("killed", for example).
	// The output callback must be of this form.
	// See PlaygroundOutput (below) for an implementation.
        function outputCallback(write) {
        }
*/

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
    // opts is an object with these keys
    //  codeEl - code editor element
    //  outputEl - program output element
    //  runEl - run button element
    //  fmtEl - fmt button element (optional)
    //  fmtImportEl - fmt "imports" checkbox element (optional)
    //  shareEl - share button element (optional)
    //  shareURLEl - share URL text input element (optional)
    //  shareRedirect - base URL to redirect to on share (optional)
    //  toysEl - toys select element (optional)
    //  enableHistory - enable using HTML5 history API (optional)
    //  transport - playground transport to use (default is HTTPTransport)
    //  enableShortcuts - whether to enable shortcuts (Ctrl+S/Cmd+S to save) (default is false)
    //  enableVet - enable running vet and displaying its errors
    function playground(opts) {
        var transport = opts['transport']; //|| new HTTPTransport(opts['enableVet']);
        var running;
        var outdiv = $(opts.outputEl).empty();
        var output = $('<pre/>').appendTo(outdiv);

        function run() {
            if (running) running.Kill();
            running = transport.Run(window.GET_GOLANG_CODE(), PlaygroundOutput(output[0]));
        }

        $(opts.runEl).click(run);
    }

    window.playground = playground;
})();