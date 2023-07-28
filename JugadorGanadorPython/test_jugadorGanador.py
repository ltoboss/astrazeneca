import unittest
from unittest.mock import patch, Mock
from io import StringIO
import tkinter as tk
from tkinter import filedialog
import sys
import jugadorGanador

from jugadorGanador import getFileInput, readLinesInput, validateInputValue

class TestFunctions(unittest.TestCase):
    
    def test_readLinesInput(self):
        input_lines = ["140 82\n", "89 134\n", "90 110\n"]
        expected_values = [[140, 82], [89, 134], [90, 110]]
        values = jugadorGanador.readLinesInput(input_lines)
        self.assertEqual(values, expected_values)

    def test_validateInputValue(self):
        valid_input = "100"
        invalid_input = "abc"

        valid_result = jugadorGanador.validateInputValue(valid_input)
        invalid_result = jugadorGanador.validateInputValue(invalid_input)

        self.assertEqual(valid_result, 100)
        self.assertIsNone(invalid_result)

    def test_errorManager(self):
        with self.assertRaises(SystemExit) as cm:
            jugadorGanador.errorManager("Test error message")
        self.assertEqual(cm.exception.code, 1)


if __name__ == '__main__':
    unittest.main()
