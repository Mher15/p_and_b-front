import "../scss/style.scss";
import { AboutUs } from "../components/about-us";
import { Breadcrumbs } from "../components/breadcrumbs";

export const AboutUsPage = () => (
  <main className="main about">
    <Breadcrumbs />
    <AboutUs />
  </main>
);
