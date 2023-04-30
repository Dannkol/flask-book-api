import 'https://rawgit.com/schmich/instascan-builds/master/instascan.min.js';

import config from './storage/config.js';

document.addEventListener('DOMContentLoaded', (e) => {

    let scanner = new Instascan.Scanner({
        video: document.getElementById("preview"),
      });
      scanner.addListener("scan", function (content) {
        const user = JSON.parse(content);
        async function postData() {
            try {
              const response = await fetch('http://127.0.0.1:5000/api/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
              });
              const data = await response.json();
              config.data(data.jwt);
              location.href ='./saludo/index.html';
            } catch (error) {
              console.error(error);
            }
          }
          
          postData();
      });
      Instascan.Camera.getCameras()
        .then(function (cameras) {
          if (cameras.length > 0) {
            scanner.start(cameras[0]);
          } else {
            console.error("No cameras found.");
          }
        })
        .catch(function (e) {
          console.error(e);
        });

})