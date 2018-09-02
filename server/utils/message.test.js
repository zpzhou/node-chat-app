var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = 'Peter';
        const text = 'foo';

        let oMsg = generateMessage(from, text);
        expect(oMsg.from).toBe(from);
        expect(oMsg.text).toBe(text);
        expect(typeof oMsg.createdAt).toBe('number');
    });
});

describe('generateLocation', () => {
    it('should generate correct location message object', () => {
        const from = 'Peter';
        const lat = 1;
        const lng = 2;

        let oLocationMsg = generateLocationMessage(from, lat, lng);
        expect(oLocationMsg.from).toBe(from);
        expect(typeof oLocationMsg.createdAt).toBe('number');

        let expectedUrl = `https://www.google.com/maps?q=${lat},${lng}`;
        expect(oLocationMsg.url).toBe(expectedUrl);
    });
});