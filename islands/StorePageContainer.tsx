import { useSignal } from "@preact/signals";
import StorePageCep from "./StorePageCep.tsx";
import StorePageMapList from "./StorePageMapList.tsx";
import StoreMap from "./StoreMap.tsx";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import type { StoreLocation } from "../types/storeLocation.ts";
import { useEffect } from "preact/hooks";

export interface StorePageContainerProps {
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
  };
  apiKeyMaps: string;
}

export default function StorePageContainer(props: StorePageContainerProps) {
  const showMapSignal = useSignal(false);
  const mapStoresSignal = useSignal<StoreLocation[]>([]);
  const selectedStoreSignal = useSignal<StoreLocation | null>(null);
  const noStoresFoundSignal = useSignal(false);

  useEffect(() => {
    if (mapStoresSignal.value.length > 0) {
      showMapSignal.value = true;
    } else {
      showMapSignal.value = false;
    }
  }, [mapStoresSignal.value]);

  return (
    <div class="container mx-auto p-6">
      {noStoresFoundSignal.value && (
        <div class="bg-red-100 text-red-700 p-4 mb-4 rounded">
          Nenhuma loja encontrada.
        </div>
      )}
      <div
        class={`max-w-[1600px] mx-auto py-8 ${
          showMapSignal.value ? "block" : "hidden"
        }`}
      >
        <div class="flex flex-col md:flex-row items-start justify-between mb-8">
          <div class="w-full md:w-3/12 min-w-[364px]">
            <StorePageMapList
              mapStoresSignal={mapStoresSignal}
              selectedStoreSignal={selectedStoreSignal}
              showMapSignal={showMapSignal}
            />
          </div>
          <div class="w-full md:flex-1 md:ml-4">
            <StoreMap
              apiKey={props.apiKeyMaps}
              mapStoresSignal={mapStoresSignal}
              selectedStoreSignal={selectedStoreSignal}
            />
          </div>
        </div>
      </div>

      <div
        class={`flex flex-col items-center mb-6 ${
          showMapSignal.value ? "hidden" : "block"
        }`}
      >
        <div class="w-full flex flex-col items-center md:flex-row md:justify-center">
          <div class="w-full md:w-1/2 pr mb-6 md:mb-0">
            <Picture className="mb-5">
              <Source
                media="(max-width: 767px)"
                src={props.image.mobile ??
                  "https://bawclothing.vteximg.com.br/arquivos/lojasbawclothingmob.png"}
                width={370}
                height={236}
                alt={props.image.alt}
              />
              <Source
                media="(min-width: 768px)"
                src={props.image.desktop ??
                  "https://bawclothing.vteximg.com.br/arquivos/lojasbawclothing.png"}
                width={471}
                height={625}
                alt={props.image.alt}
              />
              <img
                src={props.image.desktop ??
                  "https://bawclothing.vteximg.com.br/arquivos/lojasbawclothing.png"}
                alt={props.image.alt}
                width={471}
                height={625}
              />
            </Picture>
          </div>

          <div class="md:w-1/2 flex flex-col items-center md:items-start md:pl-6">
            <div class="flex items-center w-full justify-between">
              <h1 class="text-3xl font-black mb-4 text-left md:text-left">
                Encontre uma loja perto de você!
              </h1>
            </div>

            <StorePageCep
              mapStoresSignal={mapStoresSignal}
              showMapSignal={showMapSignal}
              noStoresFoundSignal={noStoresFoundSignal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
