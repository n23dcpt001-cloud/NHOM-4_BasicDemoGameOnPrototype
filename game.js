// ========================================
// BASIC DEMO ON PROTOTYPE
// ========================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let gameOver = false;


// ========================================
// PLAYER
// ========================================

const player = {

    x: 400,
    y: 250,

    size: 30,

    speed: 4,

    hp: 100,

    attackCooldown: 0,

    // Góc hướng của kiếm
    swordAngle: 0,

    // Hiệu ứng khi đang chém
    attacking: false

};


// ========================================
// ENEMIES
// ========================================

const enemies = [];


// ========================================
// KEYBOARD
// ========================================

const keys = {};

document.addEventListener("keydown", function(event) {

    keys[event.key.toLowerCase()] = true;

});

document.addEventListener("keyup", function(event) {

    keys[event.key.toLowerCase()] = false;

});


// ========================================
// MOUSE
// ========================================

let mouseX = player.x;
let mouseY = player.y;


// Lấy vị trí chuột trên Canvas

canvas.addEventListener("mousemove", function(event) {

    const rect = canvas.getBoundingClientRect();

    mouseX =
        event.clientX - rect.left;

    mouseY =
        event.clientY - rect.top;

});


// ========================================
// TẠO ENEMY
// ========================================

function createEnemy() {

    const enemy = {

        x: Math.random() * (canvas.width - 60) + 30,

        y: Math.random() * (canvas.height - 60) + 30,

        size: 28,

        speed: 1.2,

        hp: 30,

        attackCooldown: 0

    };

    enemies.push(enemy);

}


// Tạo 3 Enemy

createEnemy();
createEnemy();
createEnemy();


// ========================================
// PLAYER MOVEMENT
// ========================================

function updatePlayer() {

    if (keys["w"]) {

        player.y -= player.speed;

    }

    if (keys["s"]) {

        player.y += player.speed;

    }

    if (keys["a"]) {

        player.x -= player.speed;

    }

    if (keys["d"]) {

        player.x += player.speed;

    }


    // Không cho Player đi ra ngoài Canvas

    player.x = Math.max(

        player.size / 2,

        Math.min(

            canvas.width - player.size / 2,

            player.x

        )

    );


    player.y = Math.max(

        player.size / 2,

        Math.min(

            canvas.height - player.size / 2,

            player.y

        )

    );


    // Cooldown đánh

    if (player.attackCooldown > 0) {

        player.attackCooldown--;

    }


    // Tính hướng kiếm theo chuột

    player.swordAngle = Math.atan2(

        mouseY - player.y,

        mouseX - player.x

    );

}


// ========================================
// PLAYER ATTACK
// ========================================

function playerAttack() {

    // Không cho spam đánh

    if (player.attackCooldown > 0) {

        return;

    }


    // Cooldown

    player.attackCooldown = 20;


    // Bật hiệu ứng kiếm

    player.attacking = true;


    setTimeout(function() {

        player.attacking = false;

    }, 150);


    // Kiểm tra Enemy

    enemies.forEach(function(enemy, index) {

        const dx =
            enemy.x - player.x;

        const dy =
            enemy.y - player.y;

        const distance =
            Math.hypot(dx, dy);


        // Góc từ Player đến Enemy

        const enemyAngle =
            Math.atan2(dy, dx);


        // Chênh lệch góc giữa kiếm và Enemy

        let angleDifference =
            Math.abs(

                enemyAngle -
                player.swordAngle

            );


        // Xử lý góc 360 độ

        if (angleDifference > Math.PI) {

            angleDifference =
                Math.PI * 2 -
                angleDifference;

        }


        // ====================================
        // TẦM KIẾM
        // ====================================

        // Kiếm đánh được trong khoảng 100 pixel
        // và Enemy phải nằm phía trước kiếm

        if (

            distance < 100 &&
            angleDifference < Math.PI / 3

        ) {

            // Enemy mất 10 HP

            enemy.hp -= 10;


            // Enemy chết

            if (enemy.hp <= 0) {

                enemies.splice(index, 1);

                score += 10;

                updateScore();

                createEnemy();

            }

        }

    });

}


// ========================================
// CHUỘT TRÁI = ATTACK
// ========================================

canvas.addEventListener(

    "mousedown",

    function(event) {

        if (event.button === 0) {

            playerAttack();

        }

    }

);


// ========================================
// ENEMY AI
// ========================================

