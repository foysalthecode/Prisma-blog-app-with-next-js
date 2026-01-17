export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1>This is contant layout</h1>
      {children}
    </div>
  );
}
