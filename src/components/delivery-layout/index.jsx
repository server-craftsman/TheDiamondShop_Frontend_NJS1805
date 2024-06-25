import { Outlet } from "react-router-dom";
import DeliveryHeader from "../delivery-header";

function DeliveryLayout() {
  return (
    <div>
      <DeliveryHeader />
      <Outlet/>
    </div>
  );
}

export default DeliveryLayout;
