import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../hooks";
import { NotFound } from "../../pages/404";
import { useFetchStructureQuery } from "../../../features/api/my-structure-api-slice";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import {
  setStructureData,
  updateStructureData,
} from "../../../features/structure/structure-slice";
import { useFetchCountriesQuery } from "../../../features/api/address-api-slice";
import { ICountry } from "../../types";
import { Select } from "antd";

export const PersonalAccountBusiness = React.memo(() => {
  const user = useAppSelector((state) => state.profile.user);
  const id = user?.id ? user?.id : 0;
  const { data: structure }: any = useFetchStructureQuery(id);
  const dispatch: AppDispatch = useDispatch();
  const { structureData, cloneStructure } = useSelector(
    (state: RootState) => state.structure
  );

  const data = [
    {
      id: 0,
      name: "Клиент",
      value: "CLIENT",
    },
    {
      id: 1,
      name: "Партнёр",
      value: "PARTNER",
    },
  ];

  const qualificationOptions = data.map((item) => ({
    value: item.value,
    label: item.name,
  }));

  const { data: countries = [], isLoading: isCountryLoading } =
    useFetchCountriesQuery();

  const countriesOptions = countries.map((country: ICountry) => ({
    value: country.id,
    label: country.name,
  }));

  const [filterDate, setFilterDate] = useState(null);
  const [filter, setFilter] = useState({});

  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    phoneNumber: "",
    fromRegDate: "",
    toRegDate: "",
    regPeriod: "",
    idOrName: "",
    country: "",
    qualification: "",
  });

  const handleInputChange = (e: any, type?: string) => {
    if (type) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [type]: e.target ?e.target.value  : String(e),
      }));
    }
  };

  const resetFilters = () => {
    setFilters({
      fromDate: "",
      toDate: "",
      phoneNumber: "",
      fromRegDate: "",
      toRegDate: "",
      regPeriod: "",
      idOrName: "",
      country: "",
      qualification: "",
    });
  };

  const filterResults = () => {
    let filterData: any[] = cloneStructure;
    let filtersValue = false;
    let {
      fromDate,
      toDate,
      phoneNumber,
      fromRegDate,
      toRegDate,
      regPeriod,
      idOrName,
      country,
      qualification,
    } = filters;

    console.log("filters", filters);

    const formatPhoneNumber = (phoneNumber: any) => {
      const cleaned = phoneNumber.replace(/\D/g, "");
      if (cleaned.length <= 12) {
        const match = cleaned.match(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/);
        if (match) {
          return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
        }
      }
      return cleaned;
    };

    if (filters) {
      if (fromDate !== "" && toDate === "") {
        filterData = cloneStructure.filter(
          (item: any) => item?.state?.lo >= fromDate
        );
      }
      if (fromDate === "" && toDate !== "") {
        filterData = cloneStructure.filter(
          (item: any) => item?.state?.lo <= toDate
        );
      }
      if (fromDate !== "" && toDate !== "") {
        filterData = cloneStructure.filter(
          (item: any) =>
            item?.state?.lo <= toDate && item?.state?.lo >= fromDate
        );
      }

      if (fromRegDate !== "" && toRegDate === "") {
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) => item?.state?.go >= fromRegDate
          );
        }
      }
      if (fromRegDate === "" && toRegDate !== "") {
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) => item?.state?.go <= toRegDate
          );
        }
      }
      if (fromRegDate !== "" && toRegDate !== "") {
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) =>
              item?.state?.go <= toRegDate && item?.state?.go >= fromRegDate
          );
        }
      }

      if (idOrName !== "") {
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) =>
              item.referralId === idOrName || item.name === idOrName
          );
        }
      }

      if (phoneNumber !== "") {
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) => item.phone === formatPhoneNumber(phoneNumber)
          );
        }
      }

      if (regPeriod !== "") {
        if (filterData.length > 0) {
          filterData = filterData.filter((item: any) =>
            item?.createdAt !== null
              ? item?.createdAt.split("T")[0] === regPeriod
              : ""
          );
        }
      }

      if (country !== "") {
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) => item.countryId === +country
          );
        }
      }

      if(qualification !== ""){
        if (filterData.length > 0) {
          filterData = filterData.filter(
            (item: any) => item.role === qualification
          );
        }
      }

      Object.entries(filters).map(([key, value]) => {
        if (value !== "") {
          filtersValue = true;
        }
      });

      if (!filtersValue) {
        filterData = cloneStructure;
      }

      console.log(filterData);

      dispatch(updateStructureData(filterData));
    }
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

  const genStructure = (cloneData: any, depth: number[]) => {
    cloneData?.map((item: any) => {
      dispatch(setStructureData(item));

      item?.myRefers?.length > 0 ? genStructure(item.myRefers, depth) : "";
    });
  };

  useEffect(() => {
    if (structure && structureData.length < 1) {
      genStructure(structure, []);
    }
  }, [structure]);

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
                min={1}
                id="fromDate"
                placeholder="от"
                value={filters.fromDate}
                onChange={(e) => handleInputChange(e, "fromDate")}
              />
              <input
                className="limite"
                type="number"
                id="toDate"
                placeholder="до"
                value={filters.toDate}
                onChange={(e) => handleInputChange(e, "toDate")}
              />
            </div>
            <div className="div12" style={{ display: "flex" }}>
              <label htmlFor="fromRegDate">ГО</label>
              <input
                className="limite"
                type="number"
                id="fromRegDate"
                placeholder="от"
                value={filters.fromRegDate}
                onChange={(e) => handleInputChange(e, "fromRegDate")}
              />
              <input
                className="limite"
                type="number"
                id="toRegDate"
                placeholder="до"
                value={filters.toRegDate}
                onChange={(e) => handleInputChange(e, "toRegDate")}
              />
            </div>
            <div className="div1">
              <input
                type="text"
                id="idOrName"
                placeholder="Введите ID или фамилию"
                value={filters.idOrName}
                onChange={(e) => handleInputChange(e, "idOrName")}
              />
            </div>
            <div className="div2">
              <Select
                style={{ width: "100%", height: "50px" }}
                options={qualificationOptions}
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
                value={
                  filters.phoneNumber
                    ? filters.phoneNumber
                    : "Введите номер телефона"
                }
                onChange={(e) => handleInputChange(e, "phoneNumber")}
              />
            </div>
            <div className="div4">
              <Select
                style={{ width: "100%", height: "50px" }}
                options={countriesOptions}
                placeholder={"Страна"}
                onChange={(e) => handleInputChange(e, "country")}
              />
            </div>
            <div className="div5">
              <input
                type="date"
                id="regDate"
                style={{ width: "100%", height: "50px" }}
                placeholder={"Период регистрации"}
                value={
                  filters.regPeriod ? filters.regPeriod : "Период регистрации"
                }
                onChange={(e) => handleInputChange(e, "regPeriod")}
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
          </div>
        </div>
      )}
      <div className="lk__exel_form">
        <div className="date_form">
          {/* <div className="date_form_main_section"> */}
            {/* <div>
              <span>Период:</span>
            </div>
            <div className="date_form_select">
              <span>{filterDate ? filterDate : "Май 2024"} </span>
              <img src="/images/icons/arrow-down.svg" alt="" /> */}
              {/* <div className="date_form_selsect_menu">
                {date.map((elm, index) => (
                  <div key={index} onClick={(e) => selectDate(e)}>
                    {elm.date}
                  </div>
                ))}
              </div> */}
            {/* </div> */}
          {/* </div> */}
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
                    <th colSpan={7}>Фамилия Имя (Всего партнеров) </th>
                    <th></th>
                    <th>Дата</th>
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
                  {structureData?.map((item: any) => {
                    if (item.role === "PARTNER") {
                      return (
                        <tr key={item.id}>
                          <td>{/* {depth.length - 1} */}</td>
                          <td>
                            <span>
                              {/* {depth.length > 1 &&
                               depth?.map((refDepth, index) => {
                                 return index > 0 && <span key={index}>+</span>;
                               })} */}
                            </span>
                          </td>
                          <td>
                            <span>{item?.name}</span>
                            <span>{item?.lastName}</span>
                          </td>
                          <td>
                            <span>
                              {item?.myRefers?.length > 0 &&
                                `(${item?.myRefers?.length})`}
                            </span>
                          </td>
                          <td></td>
                          <td></td>
                          <td></td>
                          <td></td>
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
                              <a href={`tel:${item?.phone}`}>
                                <img
                                  style={{ width: "20px" }}
                                  src="/images/icons/phone-3114.svg"
                                  alt=""
                                />
                              </a>
                            </div>
                          </td>
                          <td>
                            {moment(item?.createdAt).format("DD.MM.YYYY")}
                          </td>
                          <td style={{ textWrap: "nowrap", color: "#b3db11" }}>
                            {item?.referralId}
                          </td>
                          <td>{item?.state?.city}</td>
                          <td>{item?.state?.lo}</td>
                          <td>{item?.state?.go}</td>
                          <td>{item?.state?.ot}</td>
                          <td>{item?.role}</td>
                          <td>{item?.state?.newActivePartners}</td>
                          <td>{item?.state?.activePartners}</td>
                        </tr>
                      );
                    }
                  })}
                  {/* <>{structure ? genStructure(structure, []) : ""}</> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
