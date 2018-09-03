var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
    it('should reject non-string values', () => {
        expect(isRealString(0)).toBeFalsy();
    });
    it('should string with only spaces', () => {
        expect(isRealString(' ')).toBeFalsy();
    });
    it('should allow string with non-space characters', () => {
        expect(isRealString('string')).toBeTruthy();
    });
})