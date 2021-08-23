//to do : integrate multiple different servers with different "url roots"
//awesome tutes: https://firebase.google.com/docs/firestore/query-data/get-data
const db = require('./firebase.js')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

//Firebase
const booksRef = db.collection('books')

app.use(cors())
app.use(express.json())//support for receiving json data in post request

//Fetch all data from book collection. async in order to use await
app.get('/books/get', async (req,res)=>{
    try{
        const allBooks = await booksRef.get();
        const booksList = [];
        allBooks.forEach(doc=>{
            // console.log(doc.id,'=>',doc.data())
            booksList.push({...doc.data(), id: doc.id})
        })
        res.send(booksList)
    }catch(err){
        console.log("Error: ", err)
        res.sendStatus(500)
    }
})

//add data (post). Client sents book object. Server adds to Firebase cloud storage
app.post('/books/add', async(req,res)=>{
    try{
        const newBook = req.body
        const addBook = await booksRef.add(newBook);
        // const newBookRef = booksRef.doc(addBook.id)
        console.log("Added book with id: ",addBook.id) 

        // const addTimeAndId = newBookRef.update({
        //     firestoreID: addBook.id,
        //     timestamp: firebase.firestore.FieldValue.serverTimestamp()
        // });
        res.sendStatus(200)
    }catch(err){
        console.log("Error: ", err)
        res.sendStatus(500)
    }
})

//edit/update data (put)
app.put('/books/edit', async(req, res)=>{
    try{
        const {id, title, description} = req.body;
        const updateBook = await booksRef.doc(id).update({
            'volumeInfo.title': title,
            'volumeInfo.description': description
        })
        // const {id, ...editFields} = req.body;
        // const updateBook = await booksRef.doc(id).update(editFields)
        console.log('Updated book with id: ', id)
        res.sendStatus(200)
    }catch(err){
        console.log("Error: ", err)
        res.sendStatus(500)
    }
})

//remove data (delete)
app.delete('/books/delete', async(req, res)=>{
    try{
        const id = req.query.id
        const deleteBook = await booksRef.doc(id).delete()
        console.log('Deleted book with id: ', id)
        res.sendStatus(200)
    }catch(err){
        console.log("Error: ", err)
        res.sendStatus(500)
    }
})

app.listen(port, ()=>{
    console.log(`Example app listening at http://localhost:${port}`)
})