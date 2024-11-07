import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const scannerId = "barcode-scanner";

export function BarcodeScanner() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    // Only initialize if not already initialized
    if (!html5QrcodeScannerRef.current) {
      const html5QrcodeScanner = new Html5Qrcode(scannerId);
      html5QrcodeScannerRef.current = html5QrcodeScanner;

      html5QrcodeScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          setScanResult(decodedText);
          html5QrcodeScanner.stop(); // Stop scanning after a successful scan
        },
        (errorMessage) => {
          console.warn("QR code scanning error:", errorMessage);
        }
      );
    }

    return () => {
      // Ensure proper cleanup
      if (
        html5QrcodeScannerRef.current &&
        html5QrcodeScannerRef.current.getState() ===
          Html5QrcodeScannerState.SCANNING
      ) {
        html5QrcodeScannerRef.current
          .stop()
          .then(() => html5QrcodeScannerRef.current?.clear())
          .catch((error) => console.error("Error stopping scanner:", error));
      }
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
      }}
    >
      <h1>Barcode Scanner</h1>
      {scanResult ? (
        <div>Scan Result: {scanResult}</div>
      ) : (
        <div>Point your camera at a QR code</div>
      )}
      <div style={{ width: "100%", marginTop: "1rem" }} id={scannerId}></div>
    </div>
  );
}
