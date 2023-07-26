

try:
    with open("input.txt", mode="r") as file:
        lines = file.readlines()
        values = []
        firstPlayerGames = []
        secondPlayerGames = []

        for line in lines:
            line_val = line.split()
            valueLine = [int(value) for value in line_val]
            values.append(valueLine)

        for item in values:
            if len(item) > 1:
                firstPlayerGames.append(item[0])
                secondPlayerGames.append(item[1])

        winner = 0
        advantage = 0;

        if max(firstPlayerGames)>max(secondPlayerGames):
            highest_index = firstPlayerGames.index(max(firstPlayerGames))
            winner = 1
        else:
            highest_index = secondPlayerGames.index(max(secondPlayerGames))
            winner = 2

        advantage = abs(firstPlayerGames[highest_index] - secondPlayerGames[highest_index]);

        with open("result.txt", "w") as newFile:
            newFile.write(f"{winner} {advantage}")

        print("File created as result.txt");
    

except FileNotFoundError:
    print("The file was not founded")