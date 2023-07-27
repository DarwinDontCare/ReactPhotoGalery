import React from "react";
import backButtonImage from "../assets/images/kisspng-computer-icons-button-5ae031e3347159.1463805315246422752148.png";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory, useParams } from 'react-router-dom';
import loadingDots from "../assets/gif/loading-gif.gif";

export default function ImageInfoScreen() {

    const [ButtonImage, setButtonImage] = React.useState("⬜");
    const [currentImageInfo, setCurrentImageInfo] = React.useState({});
    const [image, setImage] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [isLoading, seIsLoading] = React.useState(true);

    const { imageId } = useParams();
    const id = Number.parseInt(imageId)

    const apiUrl = 'https://jsonplaceholder.typicode.com/photos';

    function loadFavoriteImagesFromLocalStorage() {
        let favorites = [];
        try {
            favorites = JSON.parse(localStorage.getItem('favoriteImages'));
        } catch {
            localStorage.setItem('favoriteImages', JSON.stringify([]));
        }
        console.log(localStorage.getItem('favoriteImages'));

        return favorites;
    }

    function saveFavoriteImages(favorites) {
        try {
            localStorage['favoriteImages'] = JSON.stringify(favorites);
        } catch {
            localStorage.setItem('favoriteImages', JSON.stringify(favorites));
        }
        console.log(localStorage.getItem('favoriteImages'));
    }

    const FavoritePhotoList = loadFavoriteImagesFromLocalStorage();

    function retriveDataFromAPI() {
        axios.get(apiUrl).then((response) => {
            let photo = {
                image: response.data[imageId - 1].url,
                title: response.data[imageId - 1].title,
                thumbnail: response.data[imageId - 1].thumbnailUrl,
                id: response.data[imageId - 1].id
            };
            setImage(response.data[imageId - 1].url);
            setTitle(response.data[imageId - 1].title);
            setCurrentImageInfo(photo);
            loadFavoriteImages();
            setTimeout(() => {seIsLoading(false);}, 2500);
        });
    }

    function loadFavoriteImages() {
        try {
            if (FavoritePhotoList.filter(photo => photo.id === id).length > 0) setButtonImage("⭐");
            else (setButtonImage("⬜"))
        } catch {}
    }

    React.useEffect(() => {
        retriveDataFromAPI();
    }, []);

    function addToFavorites() {
        let newList = FavoritePhotoList;
        if (newList.filter(photo => photo.id === id).length < 1) {
            newList.push(currentImageInfo);
            saveFavoriteImages(newList);
            setButtonImage("⭐");
        } else {            
            saveFavoriteImages(newList.filter(photo => photo.id !== id));
            setButtonImage("⬜");
        }
    }

    return (
      <div style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(43, 43, 43, 0.979)", textAlign: "center"}}>
        <div className='Top-bar'>
            <Link to="/">
                <img className='Back-button' src={backButtonImage}></img>
            </Link>
        </div>
        {!isLoading && <div style={{position: "absolute", textAlign: "center", top: "10%", bottom: "0", width: "100%", overflowX: "hidden", overflowY: "scroll"}}>
            <img src={image} className='Big-image'></img>
            <br/>
            <span style={{fontSize: "4rem"}}>{title}</span>
            <button className="favorite-button" style={{fontSize: "4rem"}} onClick={addToFavorites}>{ButtonImage}</button>
        </div>}
        {isLoading && <img src={loadingDots} style={{position: "inherit", top: "35%", marginLeft: "-100px"}}></img>}
      </div>
    );
}