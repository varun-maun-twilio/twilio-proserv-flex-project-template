const { Twilio } = require("../../setup/TwilioRuntimeHelpers")

module.exports = {
    functionValidator: function (handlerFn) {
        return function (context, event, callback) {
            if (event.Token && event.Token == "flex-token") {
                return handlerFn(context, event, callback);
            }
            else {
                let forbiddenResp = new Twilio.Response();
                forbiddenResp.setStatusCode(403);
                return callback(null, forbiddenResp)
            }
        }
    }
}