import { Html5Qrcode, Html5QrcodeScannerState } from "html5-qrcode";
import { useEffect, useRef } from "react";

const scannerId = "barcode-scanner";

interface BarcodeScannerProps {
  scanResult: string | null;
  setScanResult: (result: string | null) => void;
}

export function BarcodeScanner({
  scanResult,
  setScanResult,
}: BarcodeScannerProps) {
  const html5QrcodeScannerRef = useRef<Html5Qrcode | null>(null);

  useEffect(() => {
    if (scanResult || html5QrcodeScannerRef.current) return;

    const html5QrcodeScanner = new Html5Qrcode(scannerId);
    html5QrcodeScannerRef.current = html5QrcodeScanner;
    html5QrcodeScanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      },
      (decodedText: string) => {
        setScanResult(decodedText);
        stopScanning();
      },
      (errorMessage: string) => {
        console.warn("QR code scanning error:", errorMessage);
      }
    );

    return () => {
      stopScanning();
    };
  }, [scanResult]);

  const stopScanning = () => {
    const scanner = html5QrcodeScannerRef.current;

    if (!scanner || scanner.getState() !== Html5QrcodeScannerState.SCANNING) {
      return;
    }

    scanner
      .stop()
      .then(() => {
        scanner.clear();
        html5QrcodeScannerRef.current = null;
      })
      .catch((error) => console.error("Error stopping scanner:", error));
  };

  return (
    <div
      className="container"
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
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
