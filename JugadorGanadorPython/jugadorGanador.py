import sys


def getFileInput():
    if len(sys.argv) < 2:
        print("You must give the input file")
        sys.exit();

    fileSelected = sys.argv[1]

    if "." in fileSelected and not fileSelected.lower().endswith(".txt"):
        print("You must give a valid file (text file)")
        return False
    else:
        if "." not in fileSelected:
            return fileSelected + ".txt"
        else:
            return fileSelected

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

def saveFile(input):

    resultFile = "result.txt"
    if len(sys.argv) > 2:
        resultFile = sys.argv[2]

    if "." in resultFile and not resultFile.lower().endswith(".txt"):
        removeExtension = resultFile.rsplit(".",1)
        if len(removeExtension) > 1:
            resultFile = removeExtension[0] + ".txt"
        else:
            resultFile += ".txt" 
    else:
        resultFile += ".txt" 
    with open(resultFile, "w") as newFile:
        newFile.write(input)

    print(f"File {resultFile} was created")

def main():
    fileSelected = getFileInput()

    if fileSelected:
        try:
            with open(fileSelected, mode="r") as file:
                lines = file.readlines()
                values = readLinesInput(lines)

                if not len(values) > 1:
                    errorManager("The value of score from players is not valid")

                maxDiff = 0
                winner = 1
                numberOfRounds = [item[0] for item in values if len(item) == 1]

                if not validateInputValue(numberOfRounds[0]):
                    errorManager("The value of number of rounds is not valid")

                if not len(values) - 1 == numberOfRounds[0]:
                    errorManager("The number of rounds given is different to the rounds in file")

                for item in values:
                    if len(item) > 1:
                        diff = abs(item[0] - item[1])
                        if(diff > maxDiff):
                            maxDiff = diff
                            winner = 1 if item[0] > item[1] else 2


                
                saveFile(f"{winner} {maxDiff}")


        except FileNotFoundError:
            print("The file was not founded")
    else:
        print("Not selected file")

if __name__ == "__main__":
    main()