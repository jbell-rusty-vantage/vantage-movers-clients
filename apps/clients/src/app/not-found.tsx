import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="statepage">
      <h1>Page not found</h1>
      <p>The page you&apos;re looking for doesn&apos;t exist or may have moved.</p>
      <div className="statepage__actions">
        <Button href="/">Back to home</Button>
      </div>
    </div>
  );
}
