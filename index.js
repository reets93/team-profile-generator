const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template");


// Write Code to gather information about the development team members, and render the HTML file.
// Pseudo-Code from Module 12 Office Hours with Dan. 


//array to push team member objects to
const teamMembers = []


inquirer.prompt([{
    //manager questions
    type: 'input',
    name: 'name',
    message: "What is the team manager's name?",
},
{
    type: 'input',
    name: 'id',
    message: "Enter the team manager's id number: ",
},
{
    type: 'input',
    name: 'email',
    message: "Enter the team manager's email address: ",
},
{
    type: 'input',
    name: 'officeNumber',
    message: "Enter the team manager's office number: "
}
]).then(response => {
    // populate manager info
    let newManager = new Manager(response.name, response.id, response.email, response.officeNumber)
    teamMembers.push(newManager)
    console.log(teamMembers)

    // prompt for the next employee
    nextEmployee()
})


const nextEmployee = () => {
    inquirer.prompt([{
        // choice of 3
        type: 'list',
        name: 'nextEmployee',
        message: "Choose which employee to add next: ",
        choices: ["Add an Engineer", "Add an Intern", "Finish building the team"]
    }]).then(response => {
        console.log(response)
        // if engineer
        if (response.nextEmployee === 'Add an Engineer') {
            // promptForEngineer
            addEngineer()
        }   // else if intern
        else if (response.nextEmployee === 'Add an Intern') {
            //    promptForIntern
            addIntern()
        } else {
            // use the functionality from page-template to generate the team
            // render()
            console.log(teamMembers)
            console.log("finished")
            buildPage()
        }
    })
}


const addEngineer = () => {
    inquirer.prompt([
        //engineer questions
        {
            type: 'input',
            name: 'name',
            message: "What is the Engineer's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the Engineer's ID?"
        },
        {
            type: 'email',
            name: 'email',
            message: "What is the Engineer's email?"
        },
        {
            type: 'input',
            name: 'github',
            message: "What is the Engineer's github username?"
        }
    ]).then(response => {
        // add new engineer to employees array
        let newEngineer = new Engineer(response.name, response.id, response.email, response.github)
        teamMembers.push(newEngineer)
        console.log(teamMembers)

        // prompt for next employee
        nextEmployee()
    })
}


const addIntern = () => {
    inquirer.prompt([
        //intern questions 
        {
            type: 'input',
            name: 'name',
            message: "What is the Intern's name?"
        },
        {
            type: 'input',
            name: 'id',
            message: "What is the Intern's ID?"
        },
        {
            type: 'email',
            name: 'email',
            message: "What is the Intern's email?"
        },
        {
            type: 'input',
            name: 'school',
            message: "What is the name of the Intern's school?"
        }
    ]).then(response => {
        // add new intern to employees array
        let newIntern = new Intern(response.name, response.id, response.email, response.school)
        teamMembers.push(newIntern)
        console.log(teamMembers)

        // prompt for next employee
        nextEmployee()
    })
}

const buildPage = () => {
    const htmlContent = render(teamMembers)
    fs.writeFileSync('./output/team.html', htmlContent)
    console.log(htmlContent)
}
