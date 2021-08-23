import React, { useState, useEffect } from 'react'
import BookPage from './BookPage'

function MyLibrary({myBooks, setMyBooks}) {

    return (
        <div>
            {(myBooks) &&
                <BookPage 
                  bookList={myBooks} 
                  setMyBooks={setMyBooks}//for updating when deleting
                  headerTitle={"My Library"} 
                  isMyLibrary={true}
                />
            } 
        </div>
    )
}

export default MyLibrary
