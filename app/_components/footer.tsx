"use client";

export function Footer() {
  return (
    <footer className="flex justify-between gap-2 border-t border-border  items-center py-4 px-5 lg:px-32">
      <div className="flex items-center gap-2">
        <h1>Desenvolvido por</h1>{" "}
        <a
          href="https://github.com/rogervalentim/"
          target="_blank"
          className="underline"
        >
          Roger Valentim
        </a>
      </div>
    </footer>
  );
}
