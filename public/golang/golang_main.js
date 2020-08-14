$(document).ready(function () {
    if (!WebAssembly || !WebAssembly.instantiate) {
        $('#run').val('Unsupported Browser');
        $('#controls input').attr('disabled', true);
        return;
    }

    let cmds = {};

    const exec = (wasm, args) => new Promise((resolve, reject) => {
        const go = new Go();
        go.exit = resolve;
        go.argv = go.argv.concat(args || []);
        WebAssembly.instantiate(wasm, go.importObject).then((result) => go.run(result.instance)).catch(reject);
    });

    Promise.all(
        [
            '/golang/prebuilt/runtime.a',
            '/golang/prebuilt/internal/bytealg.a',
            '/golang/prebuilt/internal/cpu.a',
            '/golang/prebuilt/runtime/internal/atomic.a',
            '/golang/prebuilt/runtime/internal/math.a',
            '/golang/prebuilt/runtime/internal/sys.a',
        ].map((path) => fetch(path)
            .then((response) => response.arrayBuffer())
            .then((buf) => writeToGoFilesystem(path, new Uint8Array(buf)))
        ).concat(
            ['compile', 'link', 'gofmt']
                .map((cmd) => fetch('golang/cmd/' + cmd + '.wasm')
                    .then((response) => response.arrayBuffer())
                    .then((buf) => {
                        cmds[cmd] = new Uint8Array(buf);
                    })
                )
        )
    ).then(() => {
        const decoder = new TextDecoder('utf-8');
        const encoder = new TextEncoder('utf-8');

        writeToGoFilesystem('/importcfg', encoder.encode(
            "packagefile runtime=/golang/prebuilt/runtime.a"
        ));

        writeToGoFilesystem('/importcfg.link', encoder.encode(
            "packagefile command-line-arguments=main.a\n" +
            "packagefile runtime=/golang/prebuilt/runtime.a\n" +
            "packagefile internal/bytealg=/golang/prebuilt/internal/bytealg.a\n" +
            "packagefile internal/cpu=/golang/prebuilt/internal/cpu.a\n" +
            "packagefile runtime/internal/atomic=/golang/prebuilt/runtime/internal/atomic.a\n" +
            "packagefile runtime/internal/math=/golang/prebuilt/runtime/internal/math.a\n" +
            "packagefile runtime/internal/sys=/golang/prebuilt/runtime/internal/sys.a"
        ));

        playground({
            codeEl: '#code',
            outputEl: '#output',
            runEl: '#run',
            enableHistory: false,
            enableShortcuts: true,
            transport: {
                Run: (body, output) => {
                    $('#controls input').attr('disabled', true);

                    writeToGoFilesystem('/main.go', body);
                    output({
                        Kind: 'start',
                    });
                    goStderr = (buf) => {
                        output({
                            Kind: 'stderr',
                            Body: decoder.decode(buf),
                        });
                    };
                    goStdout = (buf) => {
                        output({
                            Kind: 'stdout',
                            Body: decoder.decode(buf),
                        });
                    };

                    exec(cmds['compile'], ['-p', 'main', '-complete', '-dwarf=false', '-pack', '-importcfg', 'importcfg', 'main.go'])
                        .then((code) => code || exec(cmds['link'], ['-importcfg', 'importcfg.link', '-buildmode=exe', 'main.a']))
                        .then((code) => code || exec(readFromGoFilesystem('a.out')))
                        .then((code) => {
                            output({
                                Kind: 'end',
                                Body: code ? 'status ' + code + '.' : undefined,
                            });
                        })
                        .catch((err) => {
                            output({
                                Kind: 'end',
                                Body: 'wasm error: ' + (err.message || 'unknown'),
                            });
                        })
                        .finally(() => $('#controls input').attr('disabled', false))
                        ;

                    return {
                        Kill: () => { },
                    };
                },
            },
        });

        $('#fmt').show();
        $('#fmt').click(() => {
            $('#controls input').attr('disabled', true);

            writeToGoFilesystem('/main.go', $('#code').val());
            goStderr = (buf) => console.log(decoder.decode(buf));
            goStdout = goStderr;
            exec(cmds['gofmt'], ['-w', 'main.go'])
                .then((code) => {
                    if (!code) {
                        $('#code').val(decoder.decode(readFromGoFilesystem('main.go')));
                    }
                })
                .finally(() => $('#controls input').attr('disabled', false))
                ;
        });

        $('#controls input').attr('disabled', false);
    });
});
