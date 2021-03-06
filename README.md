# Dispray

Display Bible verses and songs with ease. This project aims to build a user-friendly app to be used in churches.

_**Still in early stages, but minimally functional**_

## Screenshots

<img src="design-system/screenshots/init.png" width="400" alt="Screen with a modal asking user to create new meeting">
<img src="design-system/screenshots/meeting.png" width="400" alt="Meeting screen displaying list of items, selected verse and displaying a preview of the verse, with themes option below">

## Available Scripts

In the project directory, you can run:

### `yarn electron-dev`

Runs the app in the development mode.\

The app will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
**Still needs to be implement tests.**

## TO-DO

- Transition code to Typescript
- Use styled-components
- Support for other type of media (image and video)
- Add first-time tutorial
- Implement tests
- fetchLists won't include the docs, when the user select a meeting, it will fetch in the DB by the `id`
- Custom hooks to use the DB
