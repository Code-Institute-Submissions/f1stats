# Formula 1 Stats
Formula 1 Stats website with interactive D3 JS Graphs. The website has a few pages with different D3 JS Graphs working in an interactive manner to display statistics from the 1950 Formula 1 Season to the start of the 2017 Season
## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
### Prerequisites
You will need MongoDB which can be setup through the command line
#### Installing
Ensure you have the CSV file f1final.csv saved on your machine
Open a command line and type:
`mongod`

Change directory to the location of the f1final.csv file and in a new command line type:

`mongoimport -d f1db -c f1results --type csv --file f1final.csv --headerline`

You should now be live with the import of data, and the second command line box should display:

`-TIMESTAMP- connected to: localhost`

`-TIMESTAMP- imported 23514 documents`

### Testing and Validation
The vast majority of testing for this app was done manually, with the prerequisites mentioned above live and in place, additions and edits to the code would be tested as implemented, to ensure they were functioning as planned, before moving on to the next subject. The following is a breakdown of all features tested and what I discovered

# Dashboard and CSS
The dashboard was built from a navbar template explored previously, and I added the Home, Drivers and Circuits tabs as lists after seeing the CSS would not highlight these tabs as individual boxes when they were previously listed as 'a' elements. The intro.js button was added later in the dev cycle as part of the course requirements. There is a plan to change the style of this function in the final stages

# Ensuring Data from MongoDB Live
To test that the web app was recieved the f1final.csv data from MondoDB, please use the url https://example.com/f1db - This will display the raw data being imported in. Without this, the graphs will fail.

# Start more stuff from here

## Built With
* PyCharm 2016.3.2

* MongoDB

* MySQL Workbench 6.3

## Acknowledgements
* Yoni Lavi - Mentor
