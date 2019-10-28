const coushonDisplacement = .3;
const fieldBoundariesForCoushons = 8;
const cushonMovement = function (event) {
    event.preventDefault();

    if (event.keyCode === 83) // if "S" pressed
        blueCoushon.position.y -= coushonDisplacement;
    if (event.keyCode === 65) // if "A" pressed
        blueCoushon.position.y += coushonDisplacement;

    // to keep the left coushon inside the field
    if (blueCoushon.position.y > fieldBoundariesForCoushons)
        blueCoushon.position.y = fieldBoundariesForCoushons;
    else if (blueCoushon.position.y < -fieldBoundariesForCoushons)
        blueCoushon.position.y = -fieldBoundariesForCoushons;

    if (event.keyCode === 37) // if 'arrow left' pressed
        redCoushon.position.y -= coushonDisplacement;
    if (event.keyCode === 39) // if 'arrow right' pressed
        redCoushon.position.y += coushonDisplacement;

    // to keep the right coushon inside the field
    if (redCoushon.position.y > fieldBoundariesForCoushons)
        redCoushon.position.y = fieldBoundariesForCoushons;
    else if (redCoushon.position.y < -fieldBoundariesForCoushons)
        redCoushon.position.y = -fieldBoundariesForCoushons;
}
document.addEventListener('keydown', cushonMovement, false);
document.addEventListener('keyup', function () { coushonDisplacement = 0 }, false);

let speed = 0.2;
const plusOrMinusX = Math.random() < 0.5 ? -1 : 1;
const plusOrMinusY = Math.random() < 0.5 ? -1 : 1;
const MAX = 1.2;
const MIN = 0.0001;
const randomizeAngle = Math.random() * (MAX - MIN) + MIN; // to have a more random angle

let randomInitialVelocity = new THREE.Vector3(speed * Math.random(), speed * Math.random(), 0);

ball.position.y = Math.random() * (10 - 0) + 0 * plusOrMinusX; // initial position of the ball on the white line

function initializeBall(velocity) {

    ball.position.x += velocity.x;
    ball.position.y += velocity.y;

    // ball.position.x += (speed * h) * plusOrMinusX;
    // ball.position.y += (speed * h * randomizeAngle) * plusOrMinusY;
}

function updateBoxHelpers() {
    ballBoxHelper.update();
    ballBBox.setFromObject(ballBoxHelper);

    leftBorderBoxHelper.update();
    leftBorderBBox.setFromObject(leftBorderBoxHelper);

    lowerBorderBoxHelper.update();
    lowerBorderBBox.setFromObject(lowerBorderBoxHelper);

    upperBorderBoxHelper.update();
    upperBorderBBox.setFromObject(upperBorderBoxHelper);

    blueCoushonBoxHelper.update();
    blueCoushonBBox.setFromObject(blueCoushonBoxHelper);

    redCoushonBoxHelper.update();
    redCoushonBBox.setFromObject(redCoushonBoxHelper);
}

const pushBallFromTextures = 0.4; // used to avoid sticking to the textures
function reflectBall() {

    if (ballBBox.intersectsBox(lowerBorderBBox)) {
        randomInitialVelocity = specularReflection(randomInitialVelocity, lowerBorder.position);
        ball.position.y += pushBallFromTextures;
        initializeBall(randomInitialVelocity);
    }

    if (ballBBox.intersectsBox(blueCoushonBBox) || ballBBox.intersectsBox(leftBorderBBox)) {
        randomInitialVelocity = specularReflection(randomInitialVelocity, leftBorder.position);
        ball.position.x += pushBallFromTextures;
        initializeBall(randomInitialVelocity);
    }

    if (ballBBox.intersectsBox(upperBorderBBox)) {
        randomInitialVelocity = specularReflection(randomInitialVelocity, upperBorder.position);
        ball.position.y -= pushBallFromTextures;
        initializeBall(randomInitialVelocity);
    }

    if (ballBBox.intersectsBox(redCoushonBBox)) {
        randomInitialVelocity = specularReflection(randomInitialVelocity, redCoushon.position);
        ball.position.x -= pushBallFromTextures;
        initializeBall(randomInitialVelocity);
    }
}

function gameOverCheck() {

    if (multiPlayer) {
        if (ball.position.x > 15 || ball.position.x < -15 || ball.position.y > 10 || ball.position.y < -10) {
            window.alert("Game over!");
            ball.position.set(0, Math.random() * (10 - 0) + 0 * plusOrMinusX, 0);
        }
    } else {

        if (ball.position.x > 15 || ball.position.x < -15 || ball.position.y > 10 || ball.position.y < -10) {
            if (ball.position.x > 15) {
                window.alert("Game over! Blue won.");
            }

            if (ball.position.x < -15) {
                window.alert("Game over! Red won.");
            }
            ball.position.set(0, Math.random() * (10 - 0) + 0 * plusOrMinusX, 0);
        }
    }

}

const clock = new THREE.Clock();
const controls1 = new THREE.TrackballControls(camera1, canvas1);
const controls = new THREE.TrackballControls(camera, canvas);
function render() {
    requestAnimationFrame(render);

    const h = clock.getDelta();

    updateBoxHelpers()

    initializeBall(randomInitialVelocity);

    reflectBall();

    gameOverCheck();

    controls1.update();
    controls.update();

    if (multiPlayer) {
        renderer1.setSize(0, 0);
        renderer.render(scene, camera);
    } else {
        renderer1.render(scene, camera1);
        renderer.render(scene, camera);
    }
}

render();