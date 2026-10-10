import ProductExperience from "@/components/product/ProductExperience";
import { siteMetadata } from "@/lib/site-content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Product — BuildUNIX Construction Site Management",
  description:
    "See how BuildUNIX gives you a clear view of your construction site: ready-made stages, photo proof, PMC approvals, and live status on every block.",
  path: "/product"
});

export default function ProductPage() {
  return <ProductExperience />;
}
