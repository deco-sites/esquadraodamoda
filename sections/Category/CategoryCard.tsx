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
  href: string;
  label?: string;
  description?: string;
  button?: string;
}

export interface Props extends SectionHeaderProps {
  items: Item[];
}

function Card({ image, href, description, label, button }: Item) {
  return (
    <a href={href} class="card bg-base-50 image-full w-96 shadow-xl">
      <figure>
        <Image
          class="w-full h-auto"
          src={image}
          alt={label}
          width={100}
          height={100}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        {label && <h2 class="card-title text-2xl">{label}</h2>}
        {description && <p class="text-lg">{description}</p>}
        {button
          ? (
            <div className="card-actions justify-end">
              <button className="btn btn-primary">{button}</button>
            </div>
          )
          : <></>}
      </div>
    </a>
  );
}

function CategoryCard({ title, cta, items = [] }: Props) {
  const device = useDevice();

  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      {device === "desktop"
        ? (
          <div class="grid grid-cols-3 gap-10">
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

export default CategoryCard;
