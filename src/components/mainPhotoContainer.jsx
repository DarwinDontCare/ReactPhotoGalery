import React from "react";
import PhotoObject from "./PhotoObject";
import "../App.css";

export default function MainPhotoContainer({photoList, filter, FavoritePhotoList, setFavoritePhotoList}) {

    function renderPhotos() {
        let photos = [];

        if (!filter.split().filter(value => (value !== "" && value !== " ")).length > 0) {
            photoList.forEach((photo) => {
                photos.push(
                    <PhotoObject photoInfo={photo} FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
                );
            });
        } else {
            photoList.forEach((photo) => {
                if (photo.title.includes(filter)) {
                    photos.push(
                        <PhotoObject photoInfo={photo}FavoritePhotoList={FavoritePhotoList} setFavoritePhotoList={setFavoritePhotoList}/>
                    );
                }
            });
        }
        if (photos.length > 0)  return photos;
        else return (<p>No results found</p>);
    }

    return (
        <div className="photo-container">
            {renderPhotos()}
        </div>
    );
}
