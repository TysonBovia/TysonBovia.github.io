// setup variables
const walkAcceleration = 2.5; // how much is added to the speed each frame
const gravity = 0.5; // how much is subtracted from speedY each frame
const friction = 1.5; // how much the player is slowed each frame
const maxSpeed = 8; // maximum horizontal speed, not vertical
const playerJumpStrength = 12; // this is subtracted from the speedY each jump
const projectileSpeed = 8; // the speed of projectiles

/////////////////////////////////////////////////
//////////ONLY CHANGE ABOVE THIS POINT///////////
/////////////////////////////////////////////////

// Base game variables
const frameRate = 60;
const playerScale = 0.8; //makes the player just a bit smaller. Doesn't affect the hitbox, just the image

// Player variables
const player = {
  x: 50,
  y: 100,
  speedX: 0,
  speedY: 0,
  width: undefined,
  height: undefined,
  onGround: false,
  facingRight: true,
  deadAndDeathAnimationDone: false,
};

let hitDx;
let hitDy;
let hitBoxWidth = 50 * playerScale;
let hitBoxHeight = 105 * playerScale;
let firstTimeSetup = true;

const keyPress = {
  any: false,
  up: false,
  left: false,
  down: false,
  right: false,
  space: false,
};

// Player animation variables
const animationTypes = {
  duck: "duck",
  flyingJump: "flying-jump",
  frontDeath: "front-death",
  frontIdle: "front-idle",
  jump: "jump",
  lazer: "lazer",
  run: "run",
  stop: "stop",
  walk: "walk",
};
let currentAnimationType = animationTypes.run;
let frameIndex = 0;
let jumpTimer = 0;
let duckTimer = 0;
let DUCK_COUNTER_IDLE_VALUE = 14;
let debugVar = false;

let spriteHeight = 0;
let spriteWidth = 0;
let spriteX = 0;
let spriteY = 0;
let offsetX = 0;
let offsetY = 0;

// Platform, cannon, projectile, and collectable variables
let platforms = [];
let cannons = [];
const cannonWidth = 118;
const cannonHeight = 80;
let projectiles = [];
const defaultProjectileWidth = 24;
const defaultProjectileHeight = defaultProjectileWidth;
const collectableWidth = 40;
const collectableHeight = 40;
let collectables = [];

// canvas and context variables; must be initialized later
let canvas;
let ctx;

// setup function variable
let setup;

let halleImage;
let animationDetails = {};

var collectableList = {
  database: { image: "https://static.wikia.nocookie.net/project-deepwoken/images/c/c4/Squibbo.png/revision/latest?cb=20230707001943" },
  diamond: { image: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/8e331528-a4c6-4f3c-8d31-d15747bbb060/def6m1m-f7e598eb-3bd4-4ac8-bf53-6194b29c4783.png/v1/fill/w_1280,h_1280/ichigo_hollow_mask_by_civiltoonz_def6m1m-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzhlMzMxNTI4LWE0YzYtNGYzYy04ZDMxLWQxNTc0N2JiYjA2MFwvZGVmNm0xbS1mN2U1OThlYi0zYmQ0LTRhYzgtYmY1My02MTk0YjI5YzQ3ODMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.wwZ-ylg6hsTghFmK9LeZaPtspW49pmxMPBD2fyWhj7c" },
  grace: { image: "images/collectables/grace-head.png" },
 kennedi: { image: "https://static.wikia.nocookie.net/project-deepwoken/images/d/d6/Primadon_Reskin.png/revision/latest?cb=20240726223447" },
  max: { image: "https://i2.pngimg.me/thumb/f/720/comhiclipartmkhin.jpg" },
  steve: { image: "https://static.wikia.nocookie.net/project-deepwoken/images/4/45/DeepowlIcon.png/revision/latest/smart/width/250/height/250?cb=20221228024121" },
};
