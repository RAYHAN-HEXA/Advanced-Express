import app from "./app"
import config from "./Config"
import { intidb } from "./db";


const main = async ()=>{
  intidb();
  app.listen(config.port, () => {
  console.log(`Example app listening on port ${config.port}`)
})
}


main();