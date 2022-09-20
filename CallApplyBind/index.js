/**
 * Utils
 */

const printMovie = function () {
  console.log(`Title: ${this.title} | Genre: ${this.genre} | Year: ${this.year}`);
};

const printMovieWithRating = function (rating) {
  console.log(`Title: ${this.title} | Genre: ${this.genre} | Year: ${this.year} | Rating: ${rating}`);
}


const printMovieWithRatingAndLength = function (rating, length) {
  console.log(`Title: ${this.title} | Genre: ${this.genre} | Year: ${this.year} | Rating: ${rating} | Length: ${length}`);
}

/**
 * Objects
 */

const movie1 = {
  title: 'The Good, The Bad And The Ugly',
  genre: 'Western',
  year: 1966,
};

const movie2 = {
  title: 'Gladiator',
  genre: 'Action/Adventure',
  year: 2000,
};

const movie3 = {
  title: 'Spirited Away',
  genre: 'Anime',
  year: 2001,
};

/**
 * Call
 */

console.log('|-----------------------------------------------------------------------------|');
console.log('| CALL                                                                        |');
console.log('|-----------------------------------------------------------------------------|');

printMovie.call(movie1);
printMovieWithRating.call(movie2, 8.5);
printMovieWithRatingAndLength.call(movie3, 8.6, 125);

/**
 * Apply
 */

 console.log('|-----------------------------------------------------------------------------|');
 console.log('| APPLY                                                                       |');
 console.log('|-----------------------------------------------------------------------------|');

printMovie.apply(movie1);
printMovieWithRating.apply(movie2, [8.5]);
printMovieWithRatingAndLength.apply(movie3, [8.6, 125]);

/**
 * Bind
 */

 console.log('|-----------------------------------------------------------------------------|');
 console.log('| BIND                                                                        |');
 console.log('|-----------------------------------------------------------------------------|');

const p1 = printMovie.bind(movie1);
const p2 = printMovieWithRating.bind(movie2, 8.5);
const p3 = printMovieWithRatingAndLength.bind(movie3, 8.6, 125);

p1();
p2();
p3();

/**
 * Clones
 */

Function.prototype.myCall = function (obj, ...args) {
  obj.fn = this;
  obj.fn(...args);
}

console.log('|-----------------------------------------------------------------------------|');
console.log('| CALL POLYFILL                                                               |');
console.log('|-----------------------------------------------------------------------------|');
printMovie.myCall(movie1);
printMovieWithRating.myCall(movie2, 8.5);
printMovieWithRatingAndLength.myCall(movie3, 8.6, 125);

Function.prototype.myApply = function (obj, args = []) {
  if (!Array.isArray(args)) {
    throw new Error('Illegal Args');
  }

  obj.fn = this;
  obj.fn(...args);
}

console.log('|-----------------------------------------------------------------------------|');
console.log('| APPLY POLYFILL                                                              |');
console.log('|-----------------------------------------------------------------------------|');
printMovie.myApply(movie1);
printMovieWithRating.myApply(movie2, [8.5]);
printMovieWithRatingAndLength.myApply(movie3, [8.6, 125]);

Function.prototype.myBind = function (obj, ...args) {
  obj.fn = this;
  return () => obj.fn(...args);
}

console.log('|-----------------------------------------------------------------------------|');
console.log('| BIND POLYFILL                                                               |');
console.log('|-----------------------------------------------------------------------------|');
const p11 = printMovie.myBind(movie1);
const p12 = printMovieWithRating.myBind(movie2, 8.5);
const p13 = printMovieWithRatingAndLength.myBind(movie3, 8.6, 125);

p11();
p12();
p13();