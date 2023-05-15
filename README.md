# Mitigation Recommendations: Mobile Applications

The app is currently deployed [here](https://ivy0305.github.io/mitigation-recommendations/).

## Getting Started

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run deploy`

Re-deploys the app via GitHub Pages.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Editing the Data

The data detailing the mitigations of the MITRE ATT&CK Framework and the related vulnerabilities, affected features, and priority of implementing the mitigation is included in a JSON file called `data.json`. New mitigations can be added by editing this file.

Each mitigation is given in the following format:

```
  {
    "mitigation": "Mitigation name",
    "vulnerabilities": ["Vuln 1", "Vuln 2"],
    "features": ["Feature 1", "Feature 2"],
    "priority": "low",
    "degree": {float value},
    "details": {
      "link": "https://attack.mitre.org/mitigations/{mitigation link here}/",
      "summary": "Details of mitigation technique.",
      "dotpoints": ["Optional dotpoint to include in summary 1", "Dotpoint 2"],
      "relatedMitigations": ["Optional related mitigation technique 1", "Related mitigation 2"]
    }
  }
```

The given priority is one of the following options: "low", "medium", or "high".
