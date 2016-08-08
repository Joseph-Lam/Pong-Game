// Game.js
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import ScoreBoard from './ScoreBoard';

const gap = 10;

const p1Keys = { up: 65, down: 90 };
const p2Keys = { up: 38, down: 40,};

export default class Game {
   constructor() {
      //canvas
      const canvas = document.getElementById('game');
      this.width = canvas.width;
      this.height = canvas.height;
      this.context = canvas.getContext('2d');
      this.context.fillStyle = 'white';
      
      //board
      this.board = new Board(this.width, this.height);
      //players
      this.player1 = new Paddle(this.height, gap, p1Keys);
      this.player2 = new Paddle(this.height, this.width - 4 - gap, p2Keys);
      //ball
      this.ball1 = new Ball(this.height, this.width);

      this.leftScore = new ScoreBoard((this.width/2-50),30);
      this.rightScore = new ScoreBoard((this.width/2+15),30);


   }
     render() {
      this.board.render(this.context);
      this.player1.render(this.context);
      this.player2.render(this.context);
      this.ball1.render(this.context, this.player1, this.player2);
      this.leftScore.render(this.context, this.player2);
      this.rightScore.render(this.context, this.player1);
   }
}