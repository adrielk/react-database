import React, { useState } from 'react'
import '../css/book-card.css'

function BookCard({book, onBookClick}) {

    const processTitle = (title) =>{
        try{
            const maxWords = 10;
            const titleLength = title.split(" ").length;
            const titleCut = title.split(" ", maxWords).join(" ")

            if(titleLength > maxWords)
                return titleCut+" ..."
            return titleCut;
        }catch{
            return ""
        }
    }

    const handleClick = (event) =>{
        onBookClick(book)
    }

    return (
        <>{(book) &&
            <div onClick={handleClick} className="flexbox-item">
                    {book.volumeInfo.imageLinks 
                        ?<img className="book-image" src={book.volumeInfo.imageLinks.thumbnail}/>
                        :
                            <div className="placeholder-container">
                                <div className="placeholder-text">
                                        No Image Available
                                </div>
                            </div>
                    }
                    <h3 className="book-title">{processTitle(book.volumeInfo.title)}</h3>
            </div>
          }
        </>
    )
}

export default BookCard
