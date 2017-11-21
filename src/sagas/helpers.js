export const deDupe = (movie, movieArray) => {
  const accumulator = {};
  const dedupedArray = [];
  movieArray.forEach((item, index) => {
    if (accumulator[item.id] || movie.id === item.id) {
      // tossed to the wind
    } else {
      accumulator[item.id] = true;
      dedupedArray.push(item);
    }
  });
  return dedupedArray;
};

export const sortByRating = movieArray => {
  return movieArray.sort((a, b) => a.vote_average - b.vote_average).reverse();
};
