import time
import subprocess

def lock_screen():
    try:
        subprocess.run("xflock4", shell=True)
        print("Lock command executed.")
    except Exception as e:
        print(f"Lock failed: {e}")

def main():
    print("Waiting 5 seconds before locking screen.")
    time.sleep(5)
    print("Locking screen now...")
    lock_screen()

if __name__ == "__main__":
    main()