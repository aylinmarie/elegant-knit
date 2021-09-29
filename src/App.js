import { useEffect, useState } from 'react';
import stylesheet from './App.module.css';

const usernameKey = process.env.REACT_APP_RAVELRY_USERNAME_KEY;
const passwordKey = process.env.REACT_APP_RAVELRY_PASSWORD_KEY;
const username = process.env.REACT_APP_RAVELRY_USERNAME;
const base = 'https://api.ravelry.com';


const App = () => {
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
    <div className={stylesheet.app}>
      <header>
        <h1>Elegant Knits</h1>
      </header>
      <section>
        <p className={stylesheet.intro}>Collection of minimal and timeless knit patterns for women. This was a personal project of mine using the <a href="https://www.ravelry.com/groups/ravelry-apihttps://www.ravelry.com/groups/ravelry-api" target="_blank" rel="noreferrer">Ravelery API</a> to help group similar styled knits that are wearable and modern.</p>
      </section>
      <section>
        <div className={stylesheet.grid}>
          {items.map(item => {
             return (
              <figure key={item.favorited.name}>
                <img src={item.favorited.first_photo.medium2_url} alt=""/>
               <figcaption>
                 <p>{item.favorited.name}</p>
                 <p className={stylesheet.designer}><span className="visuallyHidden">Designer: </span>{item.favorited.designer.name}</p>
                 </figcaption>
              </figure>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default App;
