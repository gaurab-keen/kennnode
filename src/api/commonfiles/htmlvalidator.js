
const validText= ((html)=> { // checks the validity of html, requires all tags and property-names to only use alphabetical characters and numbers (and hyphens, underscore for properties)
    html = html.toLowerCase().replace(/(?<=<[^>]+?=\s*"[^"]*)[<>]/g,"").replace(/(?<=<[^>]+?=\s*'[^']*)[<>]/g,""); // remove all angle brackets from tag properties
    html = html.replace(/<script.*?<\/script>/g, '');  // Remove all script-elements
    html = html.replace(/<style.*?<\/style>/g, '');  // Remove all style elements tags
    html = html.toLowerCase().replace(/<[^>]*\/\s?>/g, '');      // Remove all self closing tags
    html = html.replace(/<(\!|br|hr|img).*?>/g, '');  // Remove all <br>, <hr>, and <img> tags
    //var tags=[...str.matchAll(/<.*?>/g)]; this would allow for unclosed initial and final tag to pass parsing
    html = html.replace(/^[^<>]+|[^<>]+$|(?<=>)[^<>]+(?=<)/gs,""); // remove all clean text nodes, note that < or > in text nodes will result in artefacts for which we check and return false
    tags = html.split(/(?<=>)(?=<)/);
    if (tags.length%2==1) {
        console.log("uneven number of tags in "+html)
        return false;
    }
    var tagno=0;
    while (tags.length>0) {
        if (tagno==tags.length) {
            console.log("these tags are not closed: "+tags.slice(0,tagno).join());
            return false;
        }
        if (tags[tagno].slice(0,2)=="</") {
            if (tagno==0) {
                console.log("this tag has not been opened: "+tags[0]);
                return false;
            }
            var tagSearch=tags[tagno].match(/<\/\s*([\w\-\_]+)\s*>/);
            if (tagSearch===null) {
                console.log("could not identify closing tag "+tags[tagno]+" after "+tags.slice(0,tagno).join());
                return false;
            } else tags[tagno]=tagSearch[1];
            if (tags[tagno]==tags[tagno-1]) {
                tags.splice(tagno-1,2);
                tagno--;
            } else {
                console.log("tag '"+tags[tagno]+"' trying to close these tags: "+tags.slice(0,tagno).join());
                return false;
            }
        } else {
            tags[tagno]=tags[tagno].replace(/(?<=<\s*[\w_\-]+)(\s+[\w\_\-]+(\s*=\s*(".*?"|'.*?'|[^\s\="'<>`]+))?)*/g,""); // remove all correct properties from tag
            var tagSearch=tags[tagno].match(/<(\s*[\w\-\_]+)/);
            if ((tagSearch===null) || (tags[tagno]!="<"+tagSearch[1]+">")) {
                console.log("fragmented tag with the following remains: "+tags[tagno]);
                return false;
            }
            var tagSearch=tags[tagno].match(/<\s*([\w\-\_]+)/);
            if (tagSearch===null) {
                console.log("could not identify opening tag "+tags[tagno]+" after "+tags.slice(0,tagno).join());
                return false;
            } else tags[tagno]=tagSearch[1];
            tagno++;
        }
    }
    return true;
})


module.exports=validText;


