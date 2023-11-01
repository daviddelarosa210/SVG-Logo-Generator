const inquirer = require('inquirer');
const fs = require('fs');

// Mock the inquirer prompt method
jest.mock('inquirer', () => ({
  prompt: jest.fn(),
}));

// Mock the fs writeFile method
jest.mock('fs', () => ({
  writeFile: jest.fn(),
}));

// Import the code to be tested
const generateLogo = require('./app');

describe('generateLogo', () => {
  it('should generate the SVG code and write it to a file', () => {
    // Set up the mock inquirer prompt response
    inquirer.prompt.mockResolvedValueOnce({
      text: 'ABC',
      textColor: 'red',
      shape: 'circle',
      shapeColor: 'blue',
    });

    // Call the function to be tested
    generateLogo();

    // Check that the inquirer prompt method was called with the correct questions
    expect(inquirer.prompt).toHaveBeenCalledWith([
      {
        type: 'input',
        name: 'text',
        message: 'Enter up to three characters:',
        validate: expect.any(Function),
      },
      {
        type: 'input',
        name: 'textColor',
        message: 'Enter the text color (keyword or hexadecimal number):',
      },
      {
        type: 'list',
        name: 'shape',
        message: 'Choose a shape:',
        choices: ['circle', 'triangle', 'square'],
      },
      {
        type: 'input',
        name: 'shapeColor',
        message: 'Enter the shape color (keyword or hexadecimal number):',
      },
    ]);

    // Check that the fs writeFile method was called with the correct arguments
    expect(fs.writeFile).toHaveBeenCalledWith(
      'logo.svg',
      expect.stringContaining('<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">'),
      expect.any(Function)
    );
  });
});