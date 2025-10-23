function response(type, text, path) {
     var notification = {
            type: type ?? 'error',
            text: text ?? '',
            path: path ?? '/'
        };

        return notification;
}
module.exports.response = response
