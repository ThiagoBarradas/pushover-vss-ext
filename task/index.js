"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const tl = require("azure-pipelines-task-lib/task");
const pushoverApi = "https://api.pushover.net/1/messages.json";
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // get inputs
            var token = tl.getInput('token', true);
            var user = tl.getInput('user', true);
            var title = tl.getInput('title', true);
            var message = tl.getInput('message', true);
            var priority = tl.getInput('priority', true).replace("priority", "");
            var expire = tl.getInput('expire', false);
            var retry = tl.getInput('retry', false);
            var device = tl.getInput('device', false);
            var url = tl.getInput('url', false);
            var url_title = tl.getInput('url_title', false);
            // install tools
            const args = new Array();
            args.push('-s');
            args.push('-f');
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
            args.push('-w');
            args.push('\nStatusCode: %{http_code}\n\n');
            args.push(pushoverApi);
            // send notification
            var result = yield tl.exec('curl', args);
            if (result > 0) {
                tl.setResult(tl.TaskResult.Failed, "------------- Ops, send notification failed!");
            }
        }
        catch (err) {
            tl.setResult(tl.TaskResult.Failed, err.message);
        }
    });
}
run();
