import { Menu } from "./menu";

export default function StatusBar() {
  return (
    <div className="fixed top-0 left-0 border-b z-50 w-full">
      <Menu />
    </div>
  );
}
