import { signal } from "@preact/signals";
import register from "preact-custom-element";

function HomeHero() {
  const count = signal(0);

  return (
    <>
      <div class="relative w-screen h-screen">Home Hero</div>
    </>
  );
}

register(HomeHero, "home-hero");
