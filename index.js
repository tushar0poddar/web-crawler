const { crawlPage } = require("./crawl.js");

const main =()=>{
    if(process.argv.length < 3){
        console.log("No url provided");
        process.exit(1);
    }
    if(process.argv.length > 3){
        console.log("Too many command args");
        process.exit(1);
    }
    const baseUrl = process.argv[2];
    console.log(`started crawling of ${baseUrl}`);
    crawlPage(baseUrl)
}


main();