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

#### Dashboard and CSS
The dashboard was built from a navbar template explored previously, and I added the Home, Drivers and Circuits tabs as lists after seeing the CSS would not highlight these tabs as individual boxes when they were previously listed as 'a' elements. The intro.js button was added later in the dev cycle as part of the course requirements. There is a plan to change the style of this function in the final stages

#### Ensuring Data from MongoDB Live
To test that the web app was recieved the f1final.csv data from MondoDB, please use the url https://example.com/f1db - This will display the raw data being imported in. Without this, the graphs will fail.

#### dc.rowChart & dc.lineChart
The initial graphs you see on the home page were created with basic parameters, and then edited to suit the data in a more visually appealing environment. Once the correct dimensions and groups were figured out with named variables utilising ndx.dimension, the graphs were further improved with the use of;
* .linealColors - To colour the graphs with the same theme, with custom values in each chart so the flow from red to orange was consistant
* .cap(20) in place for both row charts, as each chart is set to display the top 20 drivers in any given time period. The results in 'alltime' is huge and would not be easy on the eye.

#### Drivers Page dc.selectMenu & dc.pieChart
On the Drivers Page of the web app, you will see two different dc.js functions, one is a simple driver selection box and the second, a pie chart which is reactive to the choice selected from the aformentioned box. These also react with a Wikipedia iframe displayed on the page. 
A lot of testing and trial and error went into these functions to get the end result which is displayed currently.
* renderlet is a function used once a driver has been selected from the dc.selectMenu. It selects an array based on the output choice to then gather statistics regarding the name of the chosen driver. The selected index is then taken and fed into the pie chart so the personal finishing positions of the selected driver can be displayed.
* Another use of the selected index grabbed by on.renderlet is to change the url of the wikipedia iframe to that of the personal driver's page on wikipedia, so the user can see information on their chosen driver.
* This was difficult to achieve at first, but with guidance I used a name.replace function to remove the final portion of the url 

`https://en.wikipedia.org/wiki/formula1`

This took an example name such as Michael Schumacher, in the format

`name.replace(" ", "_");`

Which took 'Michael' and 'Schumacher' and included a '_' between the two array's and changed the url of the wikipedia iframe, as thus;

`https://en.wikipedia.org/wiki/Michael_Schumacher`

#### dc.pieChart Unresolved Issues
There remains one bug with the current Drivers Pie Chart which has not been solved due to time and complexity. the `.drawPaths` and `externalLabels` options were used to try and have the individual numerical data for the multitude of positions shown in the data for each driver appear easier on the eye, due to the small slices of the pie chart.

Once a driver has been chosen, the pie chart looks as thus;
- get a pic in here - 

However, the desired result looks something like this, and only achieved once I have clicked each segment of the pie chart;
- pic again -

#### Circuits Page dc.selectMenu
The dc.selectMenu function on the Circuit page is almost identical to the selection box on the Driver's page, and is also linked to a wikipedia iframe once the user has selected a grand prix from the history located in the data.
There was a change in how the coding was written, as the original renderlet function wasn't working as intended. Well, the renderlet block of code looks the same, but what we do with the `selectedIndex` once chosen differs.

We had to use `name.split(" ").slice(1).join("_");` to take the user's chosen Grand Prix, for example, the '1995 British Grand Prix', and chop off the 1995 part, ensuring that only 'British Grand Prix' was selected, then each array was seperated now by an underscore, appearing as thus:- `British_Grand_Prix`
Feed that into the wikipedia iframe target, and the iframe would change to the correct url to display information about the chosen British Grand Prix, like so; `https://en.wikipedia.org/wiki/British_Grand_Prix`

#### Coding Testing Used
During my time writing and towards the end of my build, a variety of sites were used to check over my work, look for mistakes with coding and potential missed characters, such as;
* jshint.com
* https://validator.w3.org/
* https://jigsaw.w3.org/css-validator/

Mostly highlighted from this exercise was the proper closedown of some lines that had the missing charachter, `;`


## Built With
* PyCharm 2016.3.2

* MongoDB

* MySQL Workbench 6.3

## Acknowledgements
* Yoni Lavi - Mentor
