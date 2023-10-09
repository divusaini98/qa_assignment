This is the QA documentation for the Star Wars Search web application. I have tested all the features and additional flows mentioned in the QA-Assignment file. All the test cases, I have tested are listed below with their status -:

**Test Cases -:**  I have created two files -:

**Character_search _feature.js file**
**TC1.** Verify when search a valid character, then all the details should displayed - Gender, birth year, eye color, skin color. - **Pass**
**TC1.** Verify the search button also works for character search by pressing the “Enter” key. - **Pass**
**TC2.** Verify when search an invalid character, then “not found” message should be displayed. - **Pass**
**TC3.** Verify after searching the character name, when we clear the search form and hit the search button, then the previous results should be removed. - **Fail**
**TC4.** Verify when we search a planet name and got the results, then we switch to the people and search for the same thing then we should get the “not found” message. - **Pass**
**TC5.** Verify if there is partial matching for character names, then there should be displayed more than one result, when we add the keywords in search box. - **Pass**


**planet_search_feature.js file**
**TC1.** verify when search  valid planet name, then all the details should displayed - Population, climate, gravity. - **Pass**
**TC1.** Verify the search button also works for planet search by pressing the “Enter” key. - **Pass**
**TC2.** Verify when search an invalid planet name, then “not found” message should be displayed. - **Pass**
**TC3.** Verify after search the planet name, when we clear the search form and hit the search button, then the previous results should be removed. - **Fail**
**TC4.** Verify when we search a people name and got the results, then we switch to the planet and search for the same thing then we should get the “not found” message. - **Pass**
**TC5.** Verify if there is partial matching for planet names, then there should be displayed more than one result, when we add the keywords in search box. - **Pass**


**Bugs -:** 

1. When we enter the people or planet name in the search form and click on search button, then the result appears on the screen. But if we change the option from people to planet or planet to people and click on search button, then still the same previous result display on the screen. But there should be 'not found' result should be displayed.

This bug is occur in the 3rd test case in both files (Character_search_feature.js & planet_search_feature.js)


**Findings -:**

1. When we add the data in search form and click on search button, then if we refresh the page then the search form should be clear and details needs to be disappear.
2. When we click on the different bullet button, then the previous details should be disappear at the same time and also the search box should be clear.
3. Verify when we click on search button, without adding any character or planet name then there should be validation displayed as “please add people or planet name” according to the selected bullet.


**For run the testcases, you can use this command -** node_modules/.bin/cypress open

**You can find the report here -:** cypress/reports

 

