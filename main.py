class GameObject():
    def __init__(x: int, y: int):
        self.x = x
        self.y = y

    def CheckCollision(other: GameObject):
        if self.x == other.x and self.y == other.y:
            collision = True
        else:
            collision = False
        return collision

    def Draw(self):
        led.plot(self.x, self.y)

    def OnTick(self):
        pass
    def OnCollision(self, other: GameObject):
        pass

# Global list of GameObject
game_objects: List[GameObject] = []

class Alien(GameObject):
    def __init__(x: int, y: int):
        super().__init__(x, y)
        self.direction = 1
        pass

    def OnTick(self):
        self.x += self.direction
        if self.x > 4:
            self.x = 4
            self.direction = -1
        if self.x < 0:
            self.x = 0
            self.direction = 1

class Player(GameObject):
    left_waiting = False
    right_waiting = False
    fire_waiting = False
    def __init__():
        super().__init__(2, 4)

    def OnTick(self):
        if Player.left_waiting == True:
            self.MoveLeft()
        if Player.right_waiting == True:
            self.MoveRight()
        if Player.fire_waiting == True:
            self.Fire()
        
    def MoveLeft(self):
        Player.left_waiting = False
        if self.x > 0:
            self.x -= 1
    
    def MoveRight(self):
        Player.right_waiting = False
        if self.x < 5:
            self.x += 1

    def Fire(self):
        Player.fire_waiting = False
        global game_objects
        game_objects.append(Projectile(self.x, self.y - 1))

class Projectile(GameObject):
    def OnTick(self):
        global game_objects
        self.y -= 1
        if self.y < 0:
            game_objects.remove(self)
    
    def OnCollision(self, other: GameObject):
        global game_objects
        game_objects.remove(self)
        game_objects.remove(other)

# Bind Inputs
def on_button_pressed_a():
    Player.left_waiting = True
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    Player.right_waiting = True
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    Player.fire_waiting = True
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Initialise Game Objects
game_objects.append(Player())
game_objects.append(Alien(0, 0))

# Run Game
while True:
    # Draw
    basic.clear_screen()
    for obj_d in game_objects:
        obj_d.Draw()
    
    # Tick
    for obj_t in game_objects:
        obj_t.OnTick()

    # Detect Collisions


    # Tick Delay
    pause(600)