import { createContext, useContext } from "react";

const OutletContext = createContext(null);

export function Outlet() {
  const outlet = useContext(OutletContext);
  return outlet;
}

export { OutletContext };
