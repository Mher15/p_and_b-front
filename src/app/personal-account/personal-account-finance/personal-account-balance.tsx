import { useAppSelector } from "../../hooks";
import { useState } from "react";
import { NotFound } from "../../pages/404";
import { CashbackAccountInfo } from "./cashback-account-info";
import { GiftAccountInfo } from "./gift-account-info";

export const PersonalAccountBalance = () => {
    const user = useAppSelector((state) => state.profile.user);
    const [tab, setTab] = useState(1);
    const handleChangeTab = (tab: number) => {
        setTab(tab);
    };

    if (!user) return <NotFound />;
    return (
        <div className="tabs product-page__content">
            <ul className="lk__tabs-controls">
                <li className={`lk__tabs-control ${tab === 1 ? "active" : ""
                    }`} data-tabs-control="true">
                    <button className="btn--reset" onClick={() => handleChangeTab(1)}>Счёт вознаграждение</button>
                </li>
                <li className={`lk__tabs-control ${tab === 2 ? "active" : ""
                    }`} data-tabs-control="true">
                    <button className="btn--reset" onClick={() => handleChangeTab(2)}>Подарочный счёт</button>
                </li>
            </ul>
            <div className={`lk__tabs-content ${tab === 1 ? "active" : ""}`} data-tabs-content="true">
                <CashbackAccountInfo />
            </div>
            <div className={`lk__tabs-content ${tab === 2 ? "active" : ""}`} data-tabs-content="true">
                <GiftAccountInfo />
            </div>
        </div>
    );
};
