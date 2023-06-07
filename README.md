To start:

npm run dev


Weather Application

Create the Weather application using API https://openweathermap.org/. Do not use CSS frameworks, UI libraries.
Functionality:
1. Input with autocomplete through the cities ( when you enter several symbols/characters, the list with the appropriate cities should appear)
2. For queries you should use fetch or axios
3. Display the weather situation as a card for the current day
4. Display the temperature chart by the hour for the current day using js-plugin as https://www.chartjs.org/  not using vue plugin https://vue-chartjs.org/
5. The possibility to create several weather blocks with different cities, 1 block by default, сlicking on the “+” button you will add one more block with the full functionality. Max - 5 blocks
6. Deleting blocks. Display the modal window with the confirmation.
7. Create a new page “saved” so the user can add or delete the city. On the card with the weather forecast with the city. In this card, you can allocate this feature with the icon or a frame.
8. The weather blocks are displayed inside of the tab, according to added cities, but you can not choose a city in the block, only switching “day/for 5 days' '. Add saved cities to localStorage.
There must be only 5 pieces. Show modal window when the number is exceeded “in order to add - delete the city, 5 is a max“
9. Application should be adaptive (1200px, min 360 px)

Bonus tasks
1. Switching the image “day/for 5 days' and the weather card with an everyday chart, taking the average temperature from statistics by the hour per day. Here it is in API  https://openweathermap.org/forecast5
2. Showing by default the user’s weather, determined his city via API using any public (open) resource 
3. Add preloaders where they are necessary while waiting for the API request
4. Provide interface  multilingualism (EN/UK) and API request 
5. Switching the weather night/day mode
 
Feel free to add more functionality and describe the process.

You have 5 days for this task (calendar)


