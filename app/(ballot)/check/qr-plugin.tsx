"use client";
import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Html5QrcodeScannerConfig } from "html5-qrcode/esm/html5-qrcode-scanner";

interface Html5QrcodePluginProps {
  fps?: number;
  qrbox?: number;
  aspectRatio?: number;
  disableFlip?: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: (decodedText: string) => void;
  qrCodeErrorCallback?: (errorMessage: string) => void;
}

const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
  const qrcodeRegionId = "html5qr-code-full-region";

  useEffect(() => {
    // when component mounts
    const config = createConfig(props);
    const verbose = props.verbose === true;

    // Success callback is required.
    if (!props.qrCodeSuccessCallback) {
      throw new Error("qrCodeSuccessCallback is required callback.");
    }

    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    // cleanup function when component will unmount
    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, [props]);

  const createConfig = (
    props: Html5QrcodePluginProps
  ): Html5QrcodeScannerConfig => {
    let config: Html5QrcodeScannerConfig = { fps: 0 };
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

  return <div id={qrcodeRegionId} />;
};

export default Html5QrcodePlugin;
