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

`-TIMESTAMP- connected to: localhost

-TIMESTAMP- imported 23514 documents`

## Built With
* PyCharm 2016.3.2

* MongoDB

* MySQL Workbench 6.3

## Acknowledgements
* Yoni Lavi - Mentor
