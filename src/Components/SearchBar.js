import React from 'react'

const SearchBar = (props) => {
  const {handleChange, handleSubmit, currentQuery } = props
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">        
        <form className="form-search" onSubmit={handleSubmit}>
          <input className="form-control mr-sm-2" placeholder='Search for photos' type="search" aria-label="Search" value={currentQuery} onChange={handleChange} autoFocus/>
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit"><i className="fa fa-search"></i></button>
        </form>
      </div>
    </nav>
  
  )
}

export default SearchBar