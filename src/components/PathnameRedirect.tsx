import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { useEffect } from "react";

/**
 * Docusaurus の管理外にある静的ページ (例: /aov/) へ移動する
 *
 * jaTo を指定すると、日本語ロケールではそちらへ移動する。
 */
export default function PathnameRedirect({
  to,
  jaTo,
}: {
  to: string;
  jaTo?: string;
}) {
  const { i18n } = useDocusaurusContext();
  const target = i18n.currentLocale === "ja" && jaTo ? jaTo : to;
  useEffect(() => {
    // NOTE: jaTo はこのスタブ自身の URL で、本番では copy-opf.mjs が静的ページで上書きしている。
    // クライアント側遷移で来たときは再読み込みで静的ページを取得する。直接読み込んでもスタブだった
    // (開発サーバーなど) ときに移動すると再読み込みが続くので、移動しない。
    const [navigation] = performance.getEntriesByType("navigation");
    if (
      target === window.location.pathname &&
      navigation &&
      new URL(navigation.name).pathname === target
    ) {
      return;
    }
    window.location.replace(target);
  }, [target]);
  return null;
}
