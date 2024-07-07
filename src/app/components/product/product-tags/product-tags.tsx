import { Link } from "react-router-dom";
import { appRoutes } from "../../../constants";
import { IProduct, ITag } from "../../../types";

interface IProductTagsProps {
  product: IProduct;
}

export const ProductTags = ({ product }: IProductTagsProps) => {
  const { groups, tags } = product;

  return (
    <div className="product-page__bottom">
      <dl className="product-page__info-list">
        <div>
          <dt>Категория</dt>
        </div>
        {groups.map((group) => (
          <dd key={group.id}>
            <Link
              key={group.id}
              to={`${appRoutes.CATALOG}?group=${group.name}`}
            >
              {group.name}
            </Link>
          </dd>
        ))}
      </dl>
      <dl className="product-page__info-list">
        <div>
          <dt>Tag:</dt>
          <dd>
            {(tags || []).map((tag: ITag) => (
              <Link key={tag.id} to={`${appRoutes.CATALOG}?tag=${tag.name}`}>
                {tag.name}
              </Link>
            ))}
          </dd>
        </div>
      </dl>
    </div>
  );
};
