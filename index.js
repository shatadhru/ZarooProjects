const server = require("./app");
const PORT = 3000;

server.listen(PORT , () =>{ 
    console.log(`Server is unning at http://localhost:${PORT}`)
})