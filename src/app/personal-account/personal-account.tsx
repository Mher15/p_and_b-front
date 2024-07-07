import { Breadcrumbs } from "../components/breadcrumbs";
import { LeftSide } from "./left-side/left-side";

export const PersonalAccount = () => {
  return (
    <main className="main lk">
      <Breadcrumbs />
      <section className="lk__section">
        <div className="container">
          <div>
            <LeftSide />
          </div>
        </div>
      </section>
    </main>
  );
};
