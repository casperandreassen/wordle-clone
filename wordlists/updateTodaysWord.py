import json
import pathlib
import random

tmpList = []

def job():
    with open(str(pathlib.Path(__file__).parent.resolve()) + "/allwords.txt", "r") as f:
        words = f.read()
        tmpString = ""
        for c in words:
            if c.isalpha():
                tmpString += c
            if c == ",":
                tmpList.append(tmpString)
                tmpString = ""
    with open(str(pathlib.Path(__file__).parent.resolve()) + "/todaysWord.json", "w") as n:
        rand = random.randint(0, len(tmpList) - 1)
        newWord = {
            "todaysWord" : tmpList[rand]
        }
        n.write(json.dumps(newWord)) 
    with open(str(pathlib.Path(__file__).parent.resolve()) + "/allwords.txt", "w") as f:
        for word in tmpList:
            f.write(word + ",")

job()

