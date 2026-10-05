# Nordisk Vær Roadmap

Nordisk Vær is a small weather website that retrieves real forecast data and presents it in a simple interface. The immediate goal is not to add many features. It is to make the current experience reliable, understandable, tested, and ready to demonstrate.

## Project Goal

> A user can search for a location, understand the current weather, and receive a useful message when something goes wrong.

## Current Status

Reviewed 2026-10-04. Search works end to end for a valid location such as Tromsø, showing temperature, pressure, humidity, cloud cover, wind, and the raw weather symbol. Errors are inline and in Norwegian, and the interface is keyboard usable.

Fixed since 2026-08-21:

- Placeholder values no longer appear before the first search; an initial message prompts the user instead.
- Invalid and empty searches show an inline error rather than a JavaScript alert.
- The location name and results are only updated after a successful response, so no stale data appears under a new name.
- Interface language is consistent Norwegian, including the wind direction label and licensing text.
- Both form fields have visible labels, and the form submits with the Enter key.

Still open:

- Raw weather codes such as `partlycloudy_day` are shown to the user.
- No loading state or disabled button while a request runs.
- API failures all show one generic message rather than a specific cause.
- Weather values lack a strong visual hierarchy, and layout is untested at mobile width.

## Version 1.0

Version 1.0 is complete when the existing weather flow is dependable, readable, responsive, documented, and tested. Features in the post-release backlog are not required for version 1.0.

### Milestone 1 — Reliable Search

Goal: valid and invalid searches must always leave the interface in a truthful state.

- [x] Do not display placeholder weather measurements before data is available.
- [x] Show an initial message such as `Søk etter et sted for å se været`.
- [x] Validate that the location input is not empty.
- [ ] Show a loading state while a request is running.
- [ ] Disable the search button while a request is running.
- [x] Update the displayed location only after a successful response.
- [x] Replace the JavaScript alert with an inline error message.
- [x] Never show old weather data under a new or invalid location name.
- [ ] Handle an unavailable network connection.
- [ ] Handle unsuccessful responses from the location or weather service.
- [ ] Return the interface to a usable state after success or failure.
- [x] Ensure expected failures do not create unhandled console errors.

Completion check:

1. Search for `Tromsø` and confirm that current weather appears.
2. Search for an invalid name and confirm that a useful inline error appears.
3. Confirm that no stale measurements are presented as belonging to the invalid name.
4. Confirm that another valid search works immediately afterward.

### Milestone 2 — Understandable Weather Data

Goal: users should not need to understand API field names or codes.

- [ ] Convert weather codes such as `partlycloudy_day` into readable Norwegian.
- [ ] Add a suitable weather icon or visual indicator.
- [ ] Convert wind degrees into compass directions such as `N`, `NØ`, `Ø`, and `SØ`.
- [ ] Keep the exact wind degrees available where useful.
- [ ] Display the time associated with the forecast.
- [ ] Display when the information was last updated.
- [ ] Verify that pressure, humidity, cloud cover, and wind use the correct units.
- [ ] Verify Celsius-to-Fahrenheit conversion with known example values.
- [ ] Make unit changes update all relevant displayed values consistently.
- [ ] Avoid showing values that are missing from the response.

Completion check:

- A user can describe the weather without reading raw API codes.
- Switching between Celsius and Fahrenheit gives correct results.
- Missing values do not appear as fake zeroes.

### Milestone 3 — Consistent Language and Accessibility

Goal: the site should be understandable and usable with a keyboard and assistive technology.

- [x] Use consistent Norwegian throughout the interface.
- [x] Fix the `Trykk` typo.
- [x] Translate the wind direction label.
- [x] Fix the Norwegian licensing text spelling.
- [x] Add a visible `<label>` connected to the location input.
- [x] Give the unit selector an accessible label.
- [ ] Ensure the error and loading messages can be announced by screen readers.
      Error text already uses `role="alert"`. Loading announcements need the
      loading state first.
- [x] Allow the form to be submitted with the Enter key.
- [ ] Keep keyboard focus visible.
- [ ] Check text and control contrast.
- [x] Give informative images meaningful alt text, and hide purely decorative graphics.
- [x] Set the document language correctly.

Completion check:

- Complete a search using only the keyboard.
- Confirm that every input has a clear name without depending on placeholder text.
- Confirm that all visible interface text uses consistent Norwegian.

### Milestone 4 — Clear Responsive Design

