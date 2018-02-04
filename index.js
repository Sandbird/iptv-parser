const express = require('express');
const rp = require('request-promise');
const dotenv = require('dotenv').config();
const wanted = require('./channels');

const app = express();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

app.get('/', (req, res) => {

  rp({
    method: 'GET',
    url: `http://api.mystreams.club/vget?password=${password}&username=${username}`
  })
    .then((channels) => {

      channels = channels.split('#EXTINF:-1 ');

      channels = channels.filter((channel) => {
        let include = false;
        wanted.forEach((want) => {
          if (channel.includes(want)) {
            include = true;
          }
        });

        return include;
      });

      channels = channels.map(channel => `#EXTINF:-1 container="mp2ts" ${channel}`);

      const playlist = `#EXTM3U\n ${channels.join("")}\n`;

      res.send(playlist);
    })
    .catch((err) => {
      res.status(400).send({
        message: 'Something went wrong...'
      })
    });
});

const port = process.env.PORT || 7500;

app.listen(port, () => {
  console.log(`App listenting on port ${port}!`);
});