# Assignment 1 - ReactJS app.

Name: Igor Kapusniak

## Overview.

Coninuation of the movie Labs, with several new features added.

### Features.
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any modifications to existing features) .]

+ Added an Top Rated Page. 
+ Created a dropdown menu on the site header that allows the user to access shows. Shows has all the same pages as movies (discover,upcoming,top rated) 
+ Shows can be added to a favouriteShows list. 
+ The fiter card gained 2 new features, It allows the user to filter by minimum and maximum rating, and to sort movies/shows by name or rating 
+ The Movies/Show details page additionally displays Where to Watch,Trailers, Cast, and Similar Movies/Shows.
+ Actors use the same card system as movies/shows and can be clicked for more details.
+ The Actors details page displays: General info and Movies/Shows they are in.
+ Added login and register feature which saves a users favorites array to mongodb.


## Setup requirements.

npm install react-youtube
npm istall express
npm install bcrypt
Add this to your .env: DB_LINK=mongodb+srv://ikapusniak3:FHvLqayB72Ex2Ce@cluster0.7bf1c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
or add your own mongodb link
npm start
node db_server.js

## API endpoints.

[ List the __additional__ TMDB endpoints used, giving the description and pathname for each one.] 

+ Discover list of movies - movies/
+ Favourites list of movies - movies/favorites
+ Upcoming list of movies - movies/upcoming
+ Top rated list of movies - movies/top_rated
+ Movie review form - movie_reviews/form 
+ Movie details - movies/:id
+ View a full movie review - movie_reviews/:id

+ Discover list of shows - shows/
+ Favourites list of shows - shows/favorites
+ Upcoming list of shows - shows/upcoming
+ Top rated list of shows - shows/top_rated
+ Show review form - show_reviews/form
+ Show details - shows/:id
+ View a full show review - show_reviews/:id

+ Actor details - actors/:id

+ Login page - login/
+ Register page - register/ 

## Routing.

[ List the __new routes__ supported by your app and state the associated page.]
/movies/favorites
/movies/:id
/movies
/movies/upcoming
/movies/top_rated

/shows
/shows/upcoming
/shows/top_rated
/shows/:id
/shows/favorites
              

/movie_reviews/:id
/movie_reviews/form

/show_reviews/:id
/show_reviews/form




[If relevant, state what aspects of your app are protected (i.e. require authentication) and what is public.]

## Independent learning (If relevant).
+ React Youtube - https://www.npmjs.com/package/react-youtube
+ Sorting - https://owlcation.com/stem/creating-a-sortable-list-in-react-js
+ mongodb - NoSQL module
+ express - https://expressjs.com



Itemize the technologies/techniques you researched independently and adopted in your project, 
i.e. aspects not covered in the lectures/labs. Include the source code filenames that illustrate these 
(we do not require code excerpts) and provide references to the online resources that helped you (articles/blogs).

src/api/db-api.js
controller/userController.js
routes/userRoutes.js
db_server.js
