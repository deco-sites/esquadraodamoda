import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";

export interface ItemProps {
  label: string;
  description: string;
}

export interface Props {
  title?: string;
  image?: ImageWidget;
  items?: ItemProps[];
}

export default function ProductSpecification(
  { title, image, items = [] }: Props,
) {
  return (
    <div class="container flex flex-col gap-4 sm:gap-5 w-full py-4 sm:py-5 px-5 sm:px-0">
      <h2 class="text-2xl sm:text-3xl font-semibold">{title}</h2>
      <div
        class={clx(
          "container flex flex-col gap-7",
          "grid-cols-1 gap-2 py-0",
          "md:flex-row sm:w-full sm:gap-6",
        )}
      >
        <div class="w-full md:w-1/2">
          <Image 
            class="w-full h-auto rounded-2xl"
            src={image}
            width={600}
            height={260}
            loading="lazy"
          />
        </div>
        <div class="w-full md:w-1/2 flex flex-col gap-6">
          {items?.map((item: ItemProps) => (
            <div
              tabIndex={0}
              className="collapse collapse-plus border-base-300 bg-base-200 border"
            >
              <div className="collapse-title text-xl font-medium">
                {item.label}
              </div>
              <div className="collapse-content">
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
