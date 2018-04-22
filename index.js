const express = require('express');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv').config();
const wanted = require('./channels');

const app = express();

const username = process.env.USERNAME;
const password = process.env.PASSWORD;

app.get('/', (req, res) => {

  axios({
    method: 'GET',
    url: `http://vapi.vaders.tv/epg/vget?username=vsmystreams_${username}&password=${password}`,
    responseType: 'arrayBuffer'
  })
    .then((response) => {

      const { data } = response;

      let channels = data.toString('utf8')

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