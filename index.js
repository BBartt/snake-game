const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext('2d');

const cvsW = cvs.width;
      cvsH = cvs.height;

const snakeW = 10,
      snakeH = 10;

let score = 0;

let direction = 'right';

let food = {
  x: Math.floor( (Math.random() * 65) + 1 ),
  y: Math.floor( (Math.random() * 65) + 1 )
}

document.querySelector('.popup-gameOver-button').addEventListener('click', () => location.reload() );

document.addEventListener('keydown', userDirection);

document.addEventListener('DOMContentLoaded', function(){
  document.querySelector('.popup-start-button').addEventListener('click', function(){
    $('.popup-start-overlay').hide();
    let snake = [];
    for(let i = 3; i>=0; i--){
      snake.push( {x: i, y: 0} );
    }

    function draw(){
      ctx.clearRect(0,0,cvsW,cvsH);

      for(let i=0; i<snake.length; i++){
        var x = snake[i].x;
        var y = snake[i].y;
        drawSnake(x,y);
      }

      drawFood(food.x, food.y);

      let snakeHeadX = snake[0].x;
      let snakeHeadY = snake[0].y;

      if( snakeHeadX < 0 || snakeHeadY < 0 || snakeHeadX >= cvsW/snakeW || snakeHeadY >= cvsH/snakeH || checkSnakeBodyColision(snakeHeadX, snakeHeadY, snake) ){
        console.log('colision detected');
        clearInterval(interval);
        $('.popup-gameOver-overlay').toggleClass('popup-gameOver-overlay-active');
      }

      if(direction == 'left')       snakeHeadX--;
      else if(direction == 'up')    snakeHeadY--;
      else if(direction == 'right') snakeHeadX++;
      else if(direction == 'down')  snakeHeadY++;

      if( snakeHeadX == food.x && snakeHeadY == food.y ){
        score++;
        food = {
          x: Math.floor( (Math.random() * 65) + 1 ),
          y: Math.floor( (Math.random() * 65) + 1 )
        }
        var newHead = {
          x: snakeHeadX,
          y: snakeHeadY
        }
      }else{
        snake.pop();
        var newHead = {
          x: snakeHeadX,
          y: snakeHeadY
        }
      }
      snake.unshift(newHead);
      drawScore(score);
    }
    let interval = setInterval(draw, 80);
  });
});

function drawSnake(x,y){
  ctx.fillStyle = '#fff';
  ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);

  ctx.fillStyle = '#00ff19';
  ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}

function drawFood(x,y){
  ctx.fillStyle = '#dbff00';
  ctx.fillRect( x*snakeW, y*snakeH, snakeW, snakeH );
}

function checkSnakeBodyColision( x, y, array ){
  for( let i = 1; i < array.length; i++ ){
    if( x == array[i].x && y == array[i].y ){
      return true;
    }
  }
  return false;
}

function userDirection(e){
  let key = e.keyCode;
  if( key == 37 && direction != 'right' )     direction = 'left';
  else if( key == 38 && direction != 'down' ) direction = 'up';
  else if( key == 39 && direction != 'left' ) direction = 'right';
  else if( key == 40 && direction != 'up' )   direction = 'down';
};

function drawScore(x){
  ctx.fillStyle = '#dbff00';
  ctx.fillText( 'Score: ' + x, 5, cvsH-10 );
}
