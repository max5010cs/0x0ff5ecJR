

# Lock Loop Script (Educational Purpose Only)

## Disclaimer

This script is intended for educational, ethical, and personal testing purposes only.  
It demonstrates how automated screen locking works in Linux environments (e.g., Kali Linux using xflock4).

Do not use this script on machines you don’t own or without full consent.  
The author is not responsible for any misuse, damage, or data loss caused by this script.

---

## What It Does

- Automatically locks the screen after a specified delay.
- Can optionally be configured to run in a loop — re-locking the screen after each unlock.
- Intended for testing system behavior, security awareness, or scripting practice.

---

## Potential Risks

Improper configuration (e.g., 1-second delay in a loop) can cause a lock loop that’s hard to escape.

If you're locked out of your desktop due to this script, see the Recovery Methods below.

---

## Recovery Methods

### 1. Boot into TTY Mode
- Press Ctrl + Alt + F3 (or F4, F5, etc.)
- Log in with your user credentials.
- Kill the script with:
  `bash
  pkill -f lilspam.py

2. Use a Bootable USB (Live Linux)

Boot into a Live USB environment (e.g., Kali or Ubuntu).

Mount your internal disk.

Navigate to the script location.

Delete or rename the script.


3. Use GRUB Recovery (Advanced)

Boot into GRUB.

Choose Advanced options > Recovery mode.

Remove any auto-execution lines from .bashrc, crontab, or autostart configs.



---

Best Practices

Always test in a virtual machine (VM) or disposable environment first.

Add a visible delay (e.g., 10–15 seconds) to allow interruption.

Never set it to autorun unless you have a recovery plan.

Use Ctrl + C support in your script to manually interrupt the loop.



---

Example Use Cases

Security demonstrations

Lockdown simulation

Scripting and automation practice





---

License

This project is provided "as is" under the MIT License.

