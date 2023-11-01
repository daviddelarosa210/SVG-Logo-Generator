const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
  {
    type: 'input',
    name: 'text',
    message: 'Enter up to three characters:',
    validate: function (value) {
      if (value.length <= 3) {
        return true;
      } else {
        return 'Please enter up to three characters.';
      }
    },
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
])
  .then((answers) => {
    // Generate the SVG code
    const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="200">
      <text x="150" y="100" fill="${answers.textColor}" text-anchor="middle">${answers.text}</text>
      <${answers.shape} cx="150" cy="150" r="50" fill="${answers.shapeColor}" />
    </svg>`;

    // Write the SVG code to a file
    fs.writeFile('logo.svg', svgCode, (err) => {
      if (err) throw err;
      console.log('Generated logo.svg');
    });
  });