import { useEffect, useState } from 'react';
import axios from "axios";

import stylesheet from './Gallery.module.css';
import Checkbox from './components/Checkbox';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const Gallery = () => {
  const [ items, setItems ] = useState([]); 
  const [ filterBy, setFilterBy ] = useState([]);
  const [ error, setError ] = useState(null);
  let DESIGNERS = []
  
  // Set filter for creators
  items ? DESIGNERS.push(items.map(item => item.favorited.designer.name)) : DESIGNERS = []

  const CREATORS = [...new Set(DESIGNERS[0])];

  const updateFilter = (item) => {
    if(filterBy.includes(item)) {
      setFilterBy((prevValues) => prevValues.filter((v) => v !== item));
    } else {
      setFilterBy((prevValues) => [...prevValues, item]);
    }
  }
  const FILTERED_ITEMS = filterBy.length === 0 ? items : items.filter(item => filterBy.includes(item.favorited.designer.name));

  // Fetch data
  useEffect(() => {
    axios.get("/data").then((response, error) => {
      setItems(response.data.favorites)
    }).catch(error => {
      setError(error);
    });
  }, []);

  // If data cannot be retrieved, return error message
  if (error) { return error } 

  // Return patterns
  return items && (
    <div className={stylesheet.wrapper}>
      <fieldset className={stylesheet.filter}>
        <legend>Creators</legend>
          {CREATORS.map(creator => {
            return <Checkbox key={creator} label={creator} value={filterBy.includes(creator)} onChange={() => updateFilter(creator)}/>
            })}
      </fieldset>
      <h2 className="visuallyHidden">Gallery of Knit Patterns</h2>
      <ResponsiveMasonry
        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
      >
        <Masonry gutter="24px">
          {FILTERED_ITEMS.map(item => {
            return item.type === 'pattern' && (
              <a key={item.favorited.name} 
                href={`https://www.ravelry.com/patterns/library/${item.favorited.permalink}`}
                target="_blank" 
                rel="noreferrer"
                className={stylesheet.link}>
                <div className={stylesheet.card}>
                  <img src={item.favorited.first_photo.medium2_url} alt=""/>
                  <div>
                    <p>{item.favorited.name}</p>
                    <p className={stylesheet.designer}>
                      <span className="visuallyHidden">Designer: </span>
                      {item.favorited.designer.name}
                    </p>
                  </div>
                </div>
              </a>
            )
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  )
}

export default Gallery;
