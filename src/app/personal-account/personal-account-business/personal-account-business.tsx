import { useState } from "react";
import { useFetchPartnersQuery } from "../../../features/api/personal-account-api-slice";
import { useAppSelector } from "../../hooks";
import { NotFound } from "../../pages/404";
import { Select } from "antd";

export const PersonalAccountBusiness = () => {
  const [data, setData] = useState([
    {
      lvl: 0,
      name: "Trum Viktoria",
      date: "17.09.2019",
      id: "007-5531492",
      city: "Novocherkask",
      LO: 38.9,
      GO: 264.1,
      OT: 264.1,
      status: "SV",
      countPart: 1,
      all: 0,
    },
    {
      lvl: 0,
      name: "Trum Viktoria",
      date: "17.09.2019",
      id: "007-5531492",
      city: "Novocherkask",
      LO: 38.9,
      GO: 264.1,
      OT: 264.1,
      status: "SV",
      countPart: 1,
      all: 0,
    },
    {
      lvl: 0,
      name: "Trum Viktoria",
      date: "17.09.2019",
      id: "007-5531492",
      city: "Novocherkask",
      LO: 38.9,
      GO: 264.1,
      OT: 264.1,
      status: "SV",
      countPart: 1,
      all: 0,
    },
    {
      lvl: 0,
      name: "Trum Viktoria",
      date: "17.09.2019",
      id: "007-5531492",
      city: "Novocherkask",
      LO: 38.9,
      GO: 264.1,
      OT: 264.1,
      status: "SV",
      countPart: 1,
      all: 0,
    },
    {
      lvl: 0,
      name: "Trum Viktoria",
      date: "17.09.2019",
      id: "007-5531492",
      city: "Novocherkask",
      LO: 38.9,
      GO: 264.1,
      OT: 264.1,
      status: "SV",
      countPart: 1,
      all: 0,
    },
    {
      lvl: 0,
      name: "Trum Viktoria",
      date: "17.09.2019",
      id: "007-5531492",
      city: "Novocherkask",
      LO: 38.9,
      GO: 264.1,
      OT: 264.1,
      status: "SV",
      countPart: 1,
      all: 0,
    },
  ]);
  const month = [
    {
      id: 1,
      name: "Январь 2024",
    },
    {
      id: 2,
      name: "aaaaaaaa",
    },
  ];
  const monthOptions = month.map((month: any) => ({
    value: month.id,
    label: month.name,
  }));
  const [date, setDate] = useState([
    { date: "march 2024" },
    { date: "dec 2023" },
  ]);
  const [filterDate, setFilterDate] = useState(null);
  const [filter, setFilter] = useState({});

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    qualification: "",
    phoneNumber: "",
    fromRegDate: "",
    toRegDate: "",
    country: "",
    regPeriod: "",
    idOrName: "",
    city: "",
    city2: "",
    allPartner: false,
  });

  const handleInputChange = (e: any, type?: string) => {
    const values = month.find((elm) => {
      if (elm.id == e) {
        return elm;
      }
    });
    if (type) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [type]: values?.name,
      }));
    } else {
      const { id, value } = e.target;
      setFilters((prevFilters) => ({
        ...prevFilters,
        [id]: value,
        allPartner: e.target.checked,
      }));
    }

    console.log(filters)
  };

  const resetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      qualification: "",
      phoneNumber: "",
      fromRegDate: "",
      toRegDate: "",
      country: "",
      regPeriod: "",
      idOrName: "",
      city: "",
      city2: "",
      allPartner: false,
    });
  };

  const filterResults = () => {
    console.log("Filters applied:", filters);
  };

  const showAll = () => {
    if (filter != "FILTER") {
      setFilter("FILTER");
    } else {
      setFilter("");
    }
  };
  const selectDate = (e: any) => {
    setFilterDate(e.target.innerText);
  };
  const user = useAppSelector((state) => state.profile.user);
  const referralId = user?.referralId || "0";
  const { data: partners = [] } = useFetchPartnersQuery(referralId);

  if (!user) return <NotFound />;
  return (
    <div className="lk__wrapper lk__wrapper-tabs-first" data-tabs="true">
      <ul className="lk__tag-controls">
        <li
          className={`lk__tag-control ${filter == "FILTER" ? "active" : ""}`}
          data-tabs-control="true"
        >
          <button className="filter_button" onClick={showAll}>
            Фильтр
          </button>
        </li>
      </ul>
      {filter == "FILTER" && (
        <div className="filter-form">
          <div className="form-group">
            <div className="div11">
              <label htmlFor="fromDate">ЛО</label>
              <input
                className="limite"
                type="number"
                id="fromDate"
                placeholder="от"
                value={filters.fromDate}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                className="limite"
                type="number"
                id="toDate"
                placeholder="до"
                value={filters.toDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="div12" style={{ display: "flex" }}>
              <label htmlFor="fromRegDate">СГО</label>
              <input
                className="limite"
                type="number"
                id="fromRegDate"
                placeholder="от"
                value={filters.fromRegDate}
                onChange={(e) => handleInputChange(e)}
              />
              <input
                className="limite"
                type="number"
                id="toRegDate"
                placeholder="до"
                value={filters.toRegDate}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="div1">
              <input
                type="text"
                id="idOrName"
                placeholder="Введите ID или фамилию"
                value={filters.idOrName}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="div2">
              <Select
                style={{ width: "100%", height: "50px" }}
                options={monthOptions}
                placeholder={"Квалификация"}
                value={
                  filters.qualification ? filters.qualification : "Квалификация"
                }
                onChange={(e) => handleInputChange(e, "qualification")}
              />
            </div>
            <div className="div3">
              <input
                type="number"
                id="phoneNumber"
                placeholder="Введите номер телефона"
                value={filters.phoneNumber}
                onChange={(e) => handleInputChange(e)}
              />
            </div>
            <div className="div4">
              <Select
                style={{  width: "100%", height: "50px" }}
                options={monthOptions}
                placeholder={"Страна"}
                value={filters.country ? filters.country : "Страна"}
                onChange={(e) => handleInputChange(e, "country")}
              />
            </div>
            <div className="div5">
              <Select
                style={{  width: "100%", height: "50px" }}
                options={monthOptions}
                placeholder={"Период регистрации"}
                value={
                  filters.regPeriod ? filters.regPeriod : "Период регистрации"
                }
                onChange={(e) => handleInputChange(e, "regPeriod")}
              />
            </div>
            <div className="div6">
              <Select
                style={{  width: "100%", height: "50px"}}
                options={monthOptions}
                placeholder={"Населенный пункт"}
                value={filters.city ? filters.city : "Населенный пункт"}
                onChange={(e) => handleInputChange(e, "city")}
              />
            </div>
            <div className="div7">
              <Select
                style={{  width: "100%", height: "50px" }}
                options={monthOptions}
                placeholder={"Населенный пункт 2"}
                value={filters.city2 ? filters.city2 : "Населенный пункт 2"}
                onChange={(e) => handleInputChange(e, "city2")}
              />
            </div>
            <div className="buttons div8">
              <button className="filter-button" onClick={filterResults}>
                Фильтровать
              </button>
            </div>
            <div className="buttons div9">
              <button className="reset" onClick={resetFilters}>
                Сбросить фильтр
              </button>
            </div>
            <div className="checkbox_buttons div10">
              <input
                type="checkbox"
                id="allPartner"
                value=""
                onChange={(e) => handleInputChange(e)}
              />
              <label htmlFor="allPartner">
                Отображать всех
              </label>
            </div>
          </div>
        </div>
      )}
      <div className="lk__exel_form">
        <div className="date_form">
          <div className="date_form_main_section">
            <div>
              <span>Период:</span>
            </div>
            <div className="date_form_select">
              <span>{filterDate ? filterDate : "Май 2024"} </span>
              <img src="/images/icons/arrow-down.svg" alt="" />
              <div className="date_form_selsect_menu">
                {date.map((elm, index) => (
                  <div key={index} onClick={(e) => selectDate(e)}>
                    {elm.date}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="registration_date">
          <label htmlFor="radio"> Дата:</label>
          <input type="radio" id="radio" />
          <span>Регистрации</span>
        </div>
      </div>
      <div className="lk__tabs-contents">
        <div className="lk__tabs-content active" data-tabs-content="true">
          <div className="lk__info-table">
            <div className="lk__table-wrapper">
              <table className="lk__table">
                <thead>
                  <tr className="lk__table-item">
                    <th>Ур.</th>
                    <th>Фамилия Имя (Всего партнеров) </th>
                    <th> </th>
                    <th>Дата (PV) </th>
                    <th>ID</th>
                    <th>Город</th>
                    <th>ЛО,vp</th>
                    <th>ГО,vp</th>
                    <th>ОТ,vp</th>
                    <th>Статус</th>
                    <th>Количество новых активных партнеров</th>
                    <th>Всего активированных партнеров</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index}>
                      <td>{item.lvl}</td>
                      <td>{item.name}</td>
                      <td style={{ display: "flex", gap: "5px" }}>
                        <div>
                          <a href="">
                            <img
                              style={{ width: "20px" }}
                              src="/images/icons/telegram-blue.svg"
                              alt=""
                            />
                          </a>
                        </div>
                        <div>
                          <a href="">
                            <img
                              style={{ width: "20px" }}
                              src="/images/icons/whatsapp-green.svg"
                              alt=""
                            />
                          </a>
                        </div>
                        <div>
                          <a href="">
                            <img
                              style={{ width: "20px" }}
                              src="/images/icons/phone-3114.svg"
                              alt=""
                            />
                          </a>
                        </div>
                      </td>
                      <td>{item.date}</td>
                      <td style={{ textWrap: "nowrap", color: "#b3db11" }}>
                        {item.id}
                      </td>
                      <td>{item.city}</td>
                      <td>{item.LO}</td>
                      <td>{item.GO}</td>
                      <td>{item.OT}</td>
                      <td>{item.status}</td>
                      <td>{item.countPart}</td>
                      <td>{item.all}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
