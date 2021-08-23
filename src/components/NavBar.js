import React, { useState } from 'react';

import {
  useHistory
} from "react-router-dom";

import {
  Input,
  Button,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core"
import SearchIcon from '@material-ui/icons/Search';

function NavBar({fetchGoogleBooks}){
    const history = useHistory()
    const appbarStyle={
      backgroundColor:"#1d1d1d",
      color:"white",
      borderRadius:"5px",
      margin:"0",
      minWidth:"700px"
    }
    const appTitleStyle={
      fontFamily:"Squada One", 
      letterSpacing:"3px",
      fontSize:"50px",
    }
    const buttonStyle={
      color:"white",
      fontFamily:"Helvetica",
      fontSize:"20px",
      marginLeft:"20px",
    }
    const handleClick = () =>{
        history.push("./")
    }

    return(
      <AppBar style={appbarStyle} position="sticky">
        <Toolbar>
          <Typography style={appTitleStyle} variant="h4">
            <div className="logo-button" onClick={handleClick}>
                Librar<span style={{color:"#eea83d"}}>y</span>
                <span style={{fontSize:"12px", letterSpacing:"5px"}}>STREAM</span>
            </div>
          </Typography>
          <div className="spacer"/>
          <SearchBar {...{fetchGoogleBooks}}/>
          <Button onClick={()=>history.push("/library")} style={buttonStyle}>My Library</Button>
        </Toolbar>
      </AppBar>
    )
  }

  function SearchBar({fetchGoogleBooks}){
    const history = useHistory()
    const [searchOpen, setSearchOpen] = useState(false)
    const searchStyle={
      backgroundColor:"black",
      borderRadius:"30px",
      padding:"7px",
      color:"#f7f7f7",
      fontFamily:"Helvetica",
      fontWeight:"bold",
      top:"3px"
    }
    const buttonStyle={
      color:"white",
      fontFamily:"Helvetica",
    }
    const iconStyle={
        fontSize:"40px"
    }
    
    const handleSubmit = (e) => {
      const searchWord = e.target["book-search"].value;
      e.target["book-search"].value = "";
      e.preventDefault()
      fetchGoogleBooks(searchWord)
      setSearchOpen(false)
      history.push("./")
    }

    const handleClick = () =>{
        setSearchOpen(searchOpen=>!searchOpen)
    }
    return(
      <>
        <form onSubmit={handleSubmit}>
          {searchOpen &&
            <Input style={searchStyle} id="book-search" placeholder="Search Book"/>
          }
          <Button onClick={handleClick} style={buttonStyle}>
            <SearchIcon style={iconStyle}/>
          </Button>
        </form>
      </>
    )
  }
  
  export default NavBar