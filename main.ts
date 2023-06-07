class GameObject {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    
    public static CheckCollision(other: GameObject): boolean {
        let collision: boolean;
        if (this.x == other.x && this.y == other.y) {
            collision = true
        } else {
            collision = false
        }
        
        return collision
    }
    
    public Draw() {
        led.plot(this.x, this.y)
    }
    
    public OnTick() {
        
    }
    
    public OnCollision(other: GameObject) {
        
    }
    
}

//  Global list of GameObject
let game_objects : GameObject[] = []
class Alien extends GameObject {
    direction: number
    constructor(x: number, y: number) {
        super(x, y)
        this.direction = 1
        
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
    
    public static __initPlayer() {
        Player.left_waiting = false
        Player.right_waiting = false
        Player.fire_waiting = false
    }
    
    constructor() {
        super(2, 4)
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
        Player.left_waiting = false
        if (this.x > 0) {
            this.x -= 1
        }
        
    }
    
    public MoveRight() {
        Player.right_waiting = false
        if (this.x < 5) {
            this.x += 1
        }
        
    }
    
    public Fire() {
        Player.fire_waiting = false
        
        game_objects.push(new Projectile(this.x, this.y - 1))
    }
    
}

Player.__initPlayer()

class Projectile extends GameObject {
    public OnTick() {
        
        this.y -= 1
        if (this.y < 0) {
            game_objects.removeElement(this)
        }
        
    }
    
    public OnCollision(other: GameObject) {
        
        game_objects.removeElement(this)
        game_objects.removeElement(other)
    }
    
}

//  Bind Inputs
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    Player.left_waiting = true
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    Player.right_waiting = true
})
input.onButtonPressed(Button.AB, function on_button_pressed_ab() {
    Player.fire_waiting = true
})
//  Initialise Game Objects
game_objects.push(new Player())
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
    //  Detect Collisions
    //  Tick Delay
    pause(600)
}
