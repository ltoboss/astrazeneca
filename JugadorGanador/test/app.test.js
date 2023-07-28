const { readFileContent } = require('../src/scores');
const { expect } = require('chai');


describe("Jugador ganador", () => {

    it("La funcion readFileContent deberá traer el resultado correcto", () => {
        const input =`4\n1182 82\n89 134\n90 110\n112 106`;
        const expected = "1 1100";
        expect(expected).to.equal(readFileContent(input).data);
    })
    
    it("La funcion readFileContent deberá traer el resultado correcto", () => {
        const input =`3\n4 100\n5 100\n1 100`;
        const expected = "2 99";
        expect(expected).to.equal(readFileContent(input).data);
    })

    
    it("La funcion readFileContent deberá regresar un error por el número de rondas (maximo)", () => {
        let allInputs = "";
        for(let i = 0; i < 10001; i++){
            allInputs+=`\n${i} 10`;
        }
        const input =`10001\n${allInputs}`;
        const expected = "The number of games must be greater than 0 and lower or equal than 10000";
        expect(expected).to.equal(readFileContent(input).error);
    })

    it("La funcion readFileContent deberá regresar un error por el tipo de dato en el numero de rondas", () => {
        const input =`a\n4 100\n5 100\n1 100`;
        const expected = "The number of games (a) is not valid.";
        expect(expected).to.equal(readFileContent(input).error);
    })
    
    it("La funcion readFileContent deberá regresar un error por el tipo de dato en el score del player 1", () => {
        const input =`3\na 100\n5 100\n1 100`;
        const expected = "The score's data is not a number, please verify";
        expect(expected).to.equal(readFileContent(input).error);
    })
    
    it("La funcion readFileContent deberá regresar un error por el tipo de dato en el score del player 2", () => {
        const input =`3\n10 12\n5 a\n213 10`;
        const expected = "The score's data is not a number, please verify";
        expect(expected).to.equal(readFileContent(input).error);
    })

    it("La funcion readFileContent deberá regresar un error por el mal formato de la información", () => {
        const input = `1`; 
        const expected = "The file has invalid format";
        expect(expected).to.equal(readFileContent(input).error);
    })

    it("La funcion readFileContent deberá regresar un error por la discrepancia entre los rounds dados en la primer fila y los rounds del archivo", () => {
        const input = `3\n10 12`; 
        const expected = "The number of rounds given is different to the rounds in file";
        expect(expected).to.equal(readFileContent(input).error);
    })

});