const {JSDOM} = require('jsdom');

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
    getUrlsFromHtml
}