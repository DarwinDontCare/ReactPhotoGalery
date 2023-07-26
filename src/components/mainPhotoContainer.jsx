import React from "react";
import PhotoObject from "./PhotoObject";
import "../App.css";

export default function MainPhotoContainer({photoList, filter, FavoritePhotoList, setFavoritePhotoList, currentScreen}) {

    function renderPhotos() {
        let photos = [];

        if (!filter.split().filter(value => (value !== "" && value !== " ")).length > 0) {
            if (currentScreen === "main") {
                photoList.forEach((photo) => {
                    photos.push(
                        <PhotoObject photoInfo={photo} FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
                    );
                });
            } else if (currentScreen === "favorites") {
                FavoritePhotoList.forEach((photo) => {
                    photos.push(
                        <PhotoObject photoInfo={photo} FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
                    );
                });
            }
        } else {
            if (currentScreen === "main") {
                photoList.forEach((photo) => {
                    if (photo.title.includes(filter)) {
                        photos.push(
                            <PhotoObject photoInfo={photo}FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
                        );
                    }
                });
            } else if (currentScreen === "favorites") {
                FavoritePhotoList.forEach((photo) => {
                    if (photo.title.includes(filter)) {
                        photos.push(
                            <PhotoObject photoInfo={photo}FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
                        );
                    }
                });
            }
        }
        if (photos.length > 0)  return photos;
        else return (<p>No results found</p>);
    }

    return (
        <div className="container photo-container">
            <div className="row row-cols-12 row-cols-sm-10 row-cols-md-10 g-0">
                {renderPhotos()}
            </div>
        </div>
    );
}
