
    # Introduction
        - As part of the application process at Ordina I received a technical assignment to do the following: Create a weather widget for use in the webbrowser that provides the weather forecast.
          The task allowed freedom in approach and design, and is focused on assessing my skills in line withe pre-defined performance criteria. 
    - Approach
            - Design: I started with creating wireframes and mock-ups to come to a design that was in line with my preference. 
            - Development Approach: I have used an agile approach focusing first on the base version (MvP minimum viable product), then "enhancing" the base with added functionalities 
            - Features: I have a main branch (working version) and used feature branches and made pullrequest with improvements 
            - Continuous deployment: The main branch also automatically deploys to netlify (continuous deployment) “CD”
            - Testing: On the fly testing during development
    - Pullrequest details
        - Display current temperature and rain chance
        - Add styling 
        - Add location based on coordinates
        - Add API opencagedata.com get a city name
    - Feature & libraries choices for the application
        - Working step by step (always a working a version), starting with the wireframes and mock-ups, then re-building it in code. (from skateboard to car - Spotify way)
        - I have selected DayJS because the library for moment.js is very heavy, and I wanted to have lighter library as recommended in multiple articles online (e.g. https://codingislove.com/dayjs-vs-momentjs/)
        - I have added an additional api opencagedata.com for reverse geolocation to be able to determine the users location/city. 
    - What I learned
        - I learned how to integrate several new APIs in to a working application. e.g. adding geolocation for defining city based on coordinates, and I have used the tomorrow.io api as the foundation for the app 
        - day.js allowed to convert API data to a date/numbers. 
        - geolocation was also new to me and allowed me to setup city names based on coordinates. 
    - Room for improvement
        - I think with more time I could have improved error handling, for example → when Key API request runs out, it does not show an error, but crashes the application. 
        - for future upgrades I would have liked to be able to add / look up different cities than the one you are currently at or add an hour view. (new feature)
        - Currently Home.js components are quite large → I would have liked split this up in components with a bit of more time.
        - Styling adjustments. 
