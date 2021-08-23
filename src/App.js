import React, { useState, useEffect } from 'react';
import BookPage from './components/BookPage'
import NavBar from './components/NavBar'
import MyLibrary from './components/MyLibrary'
import axios from 'axios';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//styles
import './css/app.css'

//Future to do:
// - ordering books so that they are consistent upon refresh
// - pagination for more books
// - big image of cover for dialog. Display more fields like author and date, etc...
// - more edit attributes and scale up support. 
// - make no image more appealing

// function BooksList({list}){
//   return(
//     <>
//       <ul>
//         {list.map((book)=>{
//             return (
//               <li style={{backgroundColor:"white"}}key={book.id}>Title: {book.volumeInfo.title} / Author: {book.volumeInfo.authors[0]}</li>
//             )
//           })
//         }
//       </ul>
//     </>
//   )
// }

function App() {
  const [googleBooks, setGoogleBooks] = useState(null)
  const [myBooks, setMyBooks] = useState([])

  useEffect(()=>{
    fetchGoogleBooks("tech")
    fetchMyBooks()
  }, [])

  useEffect(()=>{
    fetchMyBooks()
  },[myBooks])
  
  const fetchGoogleBooks = (searchWord) =>{
    const batches = 1
    const batchSize = 40
    let bookList = []

    //this solution sucks. fix wtih async and await. Know your shit https://zellwk.com/blog/async-await-express/
    
    for(let i = 0; i<batches;i++){
      const url = new URL('https://www.googleapis.com/books/v1/volumes')
      url.searchParams.append('q', searchWord)
      url.searchParams.append('maxResults', batchSize)
      url.searchParams.append('startIndex', i*batchSize)
      axios.get(url)
      .then(response=>{
        // setGoogleBooks(response.data)
        bookList = bookList.concat(response.data.items)
        if(i === batches-1)
          setGoogleBooks(bookList)
        
      })
      .catch(err=>{
        console.log("Error: ",err)
      })
    }

  }

  const fetchMyBooks = () =>{
      const url = new URL('http://localhost:8080/books/get/')
      axios.get(url)
        .then(response=>{
          setMyBooks(response.data)
        })
        .catch(err=>{
          console.log("Error: ", err)
        })
    }

  return (
    <>
        <Router>
            <NavBar {...{fetchGoogleBooks}}/>
            <Switch>
              <Route exact path="/">
                {/* <SearchPage {...{fetchGoogleBooks}}/> */}
                  {(googleBooks) &&
                    <BookPage 
                      bookList={googleBooks} 
                      setMyBooks={setMyBooks}
                      myBooks={myBooks} 
                      headerTitle={"Library Catalog"}
                    />
                  } 
                </Route>
              <Route path="/library">
                <MyLibrary {...{myBooks, setMyBooks}}/>
              </Route>
            </Switch>
        </Router>
    </>
);
}

export default App;
