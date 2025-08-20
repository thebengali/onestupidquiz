export default function Footer() {
  return (
    <footer className="footer">
      <div className="container small">
        © {new Date().getFullYear()} Sanjay Mahendrakumar Mukherjee. All rights reserved.{" "}
        <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>
      </div>
    </footer>
  );
}
