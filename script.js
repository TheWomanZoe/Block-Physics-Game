let Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

let engine;
let blocks = [];
let mouseConstraint;
let canvas;
let walls = [];

function setup() {
    canvas = createCanvas(1800, 900);

    engine = Engine.create();

    let mouse = Mouse.create(canvas.elt);
    let options = {
        mouse: mouse
    };
    mouseConstraint = MouseConstraint.create(engine, options);
    World.add(engine.world, mouseConstraint);

    let thickness = 50;
    walls.push(Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }));
    walls.push(Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }));
    walls.push(Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }));
    walls.push(Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }));

    World.add(engine.world, walls);
}

function draw() {
    background(255, 191, 0);

    Engine.update(engine);

    for (let i = blocks.length - 1; i >= 0; i--) {
        let block = blocks[i];

        if (mouseIsOverBlock(block) && keyIsDown(81)) {
            World.remove(engine.world, block.body);
            blocks.splice(i, 1);
        } else {
            block.show();
        }
    }

}

class Block {
    constructor(x, y, w, h) {
        this.w = w;
        this.h = h;
        this.body = Bodies.rectangle(x, y, w, h, {
            restitution: 0.5,
            friction: 0.5
        });
        World.add(engine.world, this.body);
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        fill(238, 75, 43);
        stroke(0);
        rect(0, 0, this.w, this.h);
        pop();
    }
}

function keyPressed() {
    if (keyCode === 69) {
        let block = new Block(mouseX, mouseY, 60, 60);
        blocks.push(block);
    }
}

function mouseIsOverBlock(block) {
    let pos = block.body.position;
    let distance = dist(mouseX, mouseY, pos.x, pos.y);
    return distance < block.w / 2;
}
