import React, {useState} from 'react'
import {
    Button,
    Dialog,
    DialogTitle,
    Input
} from '@material-ui/core'
import '../css/book-dialog.css'
import axios from 'axios'

function BookDialog(props) {
    const {open, setOpen, book, isMyLibrary, setMyBooks, myBooks} = props

    const [isEditMode, setIsEditMode] = useState(false)

    const buttonStyle={
        backgroundColor:"#eea83d",
        color:"white",
        fontWeight:"bold",
        fontSize:"20px",
        width:"100%",
        borderTopRightRadius:"0px",
        borderTopLeftRadius:"0px",
    }
    const buttonStyle2={
        backgroundColor:"black",
        color:"white",
        fontWeight:"bold",
        fontSize:"20px",
        width:"100%",
        borderRadius:"0px"
    }
    const applyButtonStyle={
        backgroundColor:"#00FF7F",
        color:"white",
        fontWeight:"bold",
        fontSize:"20px",
        width:"50%",
        borderRadius:"0px"
    }
    const cancelButtonStyle={
        backgroundColor:"#D70040",
        color:"white",
        fontWeight:"bold",
        fontSize:"20px",
        width:"50%",
        borderRadius:"0px"
    }

    const previewButtonStyle={
        color:"white",
        fontSize:"20px",
        fontWeight:"bold"
    }

    const inputStyle={
        color:"white",
        fontSize:"1.2vw",
        fontFamily:"Helvetica",
        width:"100%"
    }

    const handleClose = () =>{
        setOpen(false)
        setIsEditMode(false)
    }

    const setEditMode = () =>{
        setIsEditMode(editMode => !editMode)
    }

    const addBook = () =>{
        // bad solution, but id changes when added to database....
        if(!myBooks.find(currentBook=>currentBook.volumeInfo.title === book.volumeInfo.title)){
            setMyBooks(myBooks=>myBooks.concat([book]))
            const url = new URL('http://localhost:8080/books/add')
            axios.post(url, book)
        }
        handleClose()
    }

    const removeBook = () =>{
        //gotta remove by id. Make a new firebase account on personal goog acc
        const url = new URL('http://localhost:8080/books/delete')
        url.searchParams.append('id', book.id)
        axios.delete(url)
        setMyBooks(booksList => booksList.filter(currentBook=>currentBook.id !== book.id ))
        handleClose()
    }
    const newWindow = (link)=>{
        window.open(link)
    }

    // const fetchLargeImage = (book)=>{
    //     const url = book.selfLink;
    //     console.log(url.toString())
    //     // axios.get(url)
    //     // .then(response=>{
    //     //     const imgURL = response.data.volumeInfo.imageLinks.large
    //     //     setImageURL(imgURL)
    //     // })
    //     // .catch(err=>{
    //     //     console.log("Error fetching large image: ",err)
    //     // })
    //     // return null;
    // }
    const updateBook = (e) =>{
        e.preventDefault()
        const title = e.target["book-title-input"].value
        const desc = e.target["book-description-input"].value
        const url = new URL('http://localhost:8080/books/edit')
        axios.put(url, {id: book.id, title:title, description: desc})
        setMyBooks(myBooks=> myBooks.map(currentBook=>{
            if(currentBook.id === book.id){
                const copy = currentBook
                copy.volumeInfo.title = title
                copy.volumeInfo.description = desc
                return copy
            }
            return currentBook
        }))
        handleClose()
    }

    return (
        <div>
            <Dialog  
                PaperProps={{
                    style: {
                    backgroundColor: 'transparent',
                    },
                }}
                onClose={handleClose} 
                open={open} 
                fullWidth={false} 
                maxWidth={false}
            >
               <form onSubmit={updateBook}>
                    <div id="dialog-root" style={{borderRadius:"10px",backgroundColor:"#1d1d1d", color:"white"}}>
                            <DialogTitle id="book-dialog-title">
                                {isEditMode
                                ?<Input id="book-title-input" style={inputStyle} defaultValue={book.volumeInfo.title}/>
                                :<div>{book.volumeInfo.title}</div>
                                }
                            </DialogTitle>
                            <div className="wrapper">
                                <div className="box book-cover">
                                    {book.volumeInfo.imageLinks 
                                        ?<img className="book-image" src={book.volumeInfo.imageLinks.thumbnail}/>
                                        :
                                            <div className="placeholder-container">
                                                <div className="placeholder-text">
                                                        No Image Available
                                                </div>
                                            </div>
                                    }
                                </div>
                                <div className="box book-desc">
                                    {isEditMode
                                    ? <Input id="book-description-input" style={inputStyle} defaultValue={book.volumeInfo.description} multiline={true}/>
                                    : <div>{book.volumeInfo.description}</div>
                                    }
                                </div>
                                <div className="box purchase-links">
                                    <Button onClick={()=>newWindow(book.volumeInfo.previewLink)} style={previewButtonStyle}>Preview</Button>
                                </div>
                            </div>
                            {isMyLibrary
                            ?<div>
                                {isEditMode
                                ?<div>
                                    <Button type="submit" style={applyButtonStyle}>Apply Changes</Button>
                                    <Button style={cancelButtonStyle} onClick={setEditMode}>Cancel Changes</Button>
                                </div>
                                :<Button style={buttonStyle2} onClick={setEditMode}>Edit Book</Button>
                                }
                                <Button style={buttonStyle} onClick={removeBook}>Remove Book From My Library</Button>
                            </div>
                            :<Button style={buttonStyle} onClick={addBook}>Add Book to My Library</Button>
                            }
                    </div>
                </form>
            </Dialog>
        </div>
    )
}

export default BookDialog
