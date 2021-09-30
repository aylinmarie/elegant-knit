import { useEffect, useState } from 'react';
import stylesheet from './App.module.css';
import Select from './components/Select';

const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = process.env.REACT_APP_RAVELRY_USERNAME;
const base = 'https://api.ravelry.com';


const Gallery = () => {
  const [ items, setItems ] = useState([]); 
  const [filterBy, setFilterBy ] = useState('all');
  const DESIGNERS = [];

  // Fetch Data
  async function getData(base, authUsername, authPassword, username) {
    const url = base + '/people/' + username + '/favorites/list.json';
    const headers = new Headers();
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
  const FILTERED_ITEMS = filterBy !== 'all' ? items.filter(item => item.favorited.designer.name === filterBy) : items;

  const updateFilter = (e) => {
    const selectedCreator = e.target.value;
    if(selectedCreator === 'all') {
      setFilterBy('all')
    } else {
      setFilterBy(selectedCreator)
    }
  }

  // Get data
  useEffect(() => {
    getData(base, usernameKey, passwordKey, username);
  },[])

  return items && (
    <div className={stylesheet.wrapper}>
      <div>
        <h2>Creators</h2>
        <Select name="creators" value={filterBy} onChange={updateFilter}>
          <option value="all">All</option>
          {CREATORS.map(creator => {
             return <option key={creator}>{creator}</option>
             })}
        </Select>
      </div>
      <h2 className="visuallyHidden">Gallery of Knit Patterns</h2>
      <div className={stylesheet.gallery}>
        {FILTERED_ITEMS.map(item => {
            return item.type === 'pattern' ? (
              <a key={item.favorited.name} 
                href={`https://www.ravelry.com/patterns/library/${item.favorited.permalink}`}
                target="_blank" 
                rel="noreferrer"
                className={stylesheet.link}>
                <li className={stylesheet.card}>
                  <img src={item.favorited.first_photo.medium2_url} alt=""/>
                  <div>
                    <p>{item.favorited.name}</p>
                    <p className={stylesheet.designer}>
                      <span className="visuallyHidden">Designer: </span>
                      {item.favorited.designer.name}
                    </p>
                  </div>
                </li>
              </a>
          ) : null
        })}
      </div>
    </div>
  );
}

export default Gallery;
