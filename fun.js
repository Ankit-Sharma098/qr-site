let html5QrcodeScanner; // Global variable to hold scanner instance

// Function to generate QR Code
function generateQRCode() {
  // Hide scanner if it was open
  document.getElementById("reader").style.display = "none"; 
  // Show QR code container
  document.getElementById("qrcode").style.display = "block"; 
  // Hide remove scan button
  document.getElementById("removeScanBtn").style.display = "none";
  // Clear previous scan result
  document.getElementById("scan-result").innerText = "";

  const container = document.getElementById("qrcode");
  container.innerHTML = ""; // Clear old QR code
  const text = document.getElementById("url").value; // Get user input

  // If input is empty, show alert
  if (text.trim() === "") {
    alert("Please enter a URL or text");
    return;
  }

  // Generate QR code
  new QRCode(container, {
    text: text,
    width: 200,
    height: 200,
    colorDark: "#000000",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });

  // Show remove and download buttons
  document.getElementById("removeBtn").style.display = "inline-block";
  document.getElementById("downloadBtn").style.display = "inline-block";
}

// Function to remove QR Code
function removeQRCode() {
  document.getElementById("qrcode").innerHTML = ""; // Clear QR code
  document.getElementById("removeBtn").style.display = "none"; // Hide remove button
  document.getElementById("downloadBtn").style.display = "none"; // Hide download button
}

// Function to download QR Code as PNG
function downloadQRCode() {
  let qrCanvas = document.querySelector("#qrcode canvas");
  if (qrCanvas) {
    let link = document.createElement("a");
    link.href = qrCanvas.toDataURL("image/png"); // Convert QR to image
    link.download = "AK-qrcode.png"; // Set download name
    link.click(); // Trigger download
  } else {
    alert("⚠️ No QR Code available to download!");
  }
}

// Function to start QR Code scanner
function startScanner() {
  // Hide QR code and buttons if scanner is active
  document.getElementById("qrcode").style.display = "none"; 
  document.getElementById("removeBtn").style.display = "none";
  document.getElementById("downloadBtn").style.display = "none";
  // Show scanner container
  document.getElementById("reader").style.display = "block"; 
  document.getElementById("scan-result").innerText = "";
  document.getElementById("removeScanBtn").style.display = "none";

  // Initialize scanner
  html5QrcodeScanner = new Html5QrcodeScanner("reader", {
    fps: 10,   // Frames per second
    qrbox: 250 // Scanner box size
  });

  // Function on successful scan
  function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("scan-result").innerText = `✅ Result: ${decodedText}`;
    document.getElementById("removeScanBtn").style.display = "inline-block"; // Show remove scan button
    html5QrcodeScanner.clear(); // Stop scanner after success
    document.getElementById("reader").style.display = "none"; // Hide scanner box
  }

  // Function on scan error
  function onScanError(errorMessage) {
    console.warn(`Scan error: ${errorMessage}`);
  }

  // Start rendering scanner
  html5QrcodeScanner.render(onScanSuccess, onScanError);
}

// Function to remove scanner box & result
function removeScanner() {
  document.getElementById("scan-result").innerText = "";
  document.getElementById("removeScanBtn").style.display = "none";
  document.getElementById("reader").style.display = "none";
}

// Generate QR Code when user presses Enter
document.getElementById("url").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    generateQRCode();
  }
});
