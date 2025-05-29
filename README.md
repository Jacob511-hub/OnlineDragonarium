# Online Dragonarium :dragon:

This is a tool for the mobile game "DragonVale" to assist players in keeping track of the dragons they have collected and quickly view information about them.

**TRY IT OUT HERE: [GitHub Pages](https://jacob511-hub.github.io/OnlineDragonarium/)**

## Description

- This is a webpage designed for players of the mobile game "DragonVale", originally created in 2011 by Backflip Studios and now owned by DECA games.
- DragonVale is a park management simulator game where players can collect a multitude of unique dragons, with new dragons still being added to this day.
- Players are able to breed their dragons in order to create new hybrid dragons of different elements, as well as collect different types of each dragon, including Twin versions of dragons and dragons that can have Traits.
- The purpose of this project is to provide a convenient, single-page resource for players to keep track of the dragons they have collected, how many of each dragon they own, which Traits each dragon has unlocked, as well view info about each one, such as how to breed them.

![DragonariumProjectPhoto1](https://github.com/user-attachments/assets/4ec26ca4-b2b4-44f9-9f26-9bc11d5cccfc)

## Usage

### Dragon List:
- The center of the page features a list of dragons available in the game, sorted in order of when they were added from oldest to newest.
- The appearance of each tile reflects the amount of that dragon the user owns.
- If the user does not own the dragon, it appears darkened.
- If the user owns only normal variants of the dragon, it appears with a grey background.
- If the user owns only Twin variants of the dragon, it appears with a blue background.
- If the user owns at least one normal variant and at least one Twin variant of the dragon, it appears with a gold background.
- If the dragon can have a Trait, a Trait Wheel appears in the top right corner of their tile indicating how many Traits that they have unlocked.
- Clicking on a dragon will populate the info panel on the right side (or bottom in mobile formats) with their information.

![DragonariumProjectPhoto2](https://github.com/user-attachments/assets/2e068708-b07b-4c4d-a7a3-36c31c8901c7)

### Info Panel:
- This panel displays all relevant info on the selected dragon.
- An image of the dragon is shown, as well as all of the elements that the dragon is.
- Their name is shown beneath their image.
- If the dragon can have Traits, a selection panel of each Trait appears beneath their name, allowing the user to toggle the unlocked state of each Trait on and off for that dragon.
- Beneath that, fields where the user can input how many of that dragon they have and of which types are present.
- The user can individually track how many normal, Traited, Twin, and Traited Twin versions of that dragon that they own, assuming that the selected dragon can be Traited, otherwise only the normal and Twin options are present.
- The top right corner of the dragon's image features a button that shows the user that dragon's breeding hint, telling the user how that dragon is obtained.
- If the breeding hint contains specific dragons, their names can be clicked to populate the info panel with their information.

![DragonariumProjectPhoto3](https://github.com/user-attachments/assets/74f9116b-fb7f-4014-9874-828098ea360a)

![DragonariumProjectPhoto4](https://github.com/user-attachments/assets/4c9eaa99-1ab8-4be7-8f67-621ac41cbc79)

### Filters:
- The left side of the page (or in the Filters pop-up menu on mobile) contains filters to allow for users to filter dragons by their elements.
- Clicking on a filter button will turn the button green and will apply that filter to the dragon list, only showing dragons whose list of elements contain that selected element.
- Clicking the same filter button again will turn it red, changing the dragon list to only show dragons whose list of elements does not contain that element.
- Clicking the filter button for a third time will reset the filter for that element.
- Filters can be combined by selecting multiple filters. This follows AND logic, so the list of dragons will only contain dragons whose list of elements abide by all of the applied filters (for instance, selecting both the Plant filter and the inverted Fire filter will only show dragons whose list of elements contains the Plant element and also does not contain the Fire element.)

![DragonariumProjectPhoto5](https://github.com/user-attachments/assets/a8e1f079-4f5c-42b8-a02f-82d0bc9b51ba)

### Login:
- The bottom right corner of the page shows a login button. The user can press this to be redirected to the login page.
- If the user has created an account, they can enter their email and password to login by pressing Enter or the "Login" button on this page.
- If the user has not created an account yet, they can create one by selecting the "Create Account" button to be redirected to the registration page.
- The user can also proceed back to the main page without the need to login or create an account.
- If the user is not logged in, changes made will be saved to local storage.
- If the user is logged in, changes made will be saved to their account and be synced across any device that they login on.

![DragonariumProjectPhoto6](https://github.com/user-attachments/assets/edcd7970-2bb6-4961-ad80-4307bea9f4d2)

### Register:
- From the login page, the user can choose to instead create a new account and be redirected to this page.
- The user must enter a username as well as their email and a password that they would like to use.
- Multiple accounts cannot be created with the same email address.
- The user can also return to the login page from here if they do not wish to create a new account.

![DragonariumProjectPhoto7](https://github.com/user-attachments/assets/6ad0ce84-aa8c-4d23-b4a5-07b0ca031b94)

## Source Code

- Source code can be found on [GitHub](https://github.com/Jacob511-hub/OnlineDragonarium)

## Tech Stack

- The frontend of this webpage was created using React TypeScript.
- The backend of this application was made using Node.js and Express.js along with TypeScript.
- The backend is running as a Docker container on an EC2 instance.
- The database exists on an RDS instance and is managed via PostgreSQL.
- Images for each of the dragons are contained in an S3 bucket.

## Credits

- Thank you to [Adam Morgan](https://github.com/adam-morgan) for helping me with various technical aspects and guiding me through parts of this project that had been causing trouble.
- Credit to the [DragonVale Wiki](https://dragonvale.fandom.com/wiki/DragonVale_Wiki) for compiling much of the information used throughout this page, as well as [DragonVale Sandbox](https://dvbox.bin.sh/all-dragons) for the in-game assets used this project.
