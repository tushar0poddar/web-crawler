const {sortPages} = require('./report.js');
const {test, expect} = require('@jest/globals');

test('sortPages 2 page', ()=>{
    const input = {
        'https://blog.boot.dev/':1, 
        'https://blog.boot.dev/path1':3
    };
    const actual = sortPages(input);
    const expected = [
        ['https://blog.boot.dev/path1',3],
        ['https://blog.boot.dev/',1]
    ];

    expect(actual).toEqual(expected);
})

test('sortPages 4 page', ()=>{
    const input = {
        'https://blog.boot.dev/':1, 
        'https://blog.boot.dev/path1':3,
        'https://blog.boot.dev/path2':4,
        'https://blog.boot.dev/path3':2
    };
    const actual = sortPages(input);
    const expected = [
        ['https://blog.boot.dev/path2',4],
        ['https://blog.boot.dev/path1',3],
        ['https://blog.boot.dev/path3',2],
        ['https://blog.boot.dev/',1]
    ];

    expect(actual).toEqual(expected);
})