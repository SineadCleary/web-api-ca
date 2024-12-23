# Assignment 2 - Web API.

Name: Sinéad Cleary

## Additional Features.
 
 + Add new API enpoints for watch providers, genres, genre (parameterised for given movie), top rated, and popular.
 + Frontend and backend connected. Get movies, movie (by id), upcoming, top rated, popular, and genres from movies-api.
 + Simple sign up and login included in app. Buttons in site header.
 + Authentication required for protected routes.

## API Configuration
Create a .env in movies-api with the following:
______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=<YourMongoURL>
TMDB_KEY=<YourTMDBKey>
SECRET=<YourJWTSecret>
______________________

Create a .env in react-movies with the following:
______________________
REACT_APP_TMDB_KEY=<YourTMDBKey>
FAST_REFRESH=false
______________________

## API Design
- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/tmdb/upcoming | GET | Gets a list of upcoming movies
- /api/movies/tmdb/toprated | GET | Gets a list of top rated movies
- /api/movies/tmdb/popular | GET | Gets a list of popular movies
- /api/movies/tmdb/genres | GET | Gets a list of TMDB genres and associated IDs
- /api/users | GET | Gets a list of registered users
- /api/users?action=register | POST | registers a user

## Security and Authentication
Users must be logged in to access:

- upcoming
- top rated
- popular
- movie details


## Integrating with React App
The views that use my web api are:

- upcoming
- top rated
- movie details
- popular
- genres (in genre filter)
