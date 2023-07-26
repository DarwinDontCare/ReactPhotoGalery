import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import axios from "axios";
import MainPhotoContainer from './components/mainPhotoContainer';
import InputField from './components/InputField';
import SideBar from './components/SideBar';

function App() {

  const [photoList, setPhotoList] = React.useState([]);
  const [FavoritePhotoList, setFavoritePhotoList] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [sideBarClassName, setSideBarClassName] = React.useState("sidebar-closed");
  const [currentScreen, setCurrentScreen] = React.useState("main");

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
      <InputField setFilter={setFilter} setSideBarClassName={setSideBarClassName} sideBarClassName={sideBarClassName}></InputField>
      <SideBar sideBarClassName={sideBarClassName} setCurrentScreen={setCurrentScreen}/>
      <MainPhotoContainer photoList={photoList} filter={filter} FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList} currentScreen={currentScreen}/>
    </div>
  );
}

export default App;
