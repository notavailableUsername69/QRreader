// Get the video element
const qrVideo = document.getElementById('qr-video');

// Add an event listener when the video starts playing
qrVideo.addEventListener('play', scanQRCode);

// Function to handle the QR code scanning
function scanQRCode() {
  // Create a canvas element to grab frames from the video
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Set the canvas dimensions to match the video dimensions
  canvas.width = qrVideo.videoWidth;
  canvas.height = qrVideo.videoHeight;

  // Start scanning for QR codes in the video frames
  scanFrames();

  function scanFrames() {
    // Draw the current video frame on the canvas
    ctx.drawImage(qrVideo, 0, 0, canvas.width, canvas.height);

    // Get the image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    // Use a QR code scanning library (e.g., ZXing) to decode the QR code
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    // Check if a QR code is detected
    if (code) {
      // Display the QR code content
      document.getElementById('qr-result').textContent = code.data;
    }

    // Request the next frame for scanning
    requestAnimationFrame(scanFrames);
  }

  // Access the camera and stream the video
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function (stream) {
      qrVideo.srcObject = stream;
    })
    .catch(function (error) {
      console.error(error);
      document.getElementById('qr-result').textContent = 'Camera access denied.';
    });
}