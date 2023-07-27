import React from "react";
import PhotoObject from "./PhotoObject";
import "../App.css";
import { useContext } from "react";

export default function MainPhotoContainer({context}) {

    const {photoList} = useContext(context);
    const {filter} = useContext(context);
    const {currentScreen} = useContext(context);
    const {FavoritePhotoList} = useContext(context);

    function getPhotosFromList(list) {
        let photos = [];
        list.forEach((photo) => {
            if (filter.split().filter(value => (value !== "" && value !== " ")).length > 0) {
                console.log(filter);
                if (photo.title.includes(filter)) {
                    photos.push(
                        <PhotoObject photoInfo={photo} context={context}/>
                    );
                }
            } else {
                photos.push(
                    <PhotoObject photoInfo={photo} context={context}/>
                );
            }
        });
        return photos;
    }

    function renderPhotos() {
        let photos = [];
        if (currentScreen === "main") photos = getPhotosFromList(photoList, false);
        else if (currentScreen === "favorites") photos = getPhotosFromList(FavoritePhotoList, true);

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
