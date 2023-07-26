import React from "react";
import PhotoObject from "./PhotoObject";
import "../App.css";

export default function MainPhotoContainer({photoList, filter, FavoritePhotoList, setFavoritePhotoList, currentScreen, setIsShowingImageInfo, setCurrentImageInfo}) {

    function getPhotosFromList(list, isFavoritesList, filter) {
        let photos = [];
        list.forEach((photo) => {
            if (!filter.split().filter(value => (value !== "" && value !== " ")).length > 0) {
                if (photo.title.includes(filter)) {
                    photos.push(
                        <PhotoObject photoInfo={photo}FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList} isFavoritesList={isFavoritesList} setIsShowingImageInfo={setIsShowingImageInfo} setCurrentImageInfo={setCurrentImageInfo}/>
                    );
                }
            } else {
                photos.push(
                    <PhotoObject photoInfo={photo} FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList} isFavoritesList={isFavoritesList} setIsShowingImageInfo={setIsShowingImageInfo} setCurrentImageInfo={setCurrentImageInfo}/>
                );
            }
        });
        return photos;
    }

    function renderPhotos() {
        let photos = [];
        if (currentScreen === "main") photos = getPhotosFromList(photoList, false, filter);
        else if (currentScreen === "favorites") photos = getPhotosFromList(FavoritePhotoList, true, filter);

        if (photos.length > 0)  return photos;
        else return (<p style={{width: "100%", fontSize: "2rem", textAlign: "center"}}>No results found</p>);
    }

    return (
        <div className="container photo-container">
            <div className="row row-cols-12 row-cols-sm-10 row-cols-md-10 g-0">
                {renderPhotos()}
            </div>
        </div>
    );
}
