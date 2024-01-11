export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container min-h-screen grid place-content-center">
      {children}
    </div>
  );
}
