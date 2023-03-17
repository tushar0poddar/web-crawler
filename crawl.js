const {JSDOM} = require('jsdom');

const crawlPage = async(currentUrl) =>{
    console.log("Actively crawling...");
    try{
        const resp = await fetch(currentUrl);

        if(resp.status > 399){
            console.log(`Error in fetch with status code: ${resp.status}, on page: ${currentUrl}`);
            return;
        }

        const contentType = resp.headers.get('content-type');

        if(!contentType.includes('text/html')){
            console.log(`No HTML response, content type: ${contentType}, on page: ${currentUrl}`);
            return;
        }

        console.log(await resp.text());
    }catch(err){
        console.log(`Error in fetch: ${err.message}, on page: ${currentUrl}`);
    }
}

const getUrlsFromHtml = (htmlBody, baseUrl) =>{
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const links = dom.window.document.querySelectorAll('a');
    for(const link of links){
        //relative 
        if(link.href.slice(0,1) === '/'){
            try{
                const urlobj = new URL(`${baseUrl}${link.href}`);
                urls.push(urlobj.href);
            }catch(err){
                console.log(`Error with relative url: ${err.message}`);
            }
        }else{
            //absolute
            try{
                const urlobj = new URL(link.href)
                urls.push(urlobj.href);
            }catch(err){
                console.log(`Error with absolute url: ${err.message}`);
            }
        }
    }
    return urls;
}

const normalizeUrl = (urlString)=>{
    const url = new URL(urlString)
    const hostpath = (`${url.hostname}${url.pathname}`);

    if(hostpath.slice(-1) === '/'){
        return hostpath.slice(0,-1);
    }
    return hostpath;
}

module.exports = {
    normalizeUrl,
    getUrlsFromHtml,
    crawlPage
}