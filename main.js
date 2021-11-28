const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(arr){
    this.arr = arr;
    this.x = 0;
    this.y = 0;
    this.playerLoc = this.arr[this.y][this.x];
    this.state = true;
  }

  print(){
    for(let i=0; i<this.arr.length; i++) {
    console.log(this.arr[i].join(''))
    }
    console.log("\n");
  }
  
  promptInput(){
    console.log("\nUse key 'w' to move up\nUse Key 's' to move down\nUse Key 'a' to go left\nUse Key 'd' to go right\n");
    this.print();
    let move = prompt("what's your move? ");
    switch (move) {
      case 'w':
        this.y--;
        // this.y = -2;
        this.checkMove();
        break;
      case 's':
        this.y++;
        // this.y = 2;
        this.checkMove();
        break;
      case 'a':
        this.x--;
        // this.x = -2;
        this.checkMove();
        break;
      case 'd':
        this.x++;
        // this.x = 2;
        this.checkMove();
        break;
      default:
        console.log("\n\nPLEASE USE 'wsad' KEYS ONLY!");
        this.print();
        this.promptInput();
    }
  }

  checkHat() {
    if(this.arr[this.y][this.x] === hat){
      console.log("\n\nBRAVO, YOU WON");
      this.state = false;
    } else {
        this.arr[this.y][this.x] = pathCharacter;
        this.print();
      }
  }

  checkHoles(){
    if(this.arr[this.y][this.x] === hole){
      console.log("\n\nGAME OVER! You are in really deep HOLE!");
      this.state = false;
    } else {
        this.checkHat();
      }
  }

  checkMove(){
    if((this.y < 0 || this.y > this.arr.length - 1) || (this.x < 0 || this.x > this.arr[0].length - 1)){
      console.log("\n\nGAME OVER! You are over the board");
      this.state = false;
    } else {
        this.checkHoles();
      }
  }

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

newGame.play();

