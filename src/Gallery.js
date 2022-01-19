import { useEffect, useState } from 'react';
import axios from "axios";

import { capitalize } from './utility/capitalize';
import { sortAlphabetically } from './utility/sortAlphabetically';
import stylesheet from './Gallery.module.css';
import Checkbox from './components/Checkbox';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = 'aylinmarie';
const base = 'https://api.ravelry.com';
const url = base + '/people/' + username + '/favorites/list.json';


const Gallery = () => {
  const [ items, setItems ] = useState([]); 
  const [ filterBy, setFilterBy ] = useState([]);
  const [ error, setError ] = useState(null);
  let DESIGNERS = [];
  let TYPE = [];


  // Set filter for creators
  if(items) {
    DESIGNERS.push(items.map(item => item.favorited.designer.name))
  }
  const CREATORS = sortAlphabetically([...new Set(DESIGNERS[0])]);

  // Set filter for types
  if(items) {
    TYPE.push(items.map(item => item.tag_list))
  }
  const TYPES = sortAlphabetically([...new Set(TYPE[0])]);

  // Filter patterns
  const updateFilter = (item) => {
    if(filterBy.includes(item)) {
      setFilterBy((prevValues) => prevValues.filter((v) => v !== item));
    } else {
      setFilterBy((prevValues) => [...prevValues, item]);
    }
  }

  // TO-DO: Refactor to be an AND conditional
  const FILTERED_ITEMS = filterBy.length > 0 ? items.filter(item => filterBy.includes(item.favorited.designer.name) || filterBy.includes(item.tag_list)) : items;

  // Fetch data
  useEffect(() => {
    axios(url, {
      auth: {
          username: usernameKey,
          password: passwordKey
      }
  }).then((response, error) => {
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
      <div>
        <fieldset className={stylesheet.filter}>
          <legend>Creators</legend>
            {CREATORS.map(creator => {
              return <Checkbox key={creator} label={capitalize(creator)} value={filterBy.includes(creator)} onChange={() => updateFilter(creator)}/>
              })}
        </fieldset>
        <fieldset className={stylesheet.filter}>
          <legend>Type</legend>
            {TYPES.map(type => {
              return type && <Checkbox key={type} label={capitalize(type)} value={filterBy.includes(type)} onChange={() => updateFilter(type)}/>
              })}
        </fieldset>
      </div>
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
