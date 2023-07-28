import tkinter as tk
from tkinter import filedialog


def getFileInput(root):
    root.withdraw();
    fileSelected = filedialog.askopenfilename(title="Select a file:")
    root.destroy();
    return fileSelected;

def readLinesInput(lines):
    values = [];
    for line in lines:
        lineVal = line.split()
        try:
            valueLine = [int(value) for value in lineVal]
            values.append(valueLine)
        except:
            errorManager("The file contains invalid values")
    return values

def validateInputValue(input):
    try:
        return int(input)
    except ValueError:
        return None
    
def errorManager(error):
    print(error)
    raise SystemExit(1)


def main():
    root = tk.Tk()

    fileSelected = getFileInput(root)

    if fileSelected:
        try:
            with open(fileSelected, mode="r") as file:
                lines = file.readlines()
                values = readLinesInput(lines)

                if not len(values) > 1:
                    errorManager("The value of score from player 1 is not valid")

                firstPlayerGames = [item[0] for item in values if len(item) > 1]
                secondPlayerGames = [item[1] for item in values if len(item) > 1]
                numberOfRounds = [item[0] for item in values if len(item) == 1]

                if not validateInputValue(numberOfRounds[0]):
                    errorManager("The value of number of rounds is not valid")

                if not len(values) - 1 == numberOfRounds[0]:
                    errorManager("The number of rounds given is different to the rounds in file")

                winner = 0
                advantage = 0

                if max(firstPlayerGames) > max(secondPlayerGames):
                    highest_index = firstPlayerGames.index(max(firstPlayerGames))
                    winner = 1
                else:
                    highest_index = secondPlayerGames.index(max(secondPlayerGames))
                    winner = 2

                advantage = abs(firstPlayerGames[highest_index] - secondPlayerGames[highest_index])

                placeToSave = filedialog.asksaveasfilename(defaultextension=".txt", filetypes=[("Text files", "*.txt")], title="Save as...")

                if len(placeToSave) < 1:
                    placeToSave = "result.txt"

                with open(placeToSave, "w") as newFile:
                    newFile.write(f"{winner} {advantage}")

                print("File created as result.txt")

        except FileNotFoundError:
            print("The file was not founded")
    else:
        print("Not selected file")

if __name__ == "__main__":
    main()