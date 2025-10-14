export default async function ProjectLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <main className="">
        {children}
      </main>
  );
}
