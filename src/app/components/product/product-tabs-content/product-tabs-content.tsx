import styled from "styled-components";
import { IProduct } from "../../../types";
import { ChangeEvent, useState } from "react";
import { ProductDocument } from "../product-document";

interface IProductTabsContentProps {
  product: IProduct;
}

const InfoContainer = styled.div`
  display: grid;
  grid-template-rows: max-content max-content;
`;

const ProductCompoundContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductDocumentsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductCompoundImage = styled.img`
  width: 100%;
`;

const InfoBlockTitle = styled.p`
  margin-top: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 45px;
  font-weight: 700;
  line-height: 130%;
  color: #000;

  @media (max-width: 575px) {
    display: none;
  }
`;

export const ProductTabsContent = ({ product }: IProductTabsContentProps) => {
  const { documents, compound } = product;

  const [tab, setTab] = useState(1);
  const handleChangeTab = (tab: number) => {
    setTab(tab);
  };
  const onTabSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const tab = Number(event.target.value);
    if (isNaN(tab)) {
      return;
    }

    setTab(tab);
  };
  return (
    <div className="tabs product-page__content" data-tabs="true">
      <div className="tabs__controls">
        <ul className="tabs__controls-list">
          <li
            className={`tabs__controls-item ${tab === 1 ? "active" : ""}`}
            data-tabs-control="true"
            onClick={() => handleChangeTab(1)}
          >
            <button className="btn--reset">Описание </button>
          </li>
          <li
            className={`tabs__controls-item ${tab === 2 ? "active" : ""}`}
            data-tabs-control="true"
            onClick={() => handleChangeTab(2)}
          >
            <button className="btn--reset">Применение </button>
          </li>
          <li
            className={`tabs__controls-item ${tab === 3 ? "active" : ""}`}
            data-tabs-control="true"
            onClick={() => handleChangeTab(3)}
          >
            <button className="btn--reset">Полезность</button>
          </li>
          <li
            className={`tabs__controls-item ${tab === 4 ? "active" : ""}`}
            data-tabs-control="true"
            onClick={() => handleChangeTab(4)}
          >
            <button className="btn--reset">Информация</button>
          </li>
        </ul>
        <div
          className="components__select tabs__select"
          data-select-placeholder=""
        >
          <select
            className="tabs__select-inner"
            name="sort"
            onChange={onTabSelect}
          >
            <option value="1" selected>
              Описание
            </option>
            <option value="2">Применение</option>
            <option value="3">Полезность</option>
            <option value="4">Информация</option>
          </select>
        </div>
      </div>
      <div className="tabs__contents">
        <div
          className={`tabs__content product-page__description ${
            tab === 1 ? "active" : ""
          }`}
          data-tabs-content="true"
        >
          <p dangerouslySetInnerHTML={{ __html: product.description }} />
        </div>
        <div
          className={`tabs__content product-page__description ${
            tab === 2 ? "active" : ""
          }`}
          data-tabs-content="true"
        >
          <p
            dangerouslySetInnerHTML={{
              __html: product.methodOfAdministration,
            }}
          />
        </div>
        <div
          className={`tabs__content product-page__description ${
            tab === 3 ? "active" : ""
          }`}
          data-tabs-content="true"
        >
          <p dangerouslySetInnerHTML={{ __html: product.utility }} />
        </div>
        <div
          className={`tabs__content product-page__description ${
            tab === 4 ? "active" : ""
          }`}
          data-tabs-content="true"
        >
          <InfoContainer>
            <ProductCompoundContainer>
              <InfoBlockTitle>Состав</InfoBlockTitle>
              <ProductCompoundImage src={`/static/${compound}`} />
            </ProductCompoundContainer>
            <ProductDocumentsContainer>
              <InfoBlockTitle>Документы</InfoBlockTitle>
              {documents.map((document, index) => {
                return (
                  <ProductDocument
                    key={document.id}
                    document={document}
                    number={index + 1}
                  />
                );
              })}
            </ProductDocumentsContainer>
          </InfoContainer>
        </div>
      </div>
    </div>
  );
};
