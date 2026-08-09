import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { FieldOpsPage } from '@/features/products/fieldops/FieldOpsPage';
import { GenericProductPage } from '@/features/products/generic/GenericProductPage';
import { getProductBySlug, products } from '@/features/products/data/products';
import { siteUrl } from '@/lib/constants';

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const isFieldOps = product.slug === 'fieldops';
  const title = isFieldOps
    ? 'Qevaryn FieldOps | Gestão de Equipas e Serviços Externos'
    : `${product.name} | Produto adaptável`;
  const description = isFieldOps
    ? 'Conheça um conceito de software para organizar equipas externas, serviços, visitas, checklists, evidências e relatórios.'
    : `${product.description} ${product.problem}`;
  const canonicalPath = `/produtos/${product.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalPath
    },
    openGraph: {
      type: 'website',
      locale: 'pt_PT',
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'Qevaryn Systems',
      title,
      description,
      images: [
        {
          url: '/opengraph-image.png',
          width: 1200,
          height: 630,
          alt: `${product.name} - conceito de solução`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/twitter-image.png']
    }
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  if (product.slug === 'fieldops') {
    return <FieldOpsPage />;
  }

  return <GenericProductPage product={product} />;
}
