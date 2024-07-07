import { Tabs, Tab, TabList, TabPanel } from "react-tabs";
import IndividualEntrepreneur from "./individual-entrepreneur";
import SelfEmployed from "./self-employed";

export const RecievePayments = () => {
  return (
    <div className="recievePayments">
      <h2>Выплаты ИП</h2>
      <div className="recievePaymentsInfo">
        <b>Индивидуальный предприниматель (ИП)</b> - физическое лицо,
        зарегистрированное в установленном законом порядке и осуществляющее
        предпринимательскую деятельность без образования юридического лица;
        субъект предпринимательской деятельности.
      </div>
      <div className="recievePaymentsTabs">
        <Tabs>
          <TabList>
            <Tab>Индивидуальный предприниматель</Tab>
            <Tab>Самозанятый</Tab>
          </TabList>
          <TabPanel>
            <IndividualEntrepreneur />
          </TabPanel>
          <TabPanel>
            <SelfEmployed />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
