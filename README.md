# Galactic Age

#### An application that displays the user's age and life expectancy based on a planet's solar years, 06-Sept-2019

#### By **Christine Frank**

## Description

This application provides the user fields to input information about themselves in order to calculate their galactic statistics. These include their age in years using the rotation time of each planet in the Solar System, and their life expectancy on each planet or how far they have lived past their expected life span.

## Setup/Installation Requirements

#### View Hosted Site
* Go to: (N/A - to be updated)

#### View a local version of this Site
* Clone this repository to your desktop
* Open a command line terminal and route to the local repository (command: cd desktop/galactic-age)
* Run 'npm install' in the command line
* Run 'npm run start' in the command line

## Known Bugs

* No known bugs at this time

## Support and contact details

* Email: christine.braun13@gmail.com
* LinkedIn: https://www.linkedin.com/in/christine-frank/

## Application Specifications
|Behavior|Input|Output|
|:---|:----:|:----:|
|Application only accepts positive integers as input for age| "#45%" | "Invalid age, please use numeric input" |
|Application converts user age to corresponding age at each planet in the solar system| 34 | Mercury age: 8.16 |
|Application displays corresponding planet age as the base integer | 34 | Mercury age: 8|
|Application requires at least one input from each form field to determine user life expectancy on each planet in the solar system| Empty form values | "Please fill out all sections of form"|
|Application calculates user life expectancy on Earth using form input |Age: 45, Input: Exercise 3-4x per wk, moderate meat/vegetable intake, sweet-tooth| Normal life expectancy: Live to 85 yrs |
|Application calculates user life expectancy on each planet using calculated earth life expectancy, remaining form input and planet conditions |Expected life: 85 Earth years, Input: Tech skill rating: 4, social skills: 7, ability to learn/adapt: 5, preferred government style: cyberocracy | Normal-high life expectancy: Live to 808 yrs on Jupiter |
|Application calculates years past expected life expectancy when user's age is equal to or greater than calculated expectancy |Age: 95, Input: [...] | Exceeds life expectancy by 15 years on Mars|

## Technologies Used

* JavaScript
  * jQuery
* Jasmine / Karma
* Webpack

### License

*This application is licensed under the MIT license*

Copyright (c) 2019 **_Christine Frank_**
