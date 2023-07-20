# How To Run Cypress Test Case

1. Ensure already install nodejs and npm
2. Clone/Pull this repository
3. Open Terminal/CMD, type `npm install` and enter. It will install dependencies based on package.json file
4. After installing progress done, node_modules folders will be created
5. Add new files in root folder that names cypress.env.json to store your environment variables
6. Write in cypress.env.json file like this

   ```json
   {
     "STAGING_URL": "WEB STAGING URL",
     "STAGING_ADMIN_URL": "WEB ADMIN STAGING",
     "EMAIL_VALID": "YOUR VALID EMAIL",
     "PASS_VALID": "YOUR VALID PASS",
     "EMAIL_NOT_VALID": "RANDOM EMAIL THAT NOT VALID FORMAT",
     "EMAIL_NOT_REGISTER": "RANDOM EMAIL THAT NOT REGISTERED",
     "PASS_NOT_VALID": "RANDOM PASS THAT NOT VALID",
     "EMAIL_ADMIN": "ADMIN STAGING EMAIL",
     "PASS_ADMIN": "ADMIN STAGING PASS"
   }
   ```

7. Save it and type `npx cypress open` to open cypress menu
8. After cypress menu opened, choose End to End (E2E) Testing
9. Choose a browser that you want to use, preffered to choose Google Chrome
10. Select automation script file that you want to run and script will be run
