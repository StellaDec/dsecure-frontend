import { SEOHeadNative } from "@/components/SEOHeadNative";
import { getSEOForPage } from "../utils/seo";

export default function IconShowcase() {
  return (
    <>
      <SEOHeadNative seo={getSEOForPage("icon-showcase")} />
    </>
  );
}
