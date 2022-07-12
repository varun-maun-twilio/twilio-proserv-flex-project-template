const { executeHandler } = require("../../../setup/TwilioRuntimeHelpers");
jest.mock('twilio', () => require("../../../mocks/dependencies/twilio"))
const twilioClient = require('twilio');
jest.mock('twilio-flex-token-validator', () => require("../../../mocks/dependencies/twilio-flex-token-validator"))


const functionHandler = require("../../../../src/functions/common/flex/phone-numbers/list-phone-numbers").handler;
let handlerContext = {
    ...process.env,
    getTwilioClient: () => {
        return twilioClient;
    }
}

afterEach(() => {
    jest.restoreAllMocks();
});

describe('tests for common.flex.phone-numbers.list-phone-numbers', () => {
    it('list-phone-numbers_returnError_flexTokenmissing', async () => {
        const resp = await executeHandler(functionHandler, handlerContext, {});
        expect(resp.statusCode).toBe(403);

    });
    it('list-phone-numbers_returnError_flexTokenSent', async () => {
        const resp = await executeHandler(functionHandler, handlerContext, { Token: "flex-token" });
        expect(resp.statusCode).toBe(200);
        process.env.TWILIO_API_LIMIT_BREACHED = false;
    });

});

