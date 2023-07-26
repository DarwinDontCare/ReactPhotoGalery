import React, { useEffect, useState } from "react";
import "../App.css";

export default function PhotoObject({photoInfo, FavoritePhotoList, setFavoritePhotoList, isFavoritesList,  setIsShowingImageInfo, setCurrentImageInfo}) {
    const [ButtonImage, setButtonImage] = useState("⬜");

    const image = photoInfo.image;
    const name = photoInfo.title;
    const thumbnail = photoInfo.thumbnail;
    const id = photoInfo.id;

    async function loadFavoriteImages() {
        try {
            if (FavoritePhotoList.filter(photo => photo.id === id).length > 0) setButtonImage("⭐");
        } catch {}
    }

    useEffect(() => {
        if (ButtonImage === "⬜" && !isFavoritesList) loadFavoriteImages();
        if (isFavoritesList) setButtonImage("⭐");
    }, []);

    function addToFavorites() {
        let newList = FavoritePhotoList;
        if (newList.filter(photo => photo.id === id).length < 1) {
            newList.push({
                title: name,
                thumbnail: thumbnail,
                image: image,
                id: id
            });
            setFavoritePhotoList(newList);
            setButtonImage("⭐");
        } else {            
            setFavoritePhotoList(newList.filter(photo => photo.id !== id));
            if (!FavoritePhotoList.includes({
                title: name,
                thumbnail: thumbnail,
                image: image,
                id: id
            }) && !isFavoritesList) setButtonImage("⬜");
        }
        //console.log(FavoritePhotoList);
    }

    function showImageInfo(e) {
        if(e.target.nodeName !== "BUTTON" && e.target.nodeName !== "SPAN") {
            setCurrentImageInfo({
                title: name,
                thumbnail: thumbnail,
                image: image,
                id: id
            });
            setIsShowingImageInfo(true);
        }
    }

    return (
        <div className="Photo-elements col" onClick={showImageInfo}>
            <img src={thumbnail} />
            <br/>
            <span>{name}</span>
            <button className="favorite-button" onClick={addToFavorites}>{ButtonImage}</button>
        </div>
    )
}
