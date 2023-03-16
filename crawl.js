
const normalizeUrl = (urlString)=>{
    const url = new URL(urlString)
    const hostpath = (`${url.hostname}${url.pathname}`);

    if(hostpath.slice(-1) === '/'){
        return hostpath.slice(0,-1);
    }
    return hostpath;
}

module.exports = {
    normalizeUrl
}