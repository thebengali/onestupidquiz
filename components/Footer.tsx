export default function Footer() {
  return (
    <footer style={{ textAlign: "center", padding: "1rem", fontSize: "0.9rem", color: "#666" }}>
      <p>© {new Date().getFullYear()} Sanjay Mahendrakumar Mukherjee. All rights reserved. <a href="/terms">Terms</a></p>
    </footer>
  );
}
