import { createServer } from 'http'
import { readFile } from 'fs'
const port = 45678

const server = createServer(function(req, res){

    function sendStuff(fileTitle, fileType){
        console.log("asked for:");
        console.log(fileTitle);
        
        readFile(fileTitle, function(error,data){
            if(error){
                res.writeHead(404)
                res.write("File Not Found")
            }else{
                res.writeHead(200, { 'Content-Type' : fileType })
                res.write(data)
            }
            res.end()
            return;
        })
    }
    if (req.url === "/" || req.url === "/index.html") {
        sendStuff('index.html','text/html');
        return;
    } else if (req.url === "/WARNING.png") {
        sendStuff('WARNING.png','image/png');
        return;
    } else {
        console.log("We don't have "+req.url);
    }


    
})

server.listen(port, function(error){
    if(error){
        console.log('something went wrong', error)
    }
    else{
        console.log('server is listening on port ' + port)
    }
})  