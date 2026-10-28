export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-xl rounded-lg border border-border bg-card p-10 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground text-xl font-bold">
          ✓
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-card-foreground sm:text-4xl">
          Projeto pronto
        </h1>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          A base do projeto foi criada com Vite, React, TypeScript e Tailwind.
          A partir daqui já dá para começar a montar as telas.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="rounded-sm bg-muted px-3 py-1">React</span>
          <span className="rounded-sm bg-muted px-3 py-1">TypeScript</span>
          <span className="rounded-sm bg-muted px-3 py-1">Tailwind</span>
        </div>
      </div>
    </div>
  );
}
