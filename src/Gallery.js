import { useEffect, useState } from 'react';
import stylesheet from './Gallery.module.css';
import Checkbox from './components/Checkbox';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = 'aylinmarie';
const base = 'https://api.ravelry.com';


const Gallery = () => {
  const [ items, setItems ] = useState([]); 
  const [filterBy, setFilterBy ] = useState([]);
  const DESIGNERS = [];

  // Fetch Data
  async function getData(base, authUsername, authPassword, username) {
    const url = base + '/people/' + username + '/favorites/list.json';
    const headers = new Headers({'Content-Type': 'application/json'});
    // This is the HTTP header that you need add in order to access api.ravelry.com with a read only API key
    // `btoa` will base 64 encode a string: https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
    headers.append('Authorization', 'Basic ' + btoa(authUsername + ":" + authPassword));

    fetch(url, { method: 'GET', headers: headers }).then(res => {
      if(res.ok) {
        return res.json();
      }
      throw res;
    }).then( data => {
      setItems(data.favorites);
    }).catch(error => {
      console.log("Yikes - there is an error with loading your data:", error)
    })
  };

  // Set filter for creators
  DESIGNERS.push(items.map(item => item.favorited.designer.name))
  const CREATORS = [...new Set(DESIGNERS[0])];

  const updateFilter = (item) => {
    if(filterBy.includes(item)) {
      setFilterBy((prevValues) => prevValues.filter((v) => v !== item));
    } else {
      setFilterBy((prevValues) => [...prevValues, item]);
    }
  }
  const FILTERED_ITEMS = filterBy.length === 0 ? items : items.filter(item => filterBy.includes(item.favorited.designer.name));

  // Get data
  useEffect(() => {
    getData(base, usernameKey, passwordKey, username);
  },[])

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
            return item.type === 'pattern' ? (
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
            ) : null
          })}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

export default Gallery;
