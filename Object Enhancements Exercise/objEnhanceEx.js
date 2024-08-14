/* Write an ES2015 Version */
/* Same keys and values ES2015 */
function createInstructor(firstName, lastName) {
      return { firstName, lastName }
}

/* Computed Property Names ES2015 */
let favoriteNumber = 42;

const instructor = {
      firstName: "Colt",
      [favoriteNumber]: "That is my favorite!"
}

/* Object Methods ES2015 */
// const instructor = {
//       firstName: "Colt",
//       sayHi() {
//             return "Hi!";
//       },
//       sayBye() {
//             return this.firstName + " says bye!";
//       }
// }

/* createAnimal function */
const dog = createAnimal("dog", "bark", "Wooof!")
dog.bark()  //"Wooof!"

const cat = createAnimal("cat", "meow", "Meeooowww!")
cat.meow() //"Meeooowww!"

function createAnimal(species, verb, noise) {
      return {
            species,
            [verb]() {
                  return noise;
            }
      }
}
