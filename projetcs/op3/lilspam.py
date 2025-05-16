import time
import subprocess

def lock_screen():
    try:
        subprocess.run("xflock4", shell=True)
        print("Locked the screen.")
    except Exception as e:
        print(f"Lock failed: {e}")

def is_screen_locked():
    try:
        # Checks if screen is locked using loginctl (works on many systems)
        result = subprocess.check_output("loginctl show-session $(loginctl | grep $(whoami) | awk '{print $1}') -p LockedHint", shell=True)
        return b"yes" in result
    except:
        return False  # fallback, assume unlocked

def main():
    while True:
        print("Locking the screen...")
        lock_screen()
        
        print("Waiting for screen to be unlocked...")
        while is_screen_locked():
            time.sleep(1)

        print("Screen unlocked! Waiting 10 seconds before re-lock...")
        time.sleep(20)

# Run if script is called directly
if __name__ == "__main__":
    main()