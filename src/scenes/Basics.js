class Basics extends Phaser.Scene {
    constructor() {
        super('basicsScene')
    }

    preload() {
        // load assets
        this.load.path = './assets/'
        this.load.atlas('fruitandveg', 'img/fruitandveg.png', 'img/fruitandveg.json')
        this.load.bitmapFont('gem_font', 'font/gem.png', 'font/gem.xml')
    }

    create() {
        // do camera stuff
        const centerX = this.cameras.main.centerX
        const centerY = this.cameras.main.centerY
        const w = this.cameras.main.width
        const h = this.cameras.main.height
        this.cameras.main.setBackgroundColor(0x11dc00)

        // add sprites
        let tomato = this.add.sprite(centerX, centerY, 'fruitandveg', 'tomato')
        let verygoodpear = this.add.sprite(64, 64, 'fruitandveg', 'pear')

        // add text
        this.instructionText = this.add.bitmapText(centerX, centerY, 'gem_font', '', 24).setOrigin(0.5)

        // add tween
        let basicTween = this.tweens.add({
            targets: tomato,
            alpha: { from: 0, to: 1 },
            scale: { from: 0.1, to: 18 },
            angle: { from: 0, to: 360 },
            ease: 'Sine.easeInOut',
            duration: 2000,
            repeat: 1,
            yoyo: true,
            hold: 1000,
            onStart: () => {
                this.instructionText.text = 'Tomato tween, let\'s gooooooo'
            },
            onYoyo: () => {
                this.instructionText.text = 'Time to yoyo this tomato tween'
            },
            onRepeat: () => {
                this.instructionText.text = 'Let\s repeat the tween'
            },
            onComplete: () => {
                this.instructionText.text = 'Tomato tween complete!'
            }
        })

        //create tween chain
        let pearTweenChain = this.tweens.chain({
            targets: verygoodpear,
            loop: 1,
            paused: true,
            tweens: [
                {
                    x: w - 64,
                    duration: 500,
                    ease: 'Bounce.easeOut',
                },
                {
                    duration: 500,
                    angle: 90,
                },
                {
                    y: h - 64,
                    scale: {
                        from: 1,
                        to: 2.25
                    },
                    duration: 1000,
                    ease: 'Sine.easeOut',
                },
                {
                    duration: 500,
                    angle: 180,
                },
                {
                    x: 64,
                    duration: 1500,
                },
                {
                    duration: 500,
                    angle: -90,
                },
                {
                    y: 64,
                    duration: 1000,
                    scale: {
                        from: 2.25,
                        to: 1
                    },
                },
                {
                    duration: 500,
                    angle: 0,
                },
            ]
        })

        // enable scene reload key
        this.reload = this.input.keyboard.addKey('R')

        // add mouse input listener to start tween chain
        this.input.on('pointerdown', () => {
            verygoodpear.setPosition(64, 64)
            pearTweenChain.restart()
            verygoodpear.setAngle(0)
        })

        // update instruction text
        document.getElementById('info').innerHTML = '<strong>Basics.js</strong><br>R: Restart current scene'
    }

    update() {
        // scene switching / restart
        if(Phaser.Input.Keyboard.JustDown(this.reload)) {
            this.scene.restart()
        }
    }
}