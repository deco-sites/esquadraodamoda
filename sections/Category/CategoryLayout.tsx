import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "deco/hooks/useDevice.ts";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx"; 

/** @titleBy label */
export interface Item {
  image: ImageWidget;
  href: string;
  label?: string;
}

export interface Props extends SectionHeaderProps {
  items: Item[];
}

function Card({ image, href, label }: Item) {
  return (
    <div className="carousel-item drop-shadow-md">
      <a href={href} class="flex flex-col items-center justify-center gap-4">
        <div class="w-full h-auto rounded-full bg-base-200 flex justify-center items-center border border-transparent">
          <Image
            class="w-full h-auto rounded-2xl"
            src={image}
            alt={label}
            width={800}
            height={800} 
            loading="lazy" 
          />
        </div>
        {label && <span class="font-medium text-sm">{label}</span>}
      </a>
    </div>
  );
}

function CategoryLayout({ title, cta, items = [] }: Props) {
  const device = useDevice();

  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />
      <div class="carousel carousel-end rounded-box grid grid-cols-3 gap-10">
        {items?.map((i) => <Card {...i} />)}
      </div>
    </Section.Container>
  );
}

export default CategoryLayout;
