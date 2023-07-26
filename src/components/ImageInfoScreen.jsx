import React from "react";
import backButtonImage from "../assets/images/kisspng-computer-icons-button-5ae031e3347159.1463805315246422752148.png"

export default function ImageInfoScreen({currentImageInfo, setIsShowingImageInfo, FavoritePhotoList, setFavoritePhotoList}) {

    const [ButtonImage, setButtonImage] = React.useState("⬜");

    function returnToMainPage() {
        setIsShowingImageInfo(false);
      }

      async function loadFavoriteImages() {
        try {
            if (FavoritePhotoList.filter(photo => photo.id === currentImageInfo.id).length > 0) setButtonImage("⭐");
        } catch {}
    }

    React.useEffect(() => {
        loadFavoriteImages();
    }, []);

    function addToFavorites() {
        let newList = FavoritePhotoList;
        if (newList.filter(photo => photo.id === currentImageInfo.id).length < 1) {
            newList.push(currentImageInfo);
            setFavoritePhotoList(newList);
            setButtonImage("⭐");
        } else {            
            setFavoritePhotoList(newList.filter(photo => photo.id !== currentImageInfo.id));
            setButtonImage("⬜");
        }
    }

    return (
      <div style={{position: "absolute", width: "100%", height: "100%"}}>
        <div className='Top-bar'>
            <img className='Back-button' src={backButtonImage} onClick={returnToMainPage}></img>
        </div>
        <div style={{position: "absolute", textAlign: "center", top: "10%", bottom: "0", width: "100%", overflowX: "hidden", overflowY: "scroll"}}>
            <img src={currentImageInfo.image} className='Big-image'></img>
            <br/>
            <span style={{fontSize: "4rem"}}>{currentImageInfo.title}</span>
            <button className="favorite-button" style={{fontSize: "4rem"}} onClick={addToFavorites}>{ButtonImage}</button>
        </div>
      </div>
    );
}