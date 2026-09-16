TypeScript Calculator

A simple, interactive calculator built with HTML, CSS, and
TypeScript. The project uses a modern glassmorphism-style interface
and supports basic arithmetic operations.

Features:
Addition
Subtraction
Multiplication
Division
Percentage calculation
Decimal numbers
Clear (AC) button
Delete (DEL) button
Division-by-zero handling
Continuous calculations
Responsive glassmorphism-style UI

Technologies Used

HTML5
CSS3
TypeScript
JavaScript
Git & GitHub

Project Structure

TypeScript-Calculator/
│
├── index.html
├── style.css
├── app.ts
├── tsconfig.json
│
└── dist/
    └── app.js

How It Works

The calculator maintains three main pieces of state:

currentInput --- the number currently displayed.

previousInput --- the number stored before an operator is
selected.

operator --- the selected arithmetic operation.

For example:

10 + 5 = 15
15 × 2 = 30

The result of one calculation can be used as the starting value for the
next calculation.

Running the Project Locally

1. Clone the repository

git clone https://github.com/DETR0xxx/TypeScript-Calculator.git
cd TypeScript-Calculator

2. Compile TypeScript

Make sure TypeScript is installed or available through npx, then run:

npx tsc

This compiles app.ts into:

dist/app.js

3. Open the application

Open index.html in a browser or use a local development server such as
the VS Code Live Server extension.

TypeScript Compilation

The project uses tsconfig.json to configure TypeScript.

The generated JavaScript is placed in the dist directory:

app.ts
   ↓
TypeScript Compiler
   ↓
dist/app.js
   ↓
Browser

Git Workflow

After making changes:

git add .
git commit -m "Describe your changes"
git push

Future Improvements

Possible future enhancements include:

Keyboard support

Calculation history

Scientific calculator functions

Dark/light themes

Improved mobile responsiveness

Sound or button animations

Hosting with GitHub Pages

Author

Nikhil Raj

License

This project is available for learning and personal use.
