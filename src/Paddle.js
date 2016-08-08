const color ='#'+Math.random().toString(16).substr(2,6);

export default class Paddle {
   constructor(height, x, control) {
      this.width = 5;
      this.height = 60;
      this.x = x;
      this.y = (height / 2) - (this.height / 2);
      this.speed = 20;
      this.maxHeight = height;
      this.score = 0;

      function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
      }

      document.addEventListener('keydown', event => {
      switch (event.keyCode) {
         case control.up:
            this.y = Math.max(
               0,
               this.y - this.speed
               ); 
            break;

         case control.down:
            this.y = Math.min (
               this.maxHeight - this.height,
               this.y + this.speed
               );
            break;

      }

   })
   };

   scoreMethod() {
      this.score += 1;
   };

   render(ctx) { 
      ctx.fillStyle = color;
      ctx.fillRect(
         this.x, this.y,
         this.width, this.height
      );
   }
}
