import type { Options } from "@docusaurus/plugin-content-docs";

type SidebarItemsGenerator = NonNullable<Options["sidebarItemsGenerator"]>;
type SidebarItem = Awaited<ReturnType<SidebarItemsGenerator>>[number];

/** ドキュメント ID の末尾 (例: "releases/v0.2.0-beta.2") からバージョンを取り出す */
function parseVersion(id: string) {
  const match = /v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/.exec(id);
  if (!match) return undefined;
  const [, major, minor, patch, prerelease] = match;
  return {
    core: [major, minor, patch].map(Number),
    prerelease: prerelease?.split(".") ?? [],
  };
}

/** Semantic Versioning の優先順位に従って比較する */
function compareVersions(a: string, b: string): number {
  const va = parseVersion(a);
  const vb = parseVersion(b);
  // バージョンとして解釈できないものは最も新しいものとして扱う (降順で先頭に並ぶ)
  if (!va || !vb) return Number(!va) - Number(!vb);
  for (let i = 0; i < 3; i++) {
    if (va.core[i] !== vb.core[i]) return va.core[i] - vb.core[i];
  }
  // プレリリースを含まないほうが新しい
  if (va.prerelease.length === 0 || vb.prerelease.length === 0) {
    return vb.prerelease.length - va.prerelease.length;
  }
  for (
    let i = 0;
    i < Math.max(va.prerelease.length, vb.prerelease.length);
    i++
  ) {
    const pa = va.prerelease[i];
    const pb = vb.prerelease[i];
    if (pa === undefined) return -1;
    if (pb === undefined) return 1;
    if (pa === pb) continue;
    const na = /^\d+$/.test(pa);
    const nb = /^\d+$/.test(pb);
    if (na && nb) return Number(pa) - Number(pb);
    if (na !== nb) return na ? -1 : 1;
    return pa < pb ? -1 : 1;
  }
  return 0;
}

function sortItems(items: SidebarItem[]): SidebarItem[] {
  return items.map((item) => {
    if (item.type !== "category") return item;
    const children = sortItems(item.items);
    if (item.customProps?.sortOrder !== "version-desc") {
      return { ...item, items: children };
    }
    const id = (child: SidebarItem) => ("id" in child ? child.id : "");
    return {
      ...item,
      items: children.toSorted((a, b) => compareVersions(id(b), id(a))),
    };
  });
}

/**
 * _category_.yml で `customProps.sortOrder: version-desc` を指定したカテゴリ配下を
 * バージョンの新しい順に並べる
 */
export const sidebarItemsGenerator: SidebarItemsGenerator = async ({
  defaultSidebarItemsGenerator,
  ...args
}) => sortItems(await defaultSidebarItemsGenerator(args));
