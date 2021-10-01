import stylesheet from './App.module.css';
import Gallery from './Gallery';

const App = () => {
  return (
    <>
      <header>
        <h1>Elegant Knits</h1>
      </header>
      <div className={stylesheet.app}>
      <main>
        <div>
          <p className={stylesheet.intro}>Collection of minimal and timeless knit patterns for women. This was a personal project of mine using the <a href="https://www.ravelry.com/groups/ravelry-apihttps://www.ravelry.com/groups/ravelry-api" target="_blank" rel="noreferrer">Ravelery API</a> to help group similar styled modern knits.</p>
        </div>
        <Gallery/>
      </main>
      </div>
    </>
  );
}

export default App;
