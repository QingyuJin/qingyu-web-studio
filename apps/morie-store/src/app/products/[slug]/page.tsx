import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { getProduct, products } from "@/data/products";

export function generateStaticParams() { return products.map((product) => ({ slug: product.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.summary, openGraph: { images: [product.image] } } : {};
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
