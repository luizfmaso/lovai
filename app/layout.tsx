export const metadata = {
  title: "Consultoria IA — Site Inteligente",
  description: "Site moderno com IA conversacional reativa."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
