# NettsideNordKlima Roadmap

NettsideNordKlima is a small weather website that retrieves real-world forecast data and presents it in a simple interface. The immediate goal is not to add many features. It is to make the current experience reliable, understandable, tested, and ready to demonstrate.

## Project Goal

> A user can search for a location, understand the current weather, and receive a useful message when something goes wrong.

## Current Status

The main flow works for a valid location such as Tromsø. The live site can retrieve and display temperature, pressure, humidity, cloud cover, wind, and a weather symbol.

Known issues observed on 2026-08-21:

- Placeholder values such as `0.0 °C` appear before the first search.
- An invalid location opens a JavaScript alert.
- An invalid search produces a console error.
- Old weather data remains visible under the invalid location name.
- The raw weather code, such as `partlycloudy_day`, is shown to the user.
- Some language is inconsistent, including `Tryk`, `Wind direction`, and `lisensieret`.
- The location input relies on placeholder text instead of a visible label.
- Weather values are presented as separate boxes without a strong visual hierarchy.

## Version 1.0

Version 1.0 is complete when the existing weather flow is dependable, readable, responsive, documented, and tested. Features in the post-release backlog are not required for version 1.0.

### Milestone 1 — Reliable Search

Goal: valid and invalid searches must always leave the interface in a truthful state.

- [ ] Do not display placeholder weather measurements before data is available.
- [ ] Show an initial message such as `Søk etter et sted for å se været`.
- [ ] Validate that the location input is not empty.
- [ ] Show a loading state while a request is running.
- [ ] Disable the search button while a request is running.
- [ ] Update the displayed location only after a successful response.
- [ ] Replace the JavaScript alert with an inline error message.
- [ ] Never show old weather data under a new or invalid location name.
- [ ] Handle an unavailable network connection.
- [ ] Handle unsuccessful responses from the location or weather service.
- [ ] Return the interface to a usable state after success or failure.
- [ ] Ensure expected failures do not create unhandled console errors.

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

- [ ] Use consistent Norwegian throughout the interface.
- [ ] Change `Tryk` to `Trykk`.
- [ ] Translate `Wind direction`.
- [ ] Change `lisensieret` to `lisensiert`.
- [ ] Add a visible `<label>` connected to the location input.
- [ ] Give the unit selector an accessible label.
- [ ] Ensure the error and loading messages can be announced by screen readers.
- [ ] Allow the form to be submitted with the Enter key.
- [ ] Keep keyboard focus visible.
- [ ] Check text and control contrast.
- [ ] Add meaningful alternative text where images communicate information.
- [ ] Set the document language correctly.

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
- [ ] Keep MET attribution and licensing readable without dominating the page.
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
- [ ] Add formatting and linting commands.
- [ ] Add a production build command if one is not already present.
- [ ] Add a GitHub Actions workflow that runs the relevant checks.
- [ ] Confirm the deployed site is built from a passing revision.

Completion check:

- All tests and quality checks pass locally.
- The same checks pass automatically on GitHub.
- The production build completes without errors.

### Milestone 6 — Documentation and Release

Goal: another person should be able to understand, run, and evaluate the project.

- [ ] Explain what the project does and why it was created.
- [ ] Add a screenshot of the finished interface near the top of the README.
- [ ] Link to the live website near the top of the README.
- [ ] List the implemented features separately from planned features.
- [ ] Document installation and local development commands.
- [ ] Explain the main data flow from location search to weather display.
- [ ] Credit the data providers correctly.
- [ ] Document known limitations honestly.
- [ ] Add a `What I learned` section.
- [ ] Describe one meaningful bug and how it was investigated and fixed.
- [ ] Choose and add an appropriate repository license.
- [ ] Test every external link in the documentation.
- [ ] Create a `v1.0.0` GitHub release.

## Version 1.0 Definition of Done

Version 1.0 is done only when all of these statements are true:

- [ ] A valid location displays current weather.
- [ ] Empty and invalid locations display useful inline feedback.
- [ ] The interface never associates stale data with a different location.
- [ ] Loading and failure states work correctly.
- [ ] Expected user errors produce no unhandled console errors.
- [ ] Weather descriptions are readable rather than raw API codes.
- [ ] Celsius and Fahrenheit values are correct.
- [ ] Interface language is consistent.
- [ ] The main flow works with a keyboard.
- [ ] Mobile and desktop layouts work.
- [ ] Automated checks pass.
- [ ] The README accurately describes the project.
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

## Next Action

> Fix invalid-location handling so that an unsuccessful search shows an inline error and never displays previous weather data under the wrong location name.
