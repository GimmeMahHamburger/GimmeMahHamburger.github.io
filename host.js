import { createServer } from 'http'
import { readFile } from 'fs'
const port = 45678

const dict = {
    "/":["index.html","text/html"],
    "/index.html":["index.html","text/html"],
    "/WARNING.png":["WARNING.png","image/png"],
    "/favicon.ico":["favicon.png","image/png"],
    "/second.html":["second.html","text/html"],
    "/prose.html":["prose.html","text/html"],
    "/style.css":["style.css","text/css"],
    "/programmingProjects.html":["programmingProjects.html","text/html"]
}

const server = createServer(function(req, res){

    function sendStuff(fileTitle, fileType){
        console.log("asked for:");
        console.log(fileTitle);
        console.log("of type:");
        console.log(fileType);
        
        readFile(fileTitle, function(error,data){
            if(error){
                res.writeHead(404)
                res.write("File Not Found: " + req.url)
                console.log("could not find " + req.url)
            }else{
                res.writeHead(200, { 'Content-Type' : fileType })
                res.write(data)
            }
            res.end()
            return;
        })
    }
    sendStuff(dict[req.url][0],dict[req.url][1]);    
})

server.listen(port, function(error){
    if(error){
        console.log('something went wrong', error)
    }
    else{
        console.log('server is listening on port ' + port)
    }
})  