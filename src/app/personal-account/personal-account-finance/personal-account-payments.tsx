import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { RequestForPayment } from "./payments-tabs/request-for-payment";
import { MyBankingDetails } from "./payments-tabs/my-banking-details";
import { RecievePayments } from "./payments-tabs/recieve-payments";
import { Taxation } from "./payments-tabs/taxation";
import "../../scss/blocks/_tabs.scss"

export const PersonalAccountPayments = () => {
  return (
    <>
      <div className="payments-tabs">
        <Tabs selectedTabClassName="active-payment-tab">
          <TabList className="payments-tablist">
            <Tab>Заявка на выплаты</Tab>
            <Tab>Мои реквизиты</Tab>
            <Tab>Как получить выплаты?</Tab>
            <Tab>Налогооблажение</Tab>
          </TabList>
          <TabPanel>
            <RequestForPayment />
          </TabPanel>
          <TabPanel>
            <MyBankingDetails />
          </TabPanel>
          <TabPanel>
            <RecievePayments />
          </TabPanel>
          <TabPanel>
            <Taxation />
          </TabPanel>
        </Tabs>
      </div>
    </>
  );
};
