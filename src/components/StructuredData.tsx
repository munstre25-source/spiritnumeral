import Script from 'next/script';

type StructuredDataProps = {
  id: string;
  data: Record<string, any>;
};

export default function StructuredData({ id, data }: StructuredDataProps) {
  return (
    <Script id={id} type="application/ld+json" strategy="beforeInteractive">
      {JSON.stringify(data)}
    </Script>
  );
}
