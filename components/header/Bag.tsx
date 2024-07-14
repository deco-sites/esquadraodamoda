import { useScript } from "deco/hooks/useScript.ts";
import { MINICART_DRAWER_ID } from "../../constants.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

const onLoad = (id: string) =>
  window.STOREFRONT.CART.subscribe((sdk) => {
    const counter = document.getElementById(id);
    const count = sdk.getCart()?.items.length ?? 0;

    if (!counter) {
      return;
    }

    // Set minicart items count on header
    if (count === 0) {
      counter.classList.add("hidden");
    } else {
      counter.classList.remove("hidden");
    }

    counter.innerText = count > 9 ? "9+" : count.toString();
  });

  export interface BagProps {
    src?: string;
  }

function Bag(
  { src }: BagProps,
) {
  const id = useId();

  return (
    <>
      <label
        class="indicator flex items-center"
        for={MINICART_DRAWER_ID}
        aria-label="open cart"
      >
        <span
          id={id}
          class="hidden indicator-item badge badge-primary badge-sm font-thin"
        />

        <span class="px-0 btn btn-md btn-ghost no-animation flex flex-row items-center justify-start text-left hover:bg-transparent">
          {src ? 
          <Image
              src={src}
              alt={'Minicart'}
              width={40}
              height={40}
            />
            : <Icon id="shopping_bag" />}

            <p class="text-base font-normal">Meu <br></br><strong>Carrinho</strong></p>
        </span>
      </label>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }} 
      />
    </>
  );
}

export default Bag;
