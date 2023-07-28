const { readFileContent } = require('../src/file');
const { expect } = require('chai');

describe('Instrucciones encriptadas', () => {

    it('La función readFileContent deberá traer el resultado corrrecto', () => {
      const input = `11 15 38\nCeseAlFuego\nCorranACubierto\nXXcaaamakkCCessseAAllFueeegooDLLKmmNNN`;
      const expected = "SI\nNO";
      let a =  readFileContent(input);
      expect(expected).to.equal(a);
    });
    it('La función readFileContent deberá traer el resultado corrrecto', () => {
      const input = `17 22 47\nBienvenidoAMexico\nBienvenidoAGuadalajara\nCCcdBbbiiienVvenidoAaGjuaDdalaaaJjaarrraaaXXccc`;
      const expected = "NO\nSI";
      let a =  readFileContent(input);
      expect(expected).to.equal(a);
    });


    it('La función readFileContent deberá traer un error de longitud en el primer caso (no coincide)', () => {
      const input = `32 22 47\nBienvenidoAMexico\nBienvenidoAGuadalajara\nCCcdBbbiiienVvenidoAaGjuaDdalaaaJjaarrraaaXXccc`;
      const expected = "The data BienvenidoAMexico it's incorrect, lenght (32) doesn't match or it's size is not allowed";
      expect(() => readFileContent(input)).to.throw(expected)
    });

    it('La función readFileContent deberá traer un error de longitud en el segundo caso (no coincide)', () => {
      const input = `17 98 47\nBienvenidoAMexico\nBienvenidoAGuadalajara\nCCcdBbbiiienVvenidoAaGjuaDdalaaaJjaarrraaaXXccc`;
      const expected = "The data BienvenidoAGuadalajara it's incorrect, lenght (98) doesn't match or it's size is not allowed";
      expect(() => readFileContent(input)).to.throw(expected)
    });
    
    it('La función readFileContent deberá traer un error de longitud en el mensaje (no coincide)', () => {
      const input = `17 22 1\nBienvenidoAMexico\nBienvenidoAGuadalajara\nddd`;
      const expected = "The data ddd it's incorrect, lenght (1) doesn't match or it's size is not allowed";
      expect(() => readFileContent(input)).to.throw(expected)
    });


    it('La función readFileContent deberá traer un error de longitud en el primer caso (tamaño no permitido)', () => {
      const input = `56 22 47\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nBienvenidoAGuadalajara\nCCcdBbbiiienVvenidoAaGjuaDdalaaaJjaarrraaaXXccc`;
      const expected = "The data Lorem ipsum dolor sit amet, consectetur adipiscing elit. it's incorrect, lenght (56) doesn't match or it's size is not allowed";
      expect(() => readFileContent(input)).to.throw(expected)
    });

    it('La función readFileContent deberá traer un error de longitud en el segundo caso (tamaño no permitido)', () => {
      const input = `22 56 47\nBienvenidoAGuadalajara\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nCCcdBbbiiienVvenidoAaGjuaDdalaaaJjaarrraaaXXccc`;
      const expected = "The data Lorem ipsum dolor sit amet, consectetur adipiscing elit. it's incorrect, lenght (56) doesn't match or it's size is not allowed";
      expect(() => readFileContent(input)).to.throw(expected)
    });
    
    it('La función readFileContent deberá traer un error de longitud en el mensaje (tamaño no permitido)', () => {
      const input = `22 26 1\nBienvenidoAGuadalajara\nLorem ipsum dolor sit amet\nb`;
      const expected = "The data b it's incorrect, lenght (1) doesn't match or it's size is not allowed";
      expect(() => readFileContent(input)).to.throw(expected)
    });
    

    it('La función readFileContent deberá traer ambos en falso a pesar de que se cumplan ambas condiciones', () => {
      const input = `22 22 59\nBienvenidoAGuadalajara\nBienvenidoAGuadalajara\nCCccccCBieasdnasdvasdeasdnasdidoasdadassAGuadalajaracdsCSDd`;
      const expected = "NO\nNO";
      expect(expected).to.equal(readFileContent(input));
    });


    it('La función readFileContent deberá traer un error relacionado con el archivo', () => {
      const input = `0 22 59\nBienvenidoAGuadalajara\nCCccccCBieasdnasdvasdeasdnasdidoasdadassAGuadalajaracdsCSDd`;
      const expected = "The content of the file is incorrect, please verify";
      expect(() => readFileContent(input)).to.throw(expected)
    });
    



  });