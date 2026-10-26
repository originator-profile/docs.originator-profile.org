import { useEffect } from "react";

/** Docusaurus の管理外にある静的ページ (例: /aov/) へ移動する */
export default function PathnameRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.replace(to);
  }, [to]);
  return null;
}
