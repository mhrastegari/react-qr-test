import { useState } from "react";
import { BarcodeScanner } from "./components/BarcodeScanner";

export default function App() {
  const [scanResult, setScanResult] = useState<string | null>(null);

  const handleRescan = () => {
    setScanResult(null);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <BarcodeScanner scanResult={scanResult} setScanResult={setScanResult} />
      {scanResult && (
        <button
          onClick={handleRescan}
          style={{
            marginTop: "1rem",
          }}
        >
          Rescan
        </button>
      )}
    </div>
  );
}
