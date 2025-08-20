export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">Terms of Use</h1>
      <p className="mb-4">
        Welcome to <strong>onestupidquiz</strong>. This site and app are provided
        “as-is” for personal entertainment and fun. By using this site, you agree
        to the following terms:
      </p>
      <ul className="list-disc ml-6 space-y-2 mb-6">
        <li>This quiz is satirical and not meant to be taken seriously.</li>
        <li>No disrespect is intended toward individuals, groups, or institutions.</li>
        <li>We provide no guarantees of accuracy, correctness, or completeness.</li>
        <li>We are not liable for any outcomes, damages, or interpretations of the content.</li>
        <li>Use of the site implies acceptance of these terms.</li>
      </ul>
      <p>
        If you do not agree with these terms, please discontinue use of the site.
      </p>
    </div>
  );
}
