class GameObject {
    constructor() {
        
    }
    
    public Draw() {
        
    }
    
    public OnTick() {
        
    }
    
}

class Alien extends GameObject {
    x: number
    y: number
    direction: number
    constructor(x_start: number, y_start: number) {
        super()
        this.x = x_start
        this.y = y_start
        this.direction = 1
        
    }
    
    public Draw() {
        led.plot(this.x, this.y)
    }
    
    public OnTick() {
        this.x += this.direction
        if (this.x > 4) {
            this.x = 4
            this.direction = -1
        }
        
        if (this.x < 0) {
            this.x = 0
            this.direction = 1
        }
        
    }
    
}

class Player extends GameObject {
    static left_waiting: boolean
    private ___left_waiting_is_set: boolean
    private ___left_waiting: boolean
    get left_waiting(): boolean {
        return this.___left_waiting_is_set ? this.___left_waiting : Player.left_waiting
    }
    set left_waiting(value: boolean) {
        this.___left_waiting_is_set = true
        this.___left_waiting = value
    }
    
    static right_waiting: boolean
    private ___right_waiting_is_set: boolean
    private ___right_waiting: boolean
    get right_waiting(): boolean {
        return this.___right_waiting_is_set ? this.___right_waiting : Player.right_waiting
    }
    set right_waiting(value: boolean) {
        this.___right_waiting_is_set = true
        this.___right_waiting = value
    }
    
    static fire_waiting: boolean
    private ___fire_waiting_is_set: boolean
    private ___fire_waiting: boolean
    get fire_waiting(): boolean {
        return this.___fire_waiting_is_set ? this.___fire_waiting : Player.fire_waiting
    }
    set fire_waiting(value: boolean) {
        this.___fire_waiting_is_set = true
        this.___fire_waiting = value
    }
    
    static leftwai
    private ___leftwai_is_set: boolean
    private ___leftwai: any
    get leftwai(): any {
        return this.___leftwai_is_set ? this.___leftwai : Player.leftwai
    }
    set leftwai(value: any) {
        this.___leftwai_is_set = true
        this.___leftwai = value
    }
    
    x: number
    y: number
    public static __initPlayer() {
        Player.left_waiting = false
        Player.right_waiting = false
        Player.fire_waiting = false
    }
    
    constructor() {
        super()
        this.x = 2
        this.y = 4
    }
    
    public Draw() {
        led.plot(this.x, this.y)
    }
    
    public OnTick() {
        if (Player.left_waiting == true) {
            this.MoveLeft()
        }
        
        if (Player.right_waiting == true) {
            this.MoveRight()
        }
        
        if (Player.fire_waiting == true) {
            this.Fire()
        }
        
    }
    
    public MoveLeft() {
        
    }
    
    public MoveRight() {
        
    }
    
    public Fire() {
        
    }
    
}

Player.__initPlayer()

//  Bind Inputs
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    Player.leftwai
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    
})
//  Initialise Game Objects
let game_objects : GameObject[] = []
game_objects.push(new Alien(0, 0))
//  Run Game
while (true) {
    //  Draw
    basic.clearScreen()
    for (let obj_d of game_objects) {
        obj_d.Draw()
    }
    //  Tick
    for (let obj_t of game_objects) {
        obj_t.OnTick()
    }
    //  Tick Delay
    pause(600)
}
