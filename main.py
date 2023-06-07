class GameObject():
    def __init__():
        pass
    def Draw(self):
        pass
    def OnTick(self):
        pass

class Alien(GameObject):
    def __init__(x_start: int, y_start: int):
        super().__init__()
        self.x = x_start
        self.y = y_start
        self.direction = 1
        pass

    def Draw(self):
        led.plot(self.x, self.y)

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
        super().__init__()
        self.x = 2
        self.y = 4

    def Draw(self):
        led.plot(self.x, self.y)

    def OnTick(self):
        if Player.left_waiting == True:
            self.MoveLeft()
        if Player.right_waiting == True:
            self.MoveRight()
        if Player.fire_waiting == True:
            self.Fire()
        
    def MoveLeft(self):
        pass
    
    def MoveRight(self):
        pass

    def Fire(self):
        pass

# Bind Inputs
def on_button_pressed_a():
    Player.leftwai
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    pass
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_button_pressed_ab():
    pass
input.on_button_pressed(Button.AB, on_button_pressed_ab)

# Initialise Game Objects
game_objects: List[GameObject] = []
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

    # Tick Delay
    pause(600)