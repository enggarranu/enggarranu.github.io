import Container from "@/components/Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <Container className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div className="text-sm text-white/60">© {new Date().getFullYear()} Enggar</div>
        <div className="text-sm text-white/45">Built with React</div>
      </Container>
    </footer>
  );
}
