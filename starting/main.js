const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

//Construct the field
class Field {
  constructor(field = [[]]) {
    this.field = field;
    this.xAxis = 0;
    this.yAxis = 0;
    this.field[0][0] = pathCharacter;
  }

  //Function for when the game starts
  gameStart() {
    let play = true;
    while (play) {
      this.print();
      this.question();
      if (!this.isInBounds()) {
        console.log("Oh no! You are out of bounds.");
        play = false;
        break;
      } else if (this.isHole()) {
        console.log("Uh oh, you are in a hole!");
        play = false;
        break;
      } else if (this.isHat()) {
        console.log("Well done, you found your hat!");
        play = false;
        break;
        //Three different scenarios
      }

      this.field[this.yAxis][this.xAxis] = pathCharacter;
    }
  }

  question() {
    const answer = prompt("Which way? ").toUpperCase();
    switch (answer) {
      case "U":
        this.yAxis -= 1;
        break;
      case "D":
        this.yAxis += 1;
        break;
      case "L":
        this.xAxis -= 1;
        break;
      case "R":
        this.xAxis += 1;
        break;
      default:
        console.log("Enter U, D, L or R.");
        this.question();
        break;
    }
  }

  isInBounds() {
    return (
      this.yAxis >= 0 &&
      this.xAxis >= 0 &&
      this.yAxis < this.field.length &&
      this.xAxis < this.field[0].length
    );
  }

  isHat() {
    return this.field[this.yAxis][this.xAxis] === hat;
  }

  isHole() {
    return this.field[this.yAxis][this.xAxis] === hole;
  }

  print() {
    const displayString = this.field
      .map((row) => {
        return row.join("");
      })
      .join("\n");
    console.log(displayString);
  }

  static generateField(height, width, percentage = 0.1) {
    const field = new Array(height).fill(0).map((el) => new Array(width));
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const prob = Math.random();
        field[y][x] = prob > percentage ? fieldCharacter : hole;
      }
    }
    // Location of the hat
    const hatLocation = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
    };

    while (hatLocation.x === 0 && hatLocation.y === 0) {
      hatLocation.x = Math.floor(Math.random() * width);
      hatLocation.y = Math.floor(Math.random() * height);
    }
    field[hatLocation.y][hatLocation.x] = hat;
    return field;
  }
}

const myfield = new Field(Field.generateField(10, 10, 0.2));
myfield.gameStart();
