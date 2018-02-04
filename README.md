# iptv-parser

Parse an IPTV m3u playlist to only include wanted channels.

## Usage

- Ensure you have node.js and NPM installed on your system.
- Clone this repository:

    `git clone https://github.com/spencercharest/iptv-parser`
- Install dependencies:

    `cd iptv-parser && npm install`
- Move `.env.example`:

    `mv .env.example ./.env`
- Open `.env` and edit it to include your personal Vader's (MyStreams) username and password.
- Open `channels.js` and edit the array to include the channels you want included in your playlist.
- Start the web server:

    `npm start`
- You should now have a custom m3u playlist being served at `http://localhost:7500`