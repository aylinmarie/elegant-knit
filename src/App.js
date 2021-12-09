import React, {useEffect} from 'react';
import stylesheet from './App.module.css';
import Gallery from './Gallery';

const App = () => {

  const makeAPICall = async () => {
    try {
      const response = await fetch('http://localhost:8080/cors', {mode:'cors'});
      const data = await response.json();
      console.log({ data })
    }
    catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    makeAPICall();
  }, [])
  
  return (
    <>
      <header>
        <h1>Elegant Knits</h1>
      </header>
      <div className={stylesheet.app}>
      <main>
        <div>
          <p className={stylesheet.intro}>Collection of minimal and timeless knit patterns for women. This was a personal project of mine using the <a href="https://www.ravelry.com/groups/ravelry-apihttps://www.ravelry.com/groups/ravelry-api" target="_blank" rel="noreferrer">Ravelry API</a> to help group similar styled modern knits.</p>
        </div>
        <Gallery/>
      </main>
      </div>
    </>
  );
}

export default App;
