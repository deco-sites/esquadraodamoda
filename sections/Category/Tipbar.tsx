import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";

/** @titleBy label */
export interface Item {
  image: ImageWidget;
  label?: string;
  description?: string;
}

export interface Props extends SectionHeaderProps {
  items: Item[];
}

function Card({ image, description, label }: Item) {
  return (
    <div class="flex flex-col items-center gap-4">
      <Image
        class=""
        src={image}
        alt={label}
        width={40}
        height={40}
        loading="lazy"
      />
      {label && <h2 class="card-title text-2xl text-center">{label}</h2>}
      {description && <p class="text-lg text-center">{description}</p>}
    </div>
  );
}

function Tipbar({ title, cta, items = [] }: Props) {
  const device = useDevice();

  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      {device === "desktop"
        ? (
          <div class="grid grid-cols-5 gap-10">
            {items?.map((i) => <Card {...i} />)}
          </div>
        )
        : (
          <Slider class="carousel carousel-center sm:carousel-end gap-5 w-full">
            {items?.map((i, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                )}
              >
                <Card {...i} />
              </Slider.Item>
            ))}
          </Slider>
        )}
    </Section.Container>
  );
}

export default Tipbar;
