const deDupe = movieArray => {
  const accumulator = {};
  movieArray.forEach((item, index) => {
    if (accumulator[item.id]) {
      movieArray.splice(index, 1);
    } else {
      accumulator[item.id] = true;
    }
  });
  return movieArray;
};

const rater = (seedMovie, candidates) => {
  // remove duplicate
  candidates = deDupe(candidates);

  // make an object seedMovie crewmember ids,
  const seedMovieIDs = {
    crewIDs: {},
    castIDs: {},
    genreIDs: {}
  };
  seedMovie.credits.crew.forEach(crewMember => {
    seedMovieIDs.crewIDs[crewMember.id] = 1;
  });
  seedMovie.credits.cast.forEach(castMember => {
    seedMovieIDs.castIDs[castMember.id] = 1;
  });
  seedMovie.genres.forEach(genre => {
    seedMovieIDs.genreIDs[genre.id] = 1;
  });

  candidates.forEach(candidate => {
    candidate['myScore'] = 0;
    candidate.credits.crew.forEach(crewMember => {
      if (seedMovieIDs.crewIDs[crewMember.id]) {
        candidate['myScore'] += 1;
      }
    });
    candidate.credits.cast.forEach(castMember => {
      if (seedMovieIDs.castIDs[castMember.id]) {
        candidate['myScore'] += 1;
      }
    });
    candidate.genres.forEach(genre => {
      if (seedMovieIDs.genreIDs[genre.id]) {
        candidate['myScore'] += 0.5;
      }
    });
    candidate['myScore'] += candidate.vote_average;
  });

  // Sort candidates by myScore,
  candidates = candidates.sort((a, b) => {
    if (a.myScore < b.myScore) {
      return 1;
    }
    if (b.myScore < a.myScore) {
      return -1;
    }
    return 0;
  });

  console.log(seedMovieIDs);
  console.log(candidates);
  return candidates;
};
export default rater;
