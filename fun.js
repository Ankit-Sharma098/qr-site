function generateQRCode() {
      const container = document.getElementById("qrcode");
      container.innerHTML = ""; // Clear old QR code
      const text = document.getElementById("text").value;
      
      if (text.trim() === "") {
        alert("Please enter a URL or text");
        return;
      }

      new QRCode(container, {
        text: text,
        width: 250,
        height: 250,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });

      document.getElementById("removeBtn").style.display = "inline-block";
       document.getElementById("downloadBtn").style.display = "inline-block";
    }

   function removeQRCode() {
      document.getElementById("qrcode").innerHTML = "";
      document.getElementById("removeBtn").style.display = "none"; // hide again
      document.getElementById("downloadBtn").style.display = "none";
    }

      function downloadQRCode() {
      let qrCanvas = document.querySelector("#qrcode canvas");
      if (qrCanvas) {
        let link = document.createElement("a");
        link.href = qrCanvas.toDataURL("image/png");
        link.download = "AK-qrcode.png";
        link.click();
      } else {
        alert("⚠️ No QR Code available to download!");
      }
    }

  document.getElementById("url").addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        generateQRCode();
      }
    });
