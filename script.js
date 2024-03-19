async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    document.getElementById('cameraPermissionStatus').textContent = 'Camera permission granted!';
    displayCameraDetails(stream);
  } catch (error) {
    console.error('Error accessing camera:', error);
    document.getElementById('cameraPermissionStatus').textContent = 'Error accessing camera. Please grant permission.';
  }
}

function displayCameraDetails(stream) {
  const videoTracks = stream.getVideoTracks();
  if (videoTracks.length > 0) {
    const track = videoTracks[0];
    const capabilities = track.getCapabilities();
    const isRealCamera = detectRealCamera(capabilities);
    const label = track.label || 'Unknown Camera';

    const detailsHTML = `
      <strong>Camera Name:</strong> ${label}<br>
      <strong>Camera Type:</strong> ${isRealCamera ? 'Real Camera' : 'Virtual Camera'}<br>
      <strong>Capabilities:</strong><br>
      <pre>${JSON.stringify(capabilities, null, 2)}</pre>
      <hr>
    `;
    document.getElementById('cameraDetails').innerHTML = detailsHTML;
  } else {
    document.getElementById('cameraDetails').textContent = 'No camera found.';
  }
}

function detectRealCamera(capabilities) {
  // Check for the presence of specific capabilities
  return (
    'exposureTime' in capabilities &&
    'whiteBalanceMode' in capabilities &&
    'facingMode' in capabilities &&
    'frameRate' in capabilities
  );
}
