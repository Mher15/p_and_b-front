import { Routes, Route } from "react-router-dom";
import { AdminBrands } from "./admin-panel/brands/brands";
import { adminPanelTabs, adminRoutes } from "./admin-panel/data/constants";
import { AdminGroups } from "./admin-panel/groups/groups";
import { AdminProducts } from "./admin-panel/products";
import { AdminStore } from "./admin-panel/store";
import { CompanyInfo } from "./admin-panel/company-info/company-info";
import { AdminPanel } from "./admin-panel";
import { appRoutes } from "./constants";
import { AboutUsPage } from "./pages/about-us-page";
import { MainPage } from "./pages/main-page";
import { Product } from "./pages/product-page";
import { Catalog } from "./pages/catalog-page";
import { BasketPage } from "./pages/basket-page";
import { OrderPage } from "./pages/order-page";
import { RegistrationStep1 } from "./pages/registration-step1";
import { Registration } from "./pages/registration";
import { RegistrationStep2 } from "./pages/registration-step2";
import { RegistrationStep3 } from "./pages/registration-step3";
import { NotFound } from "./pages/404";
import { RegistrationStep4 } from "./pages/registration-step4";
import { RegistrationStep5 } from "./pages/registration-step5";
import {
  PersonalAccount,
  PersonalAccountBusiness,
  PersonalAccountFinance,
  ReferralLinks,
} from "./personal-account";
import { PersonalAccountHome } from "./personal-account";
import { financeAccountRoutes, personalAccountRoutes } from "./personal-account/data/constants";
import { PersonalAccountProfile } from "./personal-account/personal-account-profile";
import { PublicOfferPage } from "./pages/public-offer-page";
import { PrivacyPolicyPage } from "./pages/privacy-policy-page";
import { TermsOfPaymentPage } from "./pages/terms-of-payment-page";
import { useAppSelector } from "./hooks";
import { PaymentPage } from "./pages/payment-page";
import { Marketing } from "./admin-panel/marketing";
import { PersonalAccountClients } from "./personal-account/personal-account-clients";
import { AdminDocuments } from "./admin-panel/documents";
import { OurContactsPage } from "./pages/our-contacts-page";
import { PaymentRulesPage } from "./pages/payment-rules-page";
import { PurchaseReturnsPage } from "./pages/purchase-returns-page";
import { TermsOfUsePage } from "./pages/terms-of-use-page";
import { CancellationOfServicePage } from "./pages/cancellation-of-service-page";
import { PersonalAccountStatement } from "./personal-account/personal-account-business/personal-account-statement";
import { PersonalAccountBalance } from "./personal-account/personal-account-finance/personal-account-balance";
import { PersonalAccountTransactions } from "./personal-account/personal-account-finance/personal-account-transactions";
import { PersonalAccountPayments } from "./personal-account/personal-account-finance/personal-account-payments";

const { GROUPS, BRANDS, PRODUCTS, STORE, COMPANY_INFO, MARKETING, DOCUMENTS } =
  adminPanelTabs;

export const AppRoutes = () => {
  const user = useAppSelector((state) => state.profile.user);
  return (
    <Routes>
      <Route path={appRoutes.HOME} element={<MainPage />} />
      <Route path={appRoutes.PRODUCT} element={<Product />} />
      <Route path={appRoutes.CATALOG} element={<Catalog />} />
      <Route path={appRoutes.BASKET} element={<BasketPage />} />
      <Route path={appRoutes.ABOUT_US} element={<AboutUsPage />} />
      <Route path={appRoutes.ORDER} element={<OrderPage />} />
      <Route path={appRoutes.PUBLIC_OFFER} element={<PublicOfferPage />} />
      <Route path={appRoutes.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
      <Route path={appRoutes.CONTACTS} element={<OurContactsPage />} />
      <Route path={appRoutes.PAYMENT_RULES} element={<PaymentRulesPage />} />
      <Route
        path={appRoutes.PURCHASE_RETURNS}
        element={<PurchaseReturnsPage />}
      />
      <Route path={appRoutes.TERMS_OF_USE} element={<TermsOfUsePage />} />
      <Route
        path={appRoutes.CANCELETION_OF_SERVICE}
        element={<CancellationOfServicePage />}
      />
      <Route
        path={`${appRoutes.PAYMENT_PAGE}/:orderId`}
        element={<PaymentPage />}
      />
      <Route
        path={appRoutes.TERMS_OF_PAYMENT}
        element={<TermsOfPaymentPage />}
      />
      <Route path={appRoutes.REGISTRATION} element={<Registration />}>
        <Route path=":mentor/1" element={<RegistrationStep1 />} />
        <Route path=":mentor/2" element={<RegistrationStep2 />} />
        <Route path=":mentor/3" element={<RegistrationStep3 />} />
        <Route path=":mentor/4" element={<RegistrationStep4 />} />
        <Route path=":mentor/5" element={<RegistrationStep5 />} />
      </Route>
      {user && (
        <Route path={appRoutes.PERSONAL_ACCOUNT} element={<PersonalAccount />}>
          <Route
            path={personalAccountRoutes.HOME}
            element={<PersonalAccountHome />}
          />
          <Route
            path={personalAccountRoutes.CLIENTS}
            element={<PersonalAccountClients />}
          />
          <Route
            path={personalAccountRoutes.BUSINESS}
            element={<PersonalAccountBusiness />}
          />
          <Route
            path={personalAccountRoutes.STATEMENT}
            element={<PersonalAccountStatement />}
          />
          <Route
            path={personalAccountRoutes.FINANCE}
            element={<PersonalAccountFinance />}
          />
          <Route
            path={financeAccountRoutes.FINANCE_BALANCE}
            element={<PersonalAccountBalance />}
          />
          <Route
            path={financeAccountRoutes.FINANCE_TRANSACTIONS}
            element={<PersonalAccountTransactions />}
          />
          <Route
            path={financeAccountRoutes.FINANCE_PAYMENTS}
            element={<PersonalAccountPayments />}
          />
          <Route
            path={personalAccountRoutes.REFERRAL_LINKS}
            element={<ReferralLinks />}
          />
          <Route
            path={personalAccountRoutes.PROFILE}
            element={<PersonalAccountProfile />}
          />
        </Route>
      )}
      {user && (
        <Route path={appRoutes.ADMIN} element={<AdminPanel />}>
          <Route path={adminRoutes[PRODUCTS]} element={<AdminProducts />} />
          <Route path={adminRoutes[GROUPS]} element={<AdminGroups />} />
          <Route path={adminRoutes[BRANDS]} element={<AdminBrands />} />
          <Route path={adminRoutes[STORE]} element={<AdminStore />} />
          <Route path={adminRoutes[COMPANY_INFO]} element={<CompanyInfo />} />
          <Route path={adminRoutes[MARKETING]} element={<Marketing />} />
          <Route path={adminRoutes[DOCUMENTS]} element={<AdminDocuments />} />
        </Route>
      )}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
