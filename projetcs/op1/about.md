###  Basic encyptor written in python with very cool logic.


# Logic

This file can encrypt the targted file and generates a key. Interesteningly from user side key can not be obtained. To simlulate the real world ransomware attack, i have opened the key.txt file and created decryptor key will be saved there. But the user can not obtain it by just opening that file because even the key will be encrypted wiht a magic word. Specifically I have set a magic word that decrypts the key inside the key.txt and uses it to decrypt the target file back.

# How to test(run)

1. Clone the rmote.py
2. Open a file named important.txt (this really depends what files you are targeting)
3. Run the script
4. Now rmote.py should encrypt anyting inside target file and drop decrypor and key files.
5. To decrypt the target file back, just run the decryptor file and enter the magic word.

Why to enter the magic word not the decryption key?
Because generated decryption key is saved inside key.txt but encrypted, basically locked under the magic word. Decryptor file will use that key to decrypt files back but for the key to be used you will need the magic word.

# Magic word
donut
