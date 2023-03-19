const printReport = (pages)=>{
    console.log('\n==============');
    console.log('REPORT..');
    console.log("===============\n");
    const sortedPages = sortPages(pages);
    for(const sortedPage of sortedPages){
        const url = sortedPage[0];
        const hits = sortedPage[1];
        console.log(`FOUND: ${hits} links on the page: ${url}`);
    }
}

const sortPages =(pages)=>{
    const pageArr = Object.entries(pages);
    pageArr.sort((a,b)=>{
        return b[1]-a[1];
    })
    return pageArr;
}

module.exports ={
    sortPages,
    printReport
}