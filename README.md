# Hala Madrid Hub (React)

Misión M3 · Reactor Core — Web Development I.

## How to use

1. Open a terminal in the project folder and run npm install (only the first time).
2. Run npm run dev and open the link that appears.
3. The page has two sections with data from TheSportsDB API:
   - Match centre: the last result and the next match of Real Madrid, with a live countdown to the next kick-off.
   - The squad: player cards grouped by position, with some squad stats, a search bar and filters by position.
4. In the header you can choose between the home, away and third kit, which changes the colours of the whole page. The kit you choose is saved, so it stays the same when you reload.
5. If something fails while loading (no internet, API limit...), the section shows an error message with a "Try again" button.

## Use of AI
I used claude code as a partner to code the app.
Real Prompt Examples:
- "i like the idea of the countdown but since we have a limited squad due to the API limitations im not so sure about the other 2 options you gave me. is the countdown enough or do you have any other ideas?"
- "hold on shouldnt it also have the third kit option (its mainly pink)"

The first 5 commits were made with claude code following my ideas and instructions. After having this base project, I reviewed it comparing it with the unit presentations, and I decided to remove the parts that were too complex or not seen in class (a score prediction game, the La Liga table and a cache system). Claude applied those changes and I checked with npm run dev that everything still worked before committing to github.

Something that I decided was adding a third kit (pink) to the kit selector, since Real Madrid also has a third kit and not only home and away. This doesnt bring something new to the website since its just another color but it gives meaning and a sense of completion.

## Autopsy
1. I decided to remove some features from the first version of the project (a score prediction game, the La Liga table and a cache system) and keep only the match centre, the squad, the countdown and the kit selector. When working with claude, sometimes it goes to overboard and starts implementing things we havent seen and that I do not understand so I made sure to review carefully and change things if needed. Therefore the alternative that I discarded was keeping all the features, because they made the project more complex and much bigger which would have probably given me more grading points, but obviously I prefer a more simple and concise project that I know I fully understand and can explain.

2. I decided to show the next match that the API gives me, even if sometimes the API is outdated and the last result is not the most recent match. The alternative that I discarded was deciding which match is the last result and which is the next one by looking at the score, because sometimes the API wouldn't return any upcoming match and the countdown, which is one of the most original features of the app, would have nothing to show.
