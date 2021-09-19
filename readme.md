# BB Exercise

This is a small POC bot for a saiyan academy that offers courses to become a better saiyan.

# Installation
1. Create a facebook app and page.
2. Add these environment variables to the `.env` file: `FACEBOOK_APPID`, `FACEBOOK_APP_SECRET`, `FACEBOOK_ACCESS_TOKEN`, `FACEBOOK_VERIFY_TOKEN`.
3. Add the Dialogflow key on `keys/dialogflow_key.json`.
4. Run `node bot.js`

# Testing phrases
Saying 'hi' or any other greeting to the bot will run a structured flow, that asks questions to the user to fill all the information required and recommend a course.

Alternatively, a course can be recommended directly if the user mentions one or both variables required in a single sentence. For instance: 'I am a super saiyan and want to improve my strength'