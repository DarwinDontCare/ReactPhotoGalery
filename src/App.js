import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React from 'react';
import axios from "axios";
import MainPhotoContainer from './components/mainPhotoContainer';
import InputField from './components/InputField';
import SideBar from './components/SideBar';
import { createContext } from "react";

function App() {

  const [photoList, setPhotoList] = React.useState([]);
  const [FavoritePhotoList, setFavoritePhotoList] = React.useState([]);
  const [filter, setFilter] = React.useState("");
  const [sideBarClassName, setSideBarClassName] = React.useState("sidebar");
  const [currentScreen, setCurrentScreen] = React.useState("main");

  const context = createContext();

  const apiUrl = "https://jsonplaceholder.typicode.com/photos";

  function loadFavoriteImages() {
      let favorites = [];
      try {
          favorites = JSON.parse(localStorage['favoriteImages']);
      } catch {
          localStorage.setItem('favoriteImages', JSON.stringify([]));
      }

      setFavoritePhotoList(favorites);
  }

  function saveFavoriteImages(favorites) {
      try {
          localStorage['favoriteImages'] = JSON.stringify(favorites);
      } catch {
          localStorage.setItem('favoriteImages', JSON.stringify(favorites));
      }
      setFavoritePhotoList(favorites);
  }

  React.useEffect(() => {
    retriveDataFromAPI();
    loadFavoriteImages();
  }, [App]);

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
      <div>
        <InputField setFilter={setFilter} setSideBarClassName={setSideBarClassName} sideBarClassName={sideBarClassName}></InputField>
        <SideBar sideBarClassName={sideBarClassName} setCurrentScreen={setCurrentScreen}/>
        <context.Provider value={{ photoList: photoList,
                                    filter: filter,
                                    FavoritePhotoList: FavoritePhotoList,
                                    currentScreen: currentScreen,
                                    saveFavoriteImages: saveFavoriteImages
                                }}>
          <MainPhotoContainer context={context}/>
        </context.Provider>
      </div>
    </div>
  );
}

//{<Redirect to={{
//  pathname: "/user-profile",
//  state: {
//    currentImageInfo: currentImageInfo,
//    setIsShowingImageInfo: setIsShowingImageInfo,
//    FavoritePhotoList: FavoritePhotoList,
//    setFavoritePhotoList: setFavoritePhotoList
//  }
//}} />}

export default App;
