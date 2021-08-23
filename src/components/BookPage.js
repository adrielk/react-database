import React, {useState} from 'react'
import BookCard from './BookCard'
import BookDialog from './BookDialog'
import '../css/book-page.css'

function BookPage({bookList, setMyBooks, headerTitle, isMyLibrary, myBooks}) {
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedBook, setSelectedBook] = useState(null)

    const onBookClick = (book) =>{
        console.log(book.volumeInfo.title)
        setSelectedBook(book)
        setDialogOpen(true)
    }

    return (
        <>
            <div className='flex-page'>
            <h1 className="catalog-title">{headerTitle}</h1>

                {
                    bookList.map((book)=>{
                        return(
                            <BookCard onBookClick={onBookClick} key={book.id} {...{book}}/>
                        )
                    })
                }
            </div>
            {selectedBook && 
                <BookDialog 
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    book={selectedBook}
                    isMyLibrary={isMyLibrary}
                    bookList={bookList}
                    myBooks={myBooks}
                    setMyBooks={setMyBooks}
                />
            }
        </>
    )
}

export default BookPage
