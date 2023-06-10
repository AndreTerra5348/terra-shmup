import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ background: '#1099bb', height: 500, width: 500 });

document.body.appendChild(app.view);

const text = new PIXI.Text('Hello World', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0x000000,
    align: 'center',
});

text.x = app.screen.width / 2 - text.width / 2;
text.y = app.screen.height / 2 - text.height / 2;

app.stage.addChild(text);
