import React from "react";
import OriginalDocSidebarItem from "@theme-original/DocSidebarItem";
import DeprecatedIcon from "@site/src/components/icons/DeprecatedIcon";

export default function DocSidebarItem(props) {
  const item = props.item;
  let label = item.label;

  if (typeof label === "string" && label.includes("[DEPRECATED]")) {
    const clean = label.replace("[DEPRECATED]", "").trim();

    label = (
      <span
        style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
      >
        {clean}
        <DeprecatedIcon style={{ opacity: 0.6 }} />
      </span>
    );
  }

  return <OriginalDocSidebarItem {...props} item={{ ...item, label }} />;
}
