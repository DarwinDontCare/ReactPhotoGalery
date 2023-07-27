import React, { useEffect, useState } from "react";
import "../App.css";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function PhotoObject({photoInfo, context}) {
    const [ButtonImage, setButtonImage] = useState("⬜");

    const {FavoritePhotoList} = useContext(context);
    const {isFavoritesList} = useContext(context);
    const {saveFavoriteImages} = useContext(context);

    const image = photoInfo.image;
    const name = photoInfo.title;
    const thumbnail = photoInfo.thumbnail;
    const id = photoInfo.id;

    async function setIsFavoriteSymbol() {
        try {
            if (FavoritePhotoList.filter(photo => photo.id === id).length > 0) setButtonImage("⭐");
            else (setButtonImage("⬜"))
        } catch {}
    }

    
    if (ButtonImage === "⬜" && !isFavoritesList) setIsFavoriteSymbol();
    if (isFavoritesList) setButtonImage("⭐");

    function addToFavorites() {
        let newList = FavoritePhotoList;
        if (newList.filter(photo => photo.id === id).length < 1) {
            newList.push({
                title: name,
                thumbnail: thumbnail,
                image: image,
                id: id
            });
            saveFavoriteImages(newList);
            setButtonImage("⭐");
        } else {            
            saveFavoriteImages(newList.filter(photo => photo.id !== id));
            if (!FavoritePhotoList.includes({
                title: name,
                thumbnail: thumbnail,
                image: image,
                id: id
            }) && !isFavoritesList) setButtonImage("⬜");
        }
        //console.log(FavoritePhotoList);
    }

    return (
        <div className="Photo-elements col">
            <Link to={"/images/" + id}>
                <img src={thumbnail} />
            </Link>
            <br/>
            <span>{name}</span>
            <button className="favorite-button" onClick={addToFavorites}>{ButtonImage}</button>
        </div>
    )
}
