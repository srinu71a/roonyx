# Roonyx assignment

# assignment1
Navigate to assignment1 folder
1. Install dependencies.
    - npm install
2. Run the script to get the episodes with characters. Install typescript globally if the script dosen't recognise tsc.
    - npm run episodes

# assignment2
Navigate to assignment2 folder
1. Run the script using node.
    - node counter.js

# assignment3
Data can be passed between components in following ways,
1. Using Inputs and Outputs.
    - This approach works best when ComponentA and ComponentB hold parent and child relationship.
2. Using a common service.
    - Create a RxJS Subject type property in service.
    - Inject the service in bothe the components.
    - Emit the data from producer component and subscribe to the subject property in consumer component.
    - This approach works in majority of the scenarios.
    - This can be used for bidirectional data flow between the components.
3. Using Route params
    - Route params or query params or route data can be used to pass the data.
    - This approach works well when we are navigating from one route to other and the data to be shared is minimal.
    - The data flow is uni directional from source route to target route.
4. Using Local/session storage.
    - Data can be saved to storage in one component and can be consumed in any other component accross the app.

# assignment4
1. The template is incorrect. There in no closing div tag and opening button tag is missing.
2. The method getUserName() in html template is not availabe in component Class file.
3. There is no Inline or seperate style file. So the 'user-panel' used in template may not have any effect.
4. The import statement for AuthService is missing.
