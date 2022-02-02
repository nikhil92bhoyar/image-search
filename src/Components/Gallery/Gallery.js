import React from 'react'

import './styles.css'

const Gallery = (props) => {
  const { gallery, loadMore, searchedQuery } = props  
  return (
    <div className="content">
      <div className="row">
        {gallery.length ? gallery.map( (image, index) => (
          <div
            key={image.id}
            className={`col-xs-12 col-md-3 col-sm-4 col-lg-3 item`}
          >
            <img
              src={image.urls.small}
              alt={image.description}                           
            />
          </div>
        )) : (
          <div className="error card text-danger mb-3 mx-auto" style={{maxWidth: '18rem',}}>
              {/* some error code here */}
          </div>
        )}
      </div>
      {searchedQuery !== '' && <button type="button" className="btn btn-primary" onClick={loadMore}>Load more</button>     } 
    </div>
  )
}

export default Gallery