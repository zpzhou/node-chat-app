var expect = require('expect');

var {generateMessage} = require('./message');

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