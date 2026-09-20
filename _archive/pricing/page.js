import PricingExperience from "@/components/pricing/PricingExperience";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing — BuildUNIX Construction Platform",
  description:
    "Simple, transparent pricing for Indian PMC firms. Start with a free 30-day pilot.",
  path: "/pricing"
});

export default function PricingPage() {
  return <PricingExperience />;
}
