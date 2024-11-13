# TUTORIAL

## INSTALLING ENVIRONMENT

1. Install Node.js from the [official site](https://nodejs.org/) or
   via [NVM](https://github.com/nvm-sh/nvm).
2. Verify that Node.js and npm have been successfully installed:
    ```bash
    $ node -v
    $ npm -v
    ```

## INSTALLING PROJECT DEPENDENCIES

The project uses several libraries that need to be downloaded and installed.

1. Open your app directory in the terminal.
2. Run the following command:
    ```bash
    npm install
    ```
3. Check that the **node_modules** directory has been created in the project
   directory.

## STARTING PROJECT LOCALLY

1. Open the **package.json** file and check the `scripts` section.
2. To run the project in development mode, execute the `dev` script:
    ```bash
    npm run dev
    ```
   If everything is set up correctly, your app should start, and you will see
   output like this in the terminal:
    ```
      VITE v5.4.1  ready in 1257 ms

      ➜  Local:   http://localhost:5173/
      ➜  Network: use --host to expose
      ➜  press h + enter to show help
    ```

You can run any script listed in the `scripts` section using the command:

```bash
$ npm run SCRIPT_NAME
```

Your app is now running locally and connected to the production server. Any
changes you make to the code will reflect in the browser immediately.

## CONNECTING LOCAL SERVER

Start your python server locally.

To connect your Python server to the frontend app:

1. Open `/src/constants/api.const.ts`.
2. You will see the following line:
    ```typescript
    export const API_URL = 'https://api.happyverse.ai';
    ```
3. Change the server address to your local server address:
    ```typescript
    export const API_URL = 'http://localhost:8080';
    ```
4. Remember to revert this change before pushing your code to the repository, as
   this line defines the server to which your front-end app will connect.

## DEPLOYING

To deploy your new feature to production, simply push your code to the `master`
branch. After that, actions will be triggered automatically.

**Note:** Your code should not have any TypeScript errors, as this will break
the pipeline. Ensure all TypeScript errors are fixed or ignored before pushing
your new code.

Good luck!