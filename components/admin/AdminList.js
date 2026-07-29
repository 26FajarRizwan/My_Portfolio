export default function AdminList({ items, summary, onEdit, onDelete }) {
  if (items.length === 0) {
    return (
      <p style={{ color: "var(--ink-soft)", fontSize: ".9rem" }}>
        None added yet through the admin panel — the public site is currently showing the starter/fallback data from the code.
      </p>
    );
  }

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((it) => {
        const firstImage = it.thumbnail ? it.thumbnail.split(",")[0].trim() : null;
        return (
          <div
            key={it.id}
            className="tl-card"
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {firstImage && (
                <img
                  src={firstImage}
                  alt=""
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                />
              )}
              <div style={{ fontWeight: 700 }}>{summary(it)}</div>
            </div>
            <div style={{ display: "flex", gap: 16, flexShrink: 0 }}>
              <button
                onClick={() => onEdit(it)}
                style={{ color: "var(--primary)", border: "none", background: "none", cursor: "pointer", fontWeight: 600 }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (confirm("Delete this item permanently?")) onDelete(it.id);
                }}
                style={{ color: "#DC2626", border: "none", background: "none", cursor: "pointer", fontWeight: 600 }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
