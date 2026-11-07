import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PRODUCTS, getProductBySlug } from '@/data/products';
import { ProductDetailView } from '@/components/product/ProductDetailView';

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found | JO STUDIO",
    };
  }

  return {
    title: `${product.name} | JO STUDIO`,
    description: `${product.description} Buy online at ₹${product.discountedPrice} (${product.discountPercentage}% OFF) with Free Delivery and WhatsApp instant order confirmation.`,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.images[0],
          width: 800,
          height: 1000,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}
