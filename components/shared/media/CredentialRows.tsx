import { CredentialHighlights } from "@/components/shared/media/CredentialHighlights";
import { CredentialLists } from "@/components/shared/media/CredentialLists";

// The three short rows under Mukta's story: highlights, featured in, spoken at (brief §5.2).
// About places the two parts apart; /media shows them together.
export function CredentialRows() {
  return (
    <div className="grid gap-8">
      <CredentialHighlights />
      <CredentialLists />
    </div>
  );
}
