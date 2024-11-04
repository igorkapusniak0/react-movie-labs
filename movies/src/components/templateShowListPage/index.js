import React, { useState } from "react";
import Header from "../headerShowList";
import FilterShowsCard from "../filterShowsCard";
import ShowList from "../showList";
import Grid from "@mui/material/Grid2";

function ShowListPageTemplate({ shows, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortOption, setSortOption] = useState("none");
  const genreId = Number(genreFilter);

  let displayedShows = shows
  .filter((m) => {
    const itemTitle = m.name; 
    return itemTitle.toLowerCase().includes(nameFilter.toLowerCase());
  })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(genreId) : true;
    });

    displayedShows = displayedShows.sort((a, b) => {
      if (sortOption === "title") {
        return a.original_name.localeCompare(b.original_name);
      } else if (sortOption === "rating") {
        return (b.vote_average || 0) - (a.vote_average || 0);
      }
      return 0;
    });
    
  
    const handleChange = (type, value) => {
      if (type === "name") {
        setNameFilter(value);
      } else if (type === "genre") {
        setGenreFilter(value);
      } else if (type === "sort") {
        setSortOption(value);
      }
    };

  return (
    <Grid container>
      <Grid size={12}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{flex: "1 1 500px"}}>
        <Grid 
          key="find" 
          size={{xs: 12, sm: 6, md: 4, lg: 3, xl: 2}} 
          sx={{padding: "20px"}}
        >
          <FilterShowsCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortOption={sortOption} 
          />
        </Grid>
        <ShowList action={action} shows={displayedShows}></ShowList>
      </Grid>
    </Grid>
  );
}
export default ShowListPageTemplate;