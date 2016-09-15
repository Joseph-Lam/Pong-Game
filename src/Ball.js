const size = 5;
const color ='#'+Math.random().toString(16).substr(2,6);

export default class Ball {
	constructor(height, width) {
      	this.x = width/2; // random x
      	this.y = height/2; // random y
      	this.vy = Math.floor(Math.random() * 12 - 6);
      	this.vx = (7 - Math.abs(this.vy));
      	this.size = size;
      	this.height = height;
      	this.width = width;
  		}

  	draw(ctx) {
  		//draw the ball
  		ctx.fillStyle = 'red';
  		ctx.beginPath();
  		ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  		ctx.fill();
  		ctx.closePath();
  	}

  	randomSound() {
  	const sound1 = new Audio("../assets/sounds/pong-01.wav")
		const sound2 = new Audio("../assets/sounds/pong-02.wav")
		const sound3 = new Audio("../assets/sounds/pong-03.wav")

		var soundArray = [sound1, sound2, sound3];
		var rand = Math.random();
		var rand = rand * soundArray.length;
		var rand = Math.floor(rand);
		soundArray[rand].play();
  	}

  	wallBounce(ctx) {
  		
  		const hitLeft = this.x >= this.width;
  		const hitRight = this.x + this.size <= 0;
  		const hitTop = this.y + this.size <= 0;
  		const hitBottom = this.y >= this.height;

  		if(hitLeft || hitRight) {
  			this.vx = -this.vx;
  		} else if (hitTop || hitBottom) {
  			this.vy = -this.vy;
			this.randomSound();

  		}
  	}

  	paddleCollision(player1, player2) {
  		if (this.vx > 0) {
  			const inRightEnd = 
  			player2.x <= this.x + this.size &&
  			player2.x > this.x - this.vx + this.size;
  			if (inRightEnd) {
  				const collisionDiff = this.x + this.size - player2.x;
  				const k = collisionDiff / this.vx;
  				const y = this.vy * k + (this.y - this.vy);
  				const hitRightPaddle = y >= player2.y && y + this.size <= player2.y + player2.height;
  				if (hitRightPaddle) {
  					this.x = player2.x - this.size;
  					this.y = Math.floor(this.y - this.vy + this.vy * k);
            this.vx = -this.vx * 1.10;
            this.randomSound();
            if (this.vx > 10) {
              this.vx = 10;
            }
  					
  				}
  			}
  		} else {
  			const inLeftEnd = player1.x + (player1.width) >= this.x;
  			if (inLeftEnd) {
  				console.log(player1.x + player1.width);
  				const collisionDiff = player1.x + player1.width;
  				const k = collisionDiff / -this.vx;
  				const y = this.vy * k + (this.y - this.vy);
  				const hitLeftPaddle = y >= player1.y && y + this.size <=
  				player1.y + player1.height;
  				if (hitLeftPaddle) {
  					this.x = player1.x + player1.width;
  					this.y = Math.floor(this.y - this.vy + this.vy * k);
  					this.vx = -this.vx * 1.10;
            this.randomSound();
            if (this.vx > 10) {
              this.vx = 10;
            }
            
  				}
  			}
  		}
  	}

  	ballReset () {
  		this.x = this.width/2; 
      	this.y = this.height/2; 
      	this.vy = -Math.floor(Math.random() * 12 - 6);
      	this.vx = -(7 - Math.abs(this.vy));
      	}

  	goal(player1, player2) {
  		if (this.x >= this.width) {
  			player2.scoreMethod();
  			this.ballReset();
  			
  		
  		} else if (this.x <= 0) {
  			player1.scoreMethod();
  			this.ballReset();
  			this.vx = -this.vx;
  			
  		}
  	}


  	render(ctx, player1, player2) {
  		this.draw(ctx);
  		//add movement to ball	
  		this.x += this.vx;
  		this.y += this.vy;
  		//wallBounce
		this.wallBounce(ctx);
		//paddle collisions
  		this.paddleCollision(player1, player2);
  		this.goal(player1, player2);
  	}
}
