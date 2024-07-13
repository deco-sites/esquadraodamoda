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
    <a href={href} class="flex flex-col items-center justify-center gap-4">
      <div class="w-44 h-44 rounded-full bg-base-200 flex justify-center items-center border border-transparent hover:border-primary">
        <Image
          src={image}
          alt={label}
          width={100}
          height={100}
          loading="lazy"
        />
      </div>
      {label && <span class="font-medium text-sm">{label}</span>}
    </a>
  );
}

function CategoryLayout({ title, cta, items = [] }: Props) {
  const device = useDevice();

  return (
    <Section.Container>
      <Section.Header title={title} cta={cta} />

      <div class="grid grid-cols-6 gap-10">
        {items?.map((i) => <Card {...i} />)}
      </div>
    </Section.Container>
  );
}

export default CategoryLayout;
