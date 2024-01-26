// file = Html5QrcodePlugin.jsx
import { Html5QrcodeCameraScanConfig, Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";
import { useEffect, useState } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

// Creates the configuration object for Html5QrcodeScanner.
const createConfig = (
  props: Html5QrcodeCameraScanConfig
): Html5QrcodeScannerConfig => {
  let config: Html5QrcodeCameraScanConfig = { fps: 0 };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const Html5QrcodePlugin = (props: any) => {
  // const [stateQR, setstateQR] = useState<Html5QrcodeScanner>();
  let html5QrCode: Html5QrcodeScanner | null = null;
  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;
    // Suceess callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }

    if (html5QrCode === null) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      html5QrCode = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
    }
    html5QrCode.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

    // cleanup function when component will unmount
    return () => {
      html5QrCode?.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
