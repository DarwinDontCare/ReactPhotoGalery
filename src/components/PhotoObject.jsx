import React, { useEffect, useState } from "react";
import "../App.css";

export default function PhotoObject({photoInfo, FavoritePhotoList, setFavoritePhotoList}) {
    const [ButtonImage, setButtonImage] = useState("⬜");

    const image = photoInfo.image;
    const name = photoInfo.title;
    const thumbnail = photoInfo.thumbnail;
    const id = photoInfo.id;

    async function loadFavoriteImages() {
        try {
            FavoritePhotoList.forEach((photo) => {
                if (photo.id === id) setButtonImage("⭐");
            });
        } catch {}
    }

    useEffect(() => {
        if (ButtonImage === "⬜") loadFavoriteImages();
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
            let idx = newList.findIndex(photo => photo.id === id);
            newList.splice(idx, idx);
            
            setFavoritePhotoList(newList.filter(photo => photo.id !== id));
            setButtonImage("⬜");
        }
        console.log(FavoritePhotoList);
    }

    return (
        <div className="Photo-elements col">
            <img src={thumbnail} />
            <br/>
            <span>{name}</span>
            <button className="favorite-button" onClick={addToFavorites}>{ButtonImage}</button>
        </div>
    )
}
