const {normalizeUrl, getUrlsFromHtml} = require('./crawl.js');
const {test, expect} = require('@jest/globals');

test('normalizeUrl strip protocol', ()=>{
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('normalizeUrl strip trailing slash', ()=>{
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('normalizeUrl strip capital', ()=>{
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('normalizeUrl strip http', ()=>{
    const input = 'http://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';

    expect(actual).toEqual(expected);
})

test('getUrlsFromHtml absolute', ()=>{
    const inputHtml = `
    <html>
        <body>
            <a href= "https://blog.boot.dev/path">
                Boot dev blogs
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
    const expected = ['https://blog.boot.dev/path'];

    expect(actual).toEqual(expected);
})

test('getUrlsFromHtml realtive', ()=>{
    const inputHtml = `
    <html>
        <body>
            <a href= "/path">
                Boot dev blogs
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
    const expected = ['https://blog.boot.dev/path'];

    expect(actual).toEqual(expected);
})

test('getUrlsFromHtml invalid', ()=>{
    const inputHtml = `
    <html>
        <body>
            <a href= "invalid">
                Invalid
            </a>
        </body>
    </html>
    `
    const inputBaseUrl = 'https://blog.boot.dev';
    const actual = getUrlsFromHtml(inputHtml, inputBaseUrl);
    const expected = [];

    expect(actual).toEqual(expected);
})