import './App.css';
import React from 'react';
import axios from "axios";
import MainPhotoContainer from './components/mainPhotoContainer';
import InputField from './components/InputField';

function App() {

  const [photoList, setPhotoList] = React.useState([]);
  const [FavoritePhotoList, setFavoritePhotoList] = React.useState([]);
  const [filter, setFilter] = React.useState("");

  const apiUrl = "https://jsonplaceholder.typicode.com/photos";

  React.useEffect(() => {
    retriveDataFromAPI();
  }, []);

  function retriveDataFromAPI() {
    axios.get(apiUrl).then((response) => {
      let photos = [];
      console.log(response.data[0]);
      for (let i = 0; i < 500; i++) {
        photos.push({
          image: response.data[i].url,
          title: response.data[i].title,
          thumbnail: response.data[i].thumbnailUrl,
          id: response.data[i].id
        });
      };
      setPhotoList(photos);
    });
  }

  return (
    <div className="App">
      <InputField setFilter={setFilter}></InputField>
      <br/>
      <MainPhotoContainer photoList={photoList} filter={filter} FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
    </div>
  );
}

export default App;
