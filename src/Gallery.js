import { useEffect, useState } from 'react';
import stylesheet from './App.module.css';

const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = process.env.REACT_APP_RAVELRY_USERNAME;
const base = 'https://api.ravelry.com';


const Gallery = () => {
  const [ items, setItems ] = useState([]); 

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
      setItems(data.favorites)
    }).catch(error => {
      console.log("Yikes - there is an error with loading your data:", error)
    })
  };
  
  useEffect(() => {
    getData(base, usernameKey, passwordKey, username);
  },[])
  console.log(items)

  return items && (
    <div className={stylesheet.wrapper}>
      {/* <aside>
        <h2>Filter</h2>
        <ul>
          <li>test</li>
        </ul>
      </aside> */}
      <h2 className="visuallyHidden">Gallery of Knit Patterns</h2>
      <div className={stylesheet.gallery}>
        {items.map(item => {
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
