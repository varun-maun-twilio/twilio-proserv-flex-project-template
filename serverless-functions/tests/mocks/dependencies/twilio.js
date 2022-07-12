
const incomingPhoneNumbers = jest.fn((sid) => {
    return {
        fetch: jest.fn(() => {
            return new Promise((resolve, reject) => {
                resolve({ sid })
            })
        })
    }
})

incomingPhoneNumbers.list = jest
    .fn()
    .mockImplementationOnce(() => {
        return new Promise((resolve, reject) => {
            const errorObj = new Error("dummy error message");
            errorObj.response = { status: 429 };
            reject(errorObj);
        })
    })
    .mockImplementation((listOptions) => {
        return new Promise((resolve) => resolve([{ friendlyName: 'abc', phoneNumber: 'abc' }]))
    })


module.exports = {
    incomingPhoneNumbers
}