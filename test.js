
let path = require("path")

let http = require("http")


l

/*

let app = http.createServer();

let routes = {
  "/": function (req, res) {
    res.setHeader( "Access-Control-Allow-Origin", "*")
    res.writeHead(202) 
    res.end("Its working, good job...")
  },
  "/test": (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*"
    })
    res.end("L'applucation est en marche!")
  }
}


app.on("request", function (request, response) {

  console.log(request.url)



  if (request.url === "/") {
    return routes["/"](request, response);
  }

  response.writeHead(404, {
    "Access-Control-Allow-Origin": "*"
  })
  response.end(http.STATUS_CODES[404])



})

app.listen(7000, () => {
  console.log("Ok its running at :7000 !")
})





console.log(process.argv)






/*
let array = ["/path/locals/api"]
let split = array[0].split(path.sep);

console.log(split)
console.log(split.pop())
console.log(split)




*/