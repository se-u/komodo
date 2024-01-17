import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

export type Voter = {
  id: string;
  index: number;
  isRegistered: Boolean;
  isVerified: Boolean;
  name: string;
  idCard: string;
  account: string;
};
