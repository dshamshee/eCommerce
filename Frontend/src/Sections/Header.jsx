import { HeaderMD } from "./Header-MD";
import { HeaderSM } from "./Header-SM";

export const Header = () => {
  return (
    <div className="mainContainer text-gray-100">
      <HeaderMD />
      <HeaderSM />
    </div>
  );
};