function updateEnemies() {

    enemies.forEach(function(enemy) {

        const dx =
            player.x - enemy.x;

        const dy =
            player.y - enemy.y;

        const distance =
            Math.hypot(dx, dy);


        // Enemy đuổi Player

        if (distance > 35) {

            enemy.x +=
                (dx / distance) *
                enemy.speed;

            enemy.y +=
                (dy / distance) *
                enemy.speed;

        }


        // Enemy tấn công Player

        if (distance < 35) {

            if (enemy.attackCooldown <= 0) {

                player.hp -= 10;

                enemy.attackCooldown = 60;

                updateHP();

            }

        }


        // Cooldown Enemy

        if (enemy.attackCooldown > 0) {

            enemy.attackCooldown--;

        }

    });


    // ====================================
    // GAME OVER
    // ====================================

    if (player.hp <= 0) {

        player.hp = 0;

        gameOver = true;


        document
            .getElementById("game-over")
            .classList
            .remove("hidden");


        document
            .getElementById("final-score")
            .textContent =
            "Score: " + score;

    }

}


// ========================================
// VẼ PLAYER
// ========================================

function drawPlayer() {

    // Thân Player

    ctx.fillStyle = "#4da6ff";

    ctx.fillRect(

        player.x - player.size / 2,

        player.y - player.size / 2,

        player.size,

        player.size

    );


    // ====================================
    // VẼ KIẾM
    // ====================================

    ctx.save();


    // Đưa tâm vẽ về Player

    ctx.translate(

        player.x,

        player.y

    );


    // Xoay kiếm theo chuột

    ctx.rotate(player.swordAngle);


    // Chuôi kiếm

    ctx.fillStyle = "#8b5a2b";

    ctx.fillRect(

        15,

        -3,

        12,

        6

    );


    // Lưỡi kiếm

    ctx.fillStyle = "#eeeeee";

    ctx.fillRect(

        27,

        -3,

        40,

        6

    );


    // Mũi kiếm

    ctx.beginPath();

    ctx.moveTo(67, -3);

    ctx.lineTo(77, 0);

    ctx.lineTo(67, 3);

    ctx.closePath();

    ctx.fill();


    // Nếu đang đánh thì kiếm sáng hơn

    if (player.attacking) {

        ctx.strokeStyle = "#ffffff";

        ctx.lineWidth = 4;

        ctx.beginPath();

        ctx.arc(

            0,

            0,

            75,

            -Math.PI / 3,

            Math.PI / 3

        );

        ctx.stroke();

    }


    ctx.restore();

}


// ========================================
// VẼ ENEMY
// ========================================

function drawEnemies() {

    enemies.forEach(function(enemy) {

        // Thân Enemy

        ctx.fillStyle = "#ff4d6d";

        ctx.fillRect(

            enemy.x - enemy.size / 2,

            enemy.y - enemy.size / 2,

            enemy.size,

            enemy.size

        );


        // Thanh máu nền

        ctx.fillStyle = "#333";

        ctx.fillRect(

            enemy.x - 15,

            enemy.y - 25,

            30,

            5

        );


        // Thanh máu Enemy

        ctx.fillStyle = "#35d07f";

        ctx.fillRect(

            enemy.x - 15,

            enemy.y - 25,

            enemy.hp,

            5

        );

    });

}


// ========================================
// VẼ GAME
// ========================================

function drawGame() {

    ctx.clearRect(

        0,

        0,

        canvas.width,

        canvas.height

    );


    drawPlayer();

    drawEnemies();

}


// ========================================
// CẬP NHẬT HP
// ========================================

function updateHP() {

    const hpFill =
        document.getElementById("hp-fill");

    hpFill.style.width =
        player.hp + "%";

}


// ========================================
// CẬP NHẬT SCORE
// ========================================

function updateScore() {

    document
        .getElementById("score")
        .textContent =
        "SCORE: " + score;

}


// ========================================
// RESTART GAME
// ========================================

function restartGame() {

    player.x = 400;

    player.y = 250;

    player.hp = 100;

    player.attackCooldown = 0;

    player.attacking = false;


    score = 0;


    enemies.length = 0;


    createEnemy();

    createEnemy();

    createEnemy();


    gameOver = false;


    updateHP();

    updateScore();


    document
        .getElementById("game-over")
        .classList
        .add("hidden");

}


// ========================================
// GAME LOOP
// ========================================

function gameLoop() {

    if (!gameOver) {

        updatePlayer();

        updateEnemies();

        drawGame();

    }


    requestAnimationFrame(gameLoop);

}


// ========================================
// KHỞI ĐỘNG
// ========================================

updateHP();

updateScore();

gameLoop();