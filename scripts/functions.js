var random = Math.random().toString(36).substring(7);

var projects = (`
    <div class="projects block">
        <span class="oneliner grey" style="margin-top: 30px;">// Current Projects --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
        <ul class="projects">
            <div class="grid">
                <li><a class="u-c--sam-red" href="#"><em class="u-c--sam-yellow">active</em> 01: Central College Nottingham</a></li>
                <li><a class="u-c--sam-red" href="#"><em class="u-c--sam-yellow">active</em> 02: The ETI</a></li>
                <li><a class="u-c--sam-red" href="#"><em class="u-c--sam-yellow">active</em> 03: Henley Business School</a></li>
                <li><a class="u-c--sam-red" href="#"><em class="u-c--sam-yellow">active</em> 04: MadeByKind</a></li>
                <li><a class="u-c--sam-red" href="#"><em class="u-c--sam-yellow">active</em> 05: samgoddard.co.uk</a></li>
                <li><a class="u-c--sam-red" href="#"><em class="u-c--sam-yellow">active</em> 06: Another Project</a></li>
            </div>
            <div class="grid">
                <li><a class="u-c--sam-red" href="#" target="_blank"><em class="u-c--sam-yellow">legacy</em> <i class="fa fa-github" aria-hidden="true"></i> samgoddard-github-api</a></li>
                <li><a class="u-c--sam-red" href="#" target="_blank"><em class="u-c--sam-yellow">legacy</em> <i class="fa fa-github" aria-hidden="true"></i> samgoddard-github-api</a></li>
                <li><a class="u-c--sam-red" href="#" target="_blank"><em class="u-c--sam-yellow">learning</em> <i class="fa fa-github" aria-hidden="true"></i> samgoddard-github-api</a></li>
                <li><a class="u-c--sam-red" href="#" target="_blank"><em class="u-c--sam-yellow">legacy</em> <i class="fa fa-github" aria-hidden="true"></i> samgoddard-github-api</a></li>
                <li><a class="u-c--sam-red" href="#" target="_blank"><em class="u-c--sam-yellow">learning</em> <i class="fa fa-github" aria-hidden="true"></i> samgoddard-github-api</a></li>
            </div>
        </ul>
    </div>
`);

var tweets = (`
<div class="tweets block">
    <span class="oneliner grey" style="margin-top: 30px;">// Latest Tweets --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
    </ul>
</div>`);

var meta = (`
    <div class="meta block">
    <span class="oneliner grey" style="margin-top: 30px;">// Meta -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</span>
    <a class="u-c--sam-blue" href="#">[ twitter ]</a>
    <a class="u-c--sam-blue" href="#">[ github ]</a>
    <a class="u-c--sam-blue" href="#">[ reddit ]</a>
</div>
`);


jQuery(function($) {
    function progress(percent, width) {
        var size = Math.round(width * percent / 100);
        var left = '',
            taken = '',
            i;
        for (i = size; i--;) {
            taken += '=';
        }
        if (taken.length > 0) {
            taken = taken.replace(/=$/, '>');
        }
        for (i = width - size; i--;) {
            left += ' ';
        }
        return '[' + taken + left + '] ' + percent + '%';
    }
    var animation = false;
    var timer;
    var prompt;
    var string;

    $('body').terminal(function(command, term) {
        var cmd = $.terminal.parse_command(command);
        if (cmd.name == 'twitter') {
            var i = 0,
            size = cmd.args[0];
            prompt = term.get_prompt();
            string = progress(0, size);
            term.set_prompt(progress);
            animation = true;

            (function loop() {
                string = progress(i++, size);
                term.set_prompt(string);
                if (i < 100) {
                    timer = setTimeout(loop, 10);
                } else {
                    term.echo(progress(i, size) + ' [[b;#E58645;]Latest Tweets Loaded]')
                        .set_prompt(prompt);
                    animation = false
                    $(".terminal-output").append(tweets);
                }
            })();
        }

        if (cmd.name == 'projects') {
            var i = 0,
            size = cmd.args[0];
            prompt = term.get_prompt();
            string = progress(0, size);
            term.set_prompt(progress);
            animation = true;

            (function loop() {
                string = progress(i++, size);
                term.set_prompt(string);
                if (i < 100) {
                    timer = setTimeout(loop, 10);
                } else {
                    term.echo(progress(i, size) + ' [[b;#E58645;]Projects Loaded]')
                        .set_prompt(prompt);
                    animation = false
                    $(".terminal-output").append(projects);
                }
            })();
        }

        if (cmd.name == 'meta') {
            var i = 0,
            size = cmd.args[0];
            prompt = term.get_prompt();
            string = progress(0, size);
            term.set_prompt(progress);
            animation = true;

            (function loop() {
                string = progress(i++, size);
                term.set_prompt(string);
                if (i < 100) {
                    timer = setTimeout(loop, 5);
                } else {
                    term.echo(progress(i, size) + ' [[b;#E58645;]Meta Loaded]')
                        .set_prompt(prompt);
                    animation = false
                    $(".terminal-output").append(meta);
                }
            })();
        }

        if (cmd.name == 'clear') {
            term.clear();
        }

        if (cmd.name == 'help') {
            term.echo(`Use the following commands to navigate 
[[b;#E58645;]projects]
[[b;#E58645;]about]  
[[b;#E58645;]twitter] 
[[b;#E58645;]meta] 
[[b;#E58645;]music] 
[[b;#E58645;]github]`);
        }
    }, {
        greetings: '// website [[b;#E58645;]v.2.1.0]\n' +
        'http://www.github.com/samgoddard\n\n' + 
        'Updating samgoddard.co.uk...\n' +
        'Unpacking objects: 100% (19/19), done.\n' +
        'Fast-forwarded master to d2725d44fce59ea706d\n\n' +
        '[[b;#588AA0;]Success! Hey Im Sam, Im a nottingham based developer at madebykind.com - Im a big fan of labradors and parrots.]',
        convertLinks: false,
        name: 'js_demo',
        prompt: '➜  samgoddard-git-api git:(master) ',
        clear: false
    });
});