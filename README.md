# Multiplayer-Cardgame
A Multi-Player Card Game

## Made by
- Robin Mi
- Victor Tsang
- Mikhail Metrikin


### Setup Instructions (WIP)

1. git clone
1. Run `npm install`
1. Create MySql databse (I suggest: **memeski**):wink:
1. Edit config.json to insert own credentials
1. Run `npm start` to build initial DB
1. Use Sequilize CLI to run `sequelize db:seed:all`
1. Consider improving this workflow as it is in development!


#### TODO (For Deployment):

1. Set Environmental Variables
    -  process.env.IMGF_USERNAME
    -  process.env.IMGF_PASSWRD
1. Make sure that process.env.google_client_id, process.env.google_client_secret, & process.env.callback_url environmental variables are correctly set up with your google api's client_id, client_secret, and a correct callback_url for the callback for oAuth authorization. 