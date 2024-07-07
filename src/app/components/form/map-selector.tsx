import { YMaps, Map, SearchControl } from "@pbe/react-yandex-maps";

export const YandexMaps = () => (
  <YMaps>
    <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
      <SearchControl options={{ float: "right" }} />
    </Map>
  </YMaps>
);
