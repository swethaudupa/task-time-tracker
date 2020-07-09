# Time tracker for tasks

## About the project

It's a time tracker app which is built using ReactJS and create-react-app for the starter kit. It uses react-apollo to query graphQL.<br /><br />
The aim of this app is to be able to
-  Create categories for each task
-  Create n number of tasks for each of these categories
-  Adding new, editing and deleting of these tasks/categories are supported
-  Start a timer for each of the task to track them individually
-  Stop the timer
-  If the task is completed, it shows the status as completed

It uses accordion component to expand and collapse taks. A library called react-compound-timer has been used to record and stop the timer.<br /><br />
Steps on how to use the app:
- To add a new task/tag, click on the "+" icon, which opens an input element to enter. Click on "check" icon to save and "x" to close
- To edit a task/tag, click on the "pencil" icon, which opens an input element to enter. Click on "check" icon to save and "x" to close
- To delete a task/tag, click on "trash" icon to delete
- Click on "play" icon to start the timer on any task,  and "stop" to end the timer

**Note: Accordions are only expandable by clicking on the chevron icon to maintain simplicity as there are may buttons/functionalities included. Only the icons are clickabled in the app.** 

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
