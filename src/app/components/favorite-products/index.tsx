import { useAppSelector } from "../../hooks";
import { FavoriteProducts } from "./favorite-products";
import { useFetchProductsQuery } from "../../../features/api/products-api-slice";
import { ContentLayout } from "../layouts";
import { useMediaQuery } from "react-responsive";

export const FavoriteProductsContainer = () => {
  const locale = useAppSelector((state) => state.profile.locale);
  const { data = [] } = useFetchProductsQuery();

  const isFour = useMediaQuery({
    query: "(max-width: 1440px)",
  });
  const isTree = useMediaQuery({
    query: "(max-width: 1350px)",
  });
  const isTwo = useMediaQuery({
    query: "(max-width: 1100px)",
  });
  const isOne = useMediaQuery({
    query: "(max-width: 700px)",
  });

  let chunkSize = 4;
  if (isFour) chunkSize = 4;
  if (isTree) chunkSize = 3;
  if (isTwo) chunkSize = 2;
  if (isOne) chunkSize = 1;
  return (
    <div className="favorite-products-container">
      <ContentLayout>
        <FavoriteProducts
          chunkSize={chunkSize}
          startPosution={0}
          products={data}
          locale={locale}
        />
      </ContentLayout>
    </div>
  );
};