Goal: the interface should look intentional without becoming visually complicated.

- [ ] Place related weather measurements inside one consistent weather panel.
- [ ] Establish clear hierarchy between location, primary temperature, condition, and details.
- [ ] Use consistent spacing, border radii, and typography.
- [ ] Make the search form easy to use on narrow screens.
- [ ] Keep content at a readable maximum width on large screens.
- [ ] Reduce unnecessary empty space.
- [ ] Make loading, success, and error states visually distinct.
- [x] Keep MET attribution and licensing readable without dominating the page.
- [ ] Test at approximately 390 px mobile width.
- [ ] Test at a common desktop width.

Completion check:

- The page has no horizontal scrolling at mobile width.
- Controls remain comfortably clickable on mobile.
- The most important weather information is immediately recognizable.

### Milestone 5 — Tests and Automation

Goal: important behavior should be repeatable and verifiable.

- [ ] Separate important data conversion from DOM updates where practical.
- [ ] Add tests for Celsius-to-Fahrenheit conversion.
- [ ] Add tests for wind-degree-to-direction conversion.
- [ ] Add tests for readable weather descriptions.
- [ ] Add tests for missing or malformed data.
- [ ] Add linting. Formatting already runs through Prettier.
- [x] Add a production build command.
- [x] Add a spell check that catches wrong Norwegian in the interface.
- [x] Add a test runner and a first test for location name formatting.
- [ ] Chain format, spell, test and build into one `check` command, so a red
      test cannot pass unnoticed in a build.
- [ ] Add a GitHub Actions workflow that runs the relevant checks.
- [ ] Confirm the deployed site is built from a passing revision.

Completion check:

- All tests and quality checks pass locally.
- The same checks pass automatically on GitHub.
- The production build completes without errors.

### Milestone 6 — Documentation and Release

Goal: another person should be able to understand, run, and evaluate the project.

- [x] Explain what the project does and why it was created.
- [ ] Add a screenshot of the finished interface near the top of the README.
- [ ] Link to the live website near the top of the README.
- [x] List the implemented features separately from planned features.
- [x] Document installation and local development commands.
- [x] Explain the main data flow from location search to weather display.
- [x] Credit the data providers correctly, and separate the code license from the data licenses.
- [ ] Document known limitations honestly.
- [ ] Add a `What I learned` section.
- [ ] Describe one meaningful bug and how it was investigated and fixed.
- [x] Choose and add an appropriate repository license.
- [x] Test every external link in the documentation.
- [ ] Create a `v1.0.0` GitHub release.

## Version 1.0 Definition of Done

Version 1.0 is done only when all of these statements are true:

- [x] A valid location displays current weather.
- [x] Empty and invalid locations display useful inline feedback.
- [x] The interface never associates stale data with a different location.
- [ ] Loading and failure states work correctly.
- [x] Expected user errors produce no unhandled console errors.
- [ ] Weather descriptions are readable rather than raw API codes.
- [ ] Celsius and Fahrenheit values are correct.
- [x] Interface language is consistent.
- [x] The main flow works with a keyboard.
- [ ] Mobile and desktop layouts work.
- [ ] Automated checks pass.
- [x] The README accurately describes the project.
- [ ] The live-demo link works.

## Post-Release Backlog

These ideas should wait until after version 1.0:

- [ ] Hourly forecast.
- [ ] Multi-day forecast.
- [ ] Temperature and precipitation charts.
- [ ] Saved or favorite locations.
- [ ] Recent searches.
- [ ] Automatic geolocation with clear permission handling.
- [ ] Weather-based themes or backgrounds.
- [ ] Improved offline behavior and cached results.
- [ ] Progressive Web App support.
- [ ] Shareable forecast links.
- [ ] Additional languages.

## Working Method

- Work on one unchecked item or one closely related group at a time.
- Create a focused issue when a task needs investigation.
- Keep unrelated ideas in the post-release backlog.
- Use commit messages that describe the completed behavior.
- Test the happy path and one failure path before marking a task complete.
- Be able to explain every important change in your own words.
- Prefer a small finished improvement over a large unfinished rewrite.
- Write the learning sections yourself. An agent can tidy the prose, but the
  understanding has to be yours.

## Next Action

> Handle unsuccessful API responses specifically: distinguish a location lookup failure from a weather failure and from being offline, so the inline message says what actually went wrong instead of a generic apology.
