import * as tl from 'azure-pipelines-task-lib/task';

const pushoverApi: string = "https://api.pushover.net/1/messages.json";

async function run() {
    try {
        // get inputs
        var token: string = tl.getInput('token', true);
        var user: string = tl.getInput('user', true);
        var title: string = tl.getInput('title', true);
        var message: string = tl.getInput('message', true);
        var priority: string = tl.getInput('priority', true).replace("priority","");
        var expire: string = tl.getInput('expire', false);
        var retry: string = tl.getInput('retry', false);
        var device: string = tl.getInput('device', false);
        var url: string = tl.getInput('url', false);
        var url_title: string = tl.getInput('url_title', false);

        // install tools
        const args = new Array();
        args.push('-s');
        args.push('--form-string');
        args.push('token=' + token);
        args.push('--form-string');
        args.push('user=' + user);
        args.push('--form-string');
        args.push('title=' + title);
        args.push('--form-string');
        args.push('message=' + message);
        args.push('--form-string');
        args.push('priority=' + priority);

        if (url) {
            args.push('--form-string');
            args.push('url=' + url);
        }
        if (url_title) {
            args.push('--form-string');
            args.push('url_title=' + url_title);
        }
        if (expire) {
            args.push('--form-string');
            args.push('expire=' + expire);
        }
        if (retry) {
            args.push('--form-string');
            args.push('retry=' + retry);
        }
        if (device) {
            args.push('--form-string');
            args.push('device=' + device);
        }


        args.push(pushoverApi);

        // send notification
        var result = await tl.exec('curl', args);
        if (result > 0) {
            tl.setResult(tl.TaskResult.Failed, "------------- Ops, send notification failed!");
        }
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();
