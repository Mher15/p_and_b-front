import { getPriceWithDiscont, getPriceWithMarkup } from "../../../../utils";
import { userRoles } from "../../../constants";
import { IProduct } from "../../../types";
import { ProductPageControls } from "../product-page-controls";

interface IProductInfoProps {
  product: IProduct;
  userRole: string;
}

export const ProductInfo = ({ product, userRole }: IProductInfoProps) => {
  const { id, name, vopPrice, price, discount, shortDescription, brand } =
    product;

  const resultPrice = getPriceWithMarkup(price, userRole);

  return (
    <div>
      <h1 className="title product-page__main-title">{name}</h1>

      <p className="product-page__code">
        <b>SKU: </b> {id}
      </p>
      <div className="product-page__price-wrapper">
        <div className="product-page__price">
          {getPriceWithDiscont(resultPrice, discount)} ₽
          {userRole === userRoles.PARTNER && (
            <>
              | <b>{vopPrice} PV</b>
            </>
          )}
        </div>
      </div>
      <ul className="product-page__brands">
        <li className="product-page__brand">
          <span>Бренд</span>
          <div>
            <img src={`/static/${brand.image}`} alt={brand.description} />
            <small>{brand.name}</small>
          </div>
        </li>
      </ul>
      <div
        className="product-page__text"
        dangerouslySetInnerHTML={{ __html: shortDescription }}
      />
      <ProductPageControls product={product} />
    </div>
  );
};
