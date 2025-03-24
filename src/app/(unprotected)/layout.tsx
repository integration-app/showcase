export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 ">
      <div className="absolute -z-10 inset-0 h-full w-full
      bg-[linear-gradient(to_right,#73737320_1px,transparent_1px),linear-gradient(to_bottom,#73737320_1px,transparent_1px)]
      bg-[size:20px_20px]
      [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_0%,transparent_100%)]"/>
      {children}
    </main>
  );
}
