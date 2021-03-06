import rootReducer from "../reducers";

export function loadMyMovieList() {
 return function (dispatch) {
   dispatch({
     type: 'LOAD_MY_MOVIE_LIST'
   });
   fetch('/movies')
   .then( (response) => {
     return response.json();
   }).then((movies) => {
     dispatch(myMovieListLoaded(movies));
   });
 };
}

export function myMovieListLoaded(movies){
  return {
    type:'MY_MOVIE_LIST_LOADED',
    value:movies
  }
}

export function loadSearch(searchTerm) {
 return function (dispatch) {
   dispatch({
     type: 'LOAD_SEARCH'
   });
   fetch("https://api.themoviedb.org/3/movie/550?api_key=c3b94590ff0e2dd196b19855e2")
   .then( (response) => {
     return response.json();
   }).then((movies) => {
     dispatch(searchLoaded(movies));
   });
 };
}

export function searchLoaded(movies){
  return {
    type:'SEARCH_RESULTS_LOADED',
    value:movies.results
  }
}

export function saveMyMovie(movie) {
 return function (dispatch) {
   fetch("/movies", {
     method: "POST",
   }).then(() => dispatch(loadMyMovieList()));
 };
}

export function removeMyMovie(id) {
 return function (dispatch) {
   fetch('/movies/' + id, {
     method: "DELETE",
   }).then(() => dispatch(loadMyMovieList()));
 };
}
