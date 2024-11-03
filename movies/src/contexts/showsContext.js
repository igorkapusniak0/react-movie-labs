import React, { useState } from "react";

export const ShowsContext = React.createContext(null);



const ShowsContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [playlist, setPlaylist] = useState( [] )

  const addToFavorites = (show) => {
    let newFavorites = [];
    if (!favorites.includes(show.id)){
      newFavorites = [...favorites, show.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
    console.log(favorites)
  };
  
  // We will use this function in the next step
  const removeFromFavorites = (show) => {
    setFavorites( favorites.filter(
      (mId) => mId !== show.id
    ) )
  };

  const addToPlaylist = (show) => {
    let newPlaylist = [];
    if (!playlist.includes(show.id)){
      newPlaylist = [...playlist, show.id];
    }
    else{
      newPlaylist = [...playlist];
    }
    setPlaylist(newPlaylist)
    console.log(newPlaylist)
  };
  
  // We will use this function in the next step
  const removeFromPlaylist = (show) => {
    setPlaylist( playlist.filter(
      (mId) => mId !== show.id
    ) )
  };

  const [myReviews, setMyReviews] = useState( {} ) 
const addReview = (show, review) => {
    setMyReviews( {...myReviews, [show.id]: review } )
  };

  return (
    <ShowsContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToPlaylist,
        removeFromPlaylist
      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsContextProvider;
