import "./App.css";
import Row from "./Row";
import requests from "./requests";
import Banner from "./Banner";

//fetchUrl gets the api url from requests.js
function App() {
  return (
    <div className="app">
      {/*nav*/}
      <Banner />
      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
      ></Row>
      <Row title="Trending Now" fetchUrl={requests.fetchTrending}></Row>
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated}></Row>
      <Row title="Action movies" fetchUrl={requests.fetchActionMovies}></Row>
      <Row title="Comedy movies" fetchUrl={requests.fetchComedyMovies}></Row>
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies}></Row>
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies}></Row>
      <Row title="Documentaries" fetchUrl={requests.fetchDocumantaries}></Row>
    </div>
  );
}

export default App;
