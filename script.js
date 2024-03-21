window.onload = function () {
      var userAgent = navigator.userAgent.toLowerCase();
      var isMac = /macintosh|mac os x/.test(userAgent);

      if (isMac) {
        document.getElementById('macMessage').innerText = 'Mac';
        document.getElementById('cameraStatus').innerText = 'Real.';
      } else {
        document.getElementById('macMessage').innerText = 'Not mac';
        requestCameraAccess();
      }
    };

    function requestCameraAccess() {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
          var videoTrack = stream.getVideoTracks()[0];
          var capabilities = videoTrack.getCapabilities();
          var isRealCamera = 'whiteBalanceMode' in capabilities && 'facingMode' in capabilities && 'frameRate' in capabilities;

          if (isRealCamera) {
            document.getElementById('cameraStatus').innerText = 'Real.';
          } else {
            document.getElementById('cameraStatus').innerText = 'virtual';
          }

          var details = JSON.stringify(capabilities, null, 4); // Convert to JSON with pretty printing
          document.getElementById('cameraDetails').innerText = details;
        })
        .catch(function (error) {
          document.getElementById('cameraStatus').innerText = 'Error accessing camera: ' + error.message;
        });
    }
