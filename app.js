// app.js
const express = require('express')
const app = express()
const port = 3000

function diff(req, res) {
  const resTimeStamp = Date.now();
  const diffTime = resTimeStamp - res.locals.reqMsg.timeStamp
  console.log(`Date: ${res.locals.reqMsg.date} | ${res.locals.reqMsg.method} from "${res.locals.reqMsg.url}" | Total time : ${diffTime} ms`)
  res.end();
}

app.use((req, res, next) => {
  const date = new Date().toLocaleString()
  const timeStamp = Date.now();
  res.locals.reqMsg = {
    timeStamp,
    date,
    method: req.method,
    url: req.url
  }
  next();
})


app.get('/new', (req, res, next) => {
  res.send(`新增 Todo 頁面`);
  console.log('new')
  next();

}, diff)

app.get('/:id', (req, res, next) => {
  const id = req.params.id
  res.send('顯示一筆 Todo')
  console.log(`${id}`)
  next()
}, diff)
app.get('/', (req, res, next) => {
  res.send(`<h1>列出全部 Todo</h1>
        <form action="/" method="post">
        <input type="submit" value="送出資料">
          </form>`);
  console.log('all')
  next();
}, diff)

app.post('/', (req, res, next) => {
  res.send('新增一筆  Todo')
  console.log('post new')
  next()
}, diff)
app.listen(port, () => {
  console.log(`App running on port ${port}`)
})