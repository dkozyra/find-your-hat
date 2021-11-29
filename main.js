const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

// main game class
class Field {
  constructor(arr){
    this.arr = arr;
    this.x = 0;
    this.y = 0;
    this.playerLoc = this.arr[this.y][this.x];
    this.state = true;
  }

  // field generator
  static generateField(height, width){
    let result = [];
    let randY = Math.floor(Math.random() * height);
    let randX = Math.floor(Math.random() * width);
    for (let i = 0; i < height; i++) {
      // result[i] = Array.from({length: width}, () => (Math.floor(Math.random() * 2)).toString());
      result[i] = Array.from({length: width}, () => (fieldCharacter));
      // result[i].forEach((elem, idx, arr) => {if(arr[idx] === '1'){
      //   arr[idx] = fieldCharacter;
      // }});
      for(let j = 0; j < width; j++) {
        if((Math.floor(Math.random() * 5)) === 0) {
          result[i][j] = hole;
        } 
      }
    }
  
    
    result[randY][randX] = hat;
    result[0][0] = pathCharacter;
    return result;
  }

  // prints game field
  print(){
    for(let i=0; i<this.arr.length; i++) {
    console.log(this.arr[i].join(''))
    }
    console.log("\n");
  }

  // takes user input and execute it
  promptInput(){
    console.log("\nUse key 'w' to move up\nUse Key 's' to move down\nUse Key 'a' to go left\nUse Key 'd' to go right\n");
    this.print();
    let move = prompt("what's your move? ");
    switch (move) {
      case 'w':
        this.y--;
        this.checkMove();
        break;
      case 's':
        this.y++;
        this.checkMove();
        break;
      case 'a':
        this.x--;
        this.checkMove();
        break;
      case 'd':
        this.x++;
        this.checkMove();
        break;
      default:
        console.log("\n\nPLEASE USE 'wsad' KEYS ONLY!");
    }
  }

  // checks for hat
  checkHat() {
    if(this.arr[this.y][this.x] === hat){
      console.log("\n\nBRAVO, YOU WON!!!");
      this.state = false;
    } else {
        this.arr[this.y][this.x] = pathCharacter;
        this.print();
      }
  }

  // checks for holes
  checkHoles(){
    if(this.arr[this.y][this.x] === hole){
      console.log("\n\nGAME OVER! You are in really deep HOLE!");
      this.state = false;
    } else {
        this.checkHat();
      }
  }

  // check for boundries
  checkMove(){
    if((this.y < 0 || this.y > this.arr.length - 1) || (this.x < 0 || this.x > this.arr[0].length - 1)){
      console.log("\n\nGAME OVER! You are over the board");
      this.state = false;
    } else {
        this.checkHoles();
      }
  }

  // run the game
  play(){
    while(this.state){
      this.promptInput();
    }
    console.log("\n\nSEE YOU NEXT TIME!\n\n")
  }
}

const newGame = new Field([
  ['*', '░', 'O'],
  ['░', 'O', '░'],
  ['░', '^', '░'],
]);

const newGame2 = new Field(Field.generateField(12,8));


newGame2.play();



