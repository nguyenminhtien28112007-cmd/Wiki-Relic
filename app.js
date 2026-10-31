const seed = [
  {
    id: "crimson-carousel",
    name: "Crimson Carousel",
    rarity: "Mythical",
    tier: "VIII",
    keywords: ["Bleed", "Dark"],
    faction: "Bloodfiend-exclusive",
    description: "Một mô hình vòng quay ngựa gỗ thu nhỏ với rèm đỏ thẫm, đường viền vàng xỉn và những con ngựa gỗ kỳ dị.",
    always: "Khi bắt đầu trận: nhận 300 Bloodfeast.\\nBloodfeast nhận từ Bleed tăng gấp đôi.\\nKhi Bloodfiend dùng kỹ năng tiêu thụ Bloodfeast, cuối lượt tấn công tiêu thụ thêm lượng bằng lượng kỹ năng đã tiêu thụ.",
    conditional: "[A Feast for the Family] — Cần ít nhất 2 Bloodfiend đang tham chiến. Khi Bloodfiend gây Bleed, tăng Bloodfeast từ đòn đó thêm 25%.",
    obtain: "Được Papa Quixote tặng",
    upgrade: "Không thể nâng cấp.",
    buy: "",
    sell: "",
    abno: "",
    lore: "“Round and round, the feast goes on.”"
  },
  {
    id: "eternal-banquet",
    name: "The Eternal Banquet",
    rarity: "Pillar",
    tier: "XX",
    keywords: ["Bleed", "Dark"],
    faction: "Bloodfiend-exclusive",
    description: "Một chiếc bàn tiệc thu nhỏ bằng gỗ mun, trang trí đường chạm khắc đỏ thẫm, đĩa bạc và nến đỏ.",
    always: "Khi bắt đầu trận: nhận 500 Bloodfeast.\\nBloodfeast nhận từ Bleed tăng 100%.\\nBloodfiend gây +10% sát thương lên mục tiêu đang có Bleed.",
    conditional: "[A Toast to the Blood] — Cần ít nhất 3 Bloodfiend và 1.500 Bloodfeast. Khi dùng kỹ năng tiêu thụ Bloodfeast: +1 Final Power và +20% sát thương nếu mục tiêu có Bleed.",
    obtain: "Craft từ Crimson Carousel và một Relic Bloodfiend chuyên về Bloodfeast.",
    upgrade: "Không thể nâng cấp.",
    buy: "",
    sell: "",
    abno: "",
    lore: "“A feast without an ending. A family without a grave.”"
  },
  {
    id: "crocodiles-tears",
    name: "Crocodile's Tears",
    rarity: "Legendary",
    tier: "VII",
    keywords: ["Tremor", "Dark"],
    faction: "Không",
    description: "Nước mắt của cá sấu khổng lồ",
    always: "[Bắt đầu trận] Nhận 2 Hard As An Reptile. Nhận thêm 1 nếu máu dưới 10%.",
    conditional: "[Khi đánh dính] Áp 2 Bleed potency và count lên kẻ địch. Nếu kẻ địch có 10 Bleed potency gây (Bleed Potency x Bleed Count) sát thương bóng tối lên kẻ địch (Số Bleed potency được đếm đến 5).\\n[Khi bị dính sát thương] Áp (sát thương nhận / Bleed Potency trên kẻ địch) khiên lên toàn bộ đồng minh; 1 lần mỗi lượt.",
    obtain: "Đánh bại Cá sấu khổng lồ",
    buy: "Không thể mua",
    sell: "2000",
    abno: "Cá sấu khổng lồ",
    lore: "?"
  }
];

const KEY = "relicArchiveMirrorDungeon_v3";
const CROCODILE_MIGRATION_KEY = `${KEY}_crocodilesTears_v1`;
const REMOVED_RELIC_IDS = new Set([
  "unbroken-form",
  "malevolent-shrine",
  "one-with-the-mind",
  "last-audience",
  "unwritten-truth"
]);

let relics;
try {
  relics = JSON.parse(localStorage.getItem(KEY)) || seed.filter(
    (r) => !REMOVED_RELIC_IDS.has(r.id)
  );
} catch (e) {
  relics = seed.filter((r) => !REMOVED_RELIC_IDS.has(r.id));
}

const activeRelics = relics.filter(
  (r) =>
    r.id !== "carousel-figurine" &&
    r.name !== "Carousel Figurine" &&
    !REMOVED_RELIC_IDS.has(r.id)
);

if (activeRelics.length !== relics.length) {
  relics = activeRelics;
  localStorage.setItem(KEY, JSON.stringify(relics));
}

if (!localStorage.getItem(CROCODILE_MIGRATION_KEY)) {
  const crocodileTears = seed.find((r) => r.id === "crocodiles-tears");
  if (crocodileTears && !relics.some((r) => r.id === crocodileTears.id)) {
    relics.push({ ...crocodileTears, keywords: [...crocodileTears.keywords] });
    localStorage.setItem(KEY, JSON.stringify(relics));
  }
  localStorage.setItem(CROCODILE_MIGRATION_KEY, "true");
}

function removeObsoleteFields(items) {
  let changed = false;
  for (const r of items) {
    for (const field of ["floor", "unique", "uniquePlusPlus", "icon"]) {
      if (Object.hasOwn(r, field)) {
        delete r[field];
        changed = true;
      }
    }
  }
  return changed;
}

if (removeObsoleteFields(relics)) {
  localStorage.setItem(KEY, JSON.stringify(relics));
}

for (const r of relics) {
  if (r.id === "crimson-carousel" && !r.image) {
    r.image = "assets/crimson-carousel.png";
  }
  if (r.id === "eternal-banquet" && !r.image) {
    r.image = "assets/eternal-banquet.png";
  }
  if (r.id === "crocodiles-tears" && !r.image) {
    r.image = "assets/crocodile's-tears.png";
  }
}

const upgradeProfiles = {
  "eternal-banquet": {
    upgradable: true,
    upgradePlus: "Nhận 650 Bloodfeast khi bắt đầu trận; Bloodfiend gây +15% sát thương lên mục tiêu có Bleed.",
    upgradePlusPlus: "Nhận 800 Bloodfeast khi bắt đầu trận; hiệu ứng tăng Bloodfeast từ Bleed được nâng lên 150%.",
    craftsFrom: ["Crimson Carousel"]
  }
};

for (const r of relics) {
  const profile = upgradeProfiles[r.id] || {};
  for (const [key, value] of Object.entries(profile)) {
    if (r[key] === undefined) {
      r[key] = value;
    }
  }
  if (!Array.isArray(r.craftsFrom)) {
    r.craftsFrom = [];
  }
  if (r.upgradable === undefined) {
    r.upgradable = false;
  }
}

let selected = relics[0]?.id || null;
let activeKeyword = "";
let upgradeLevel = 0;
let collapsed = {};
let selectedCharacter = null;
let activeView = "relicPage";

const characters = [
  "Tuấn Hưng đẹp trai",
  "BII",
  "Matsumu Kouru",
  "Rô bót",
  "Instant Death",
  "Hân Đẹp Trai"
];
const characterFields = [
  ["Giới tính", "gender"],
  ["Tuổi", "age"],
  ["Thanh máu", "health"],
  ["Sức khoẻ", "physicalHealth"],
  ["Chú lực", "cursedEnergy"],
  ["Tốc độ", "speed"],
  ["Nhạy bén", "agility"],
  ["Trí tuệ", "intelligence"],
  ["Tinh thần", "mentality"],
  ["Độ tin cậy", "reliability"],
  ["Vật dụng mang theo", "items"]
];

const $ = (id) => document.getElementById(id);

const statusIcons = ["🔥", "🩸", "☠️", "🟠", "🪶", "🧊"];
const statusNames = ["Burn", "Bleed", "Poison", "Tremor", "Poise", "Freeze"];
const affinityIcons = ["✦", "🌑", "⚡", "🌪️", "🪨"];
const affinityNames = ["Light", "Dark", "Lightning", "Wind", "Earth"];
const items = [
  {
    name: "lọ vật chất tối",
    type: "Mysterious",
    image: "assets/dark-matter-vile.jpg"
  }
];
let activeItemType = "";
let selectedItemIndex = null;

function esc(s = "") {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      })[c]
  );
}

function roman(t) {
  return (
    {
      I: 1,
      II: 2,
      III: 3,
      IV: 4,
      V: 5,
      VI: 6,
      VII: 7,
      VIII: 8,
      IX: 9,
      X: 10,
      XI: 11,
      XII: 12,
      XIII: 13,
      XIV: 14,
      XV: 15,
      XVI: 16,
      XVII: 17,
      XVIII: 18,
      XIX: 19,
      XX: 20
    }[t] || 0
  );
}

function save() {
  localStorage.setItem(KEY, JSON.stringify(relics));
  render();
}

function marked(s) {
  return esc(String(s || "").replace(/\\n/g, "\n"))
    .split("\n")
    .map((line) =>
      line
        .replace(
          /\b(Hard As An Reptile)\b/g,
          '<button type="button" class="status-effect" aria-label="Xem chi tiết Hard As An Reptile"><span>$1</span><img src="assets/hard-as-an-reptile.png" alt=""></button>'
        )
        .replace(
          /Khi bắt đầu trận/g,
          '<span class="trigger-start">Khi bắt đầu trận</span>'
        )
        .replace(/\[(.*?)\]/g, (match, content) => {
          const triggerClasses = {
            "Bắt đầu trận": "trigger-start",
            "Khi đánh dính": "trigger-hit",
            "Khi bị dính sát thương": "trigger-damaged"
          };
          return `<span class="${triggerClasses[content] || "cond"}">${match}</span>`;
        })
        .replace(
          /\b(Bleed|Poison|Bloodfeast|Hardblood|Blooming Thorn|Bloodied Hand|Blood-tinged Scissorblades|Hardblood Armor|Poise|Burn|Tremor|Freeze|Light|Dark|Lightning|Wind|Earth)\b/g,
          '<span class="tag">$1</span>'
        )
        .replace(
          /\b(La Manchaland)\b/g,
          '<span style="color:#ffbd28;background:#30190c;padding:1px 4px">$1</span>'
        )
    )
    .join("<br>");
}

function matches(r) {
  let q = ($("searchFilter").value + " " + $("searchTrait").value)
    .toLowerCase()
    .trim();
  return (
    (!q || JSON.stringify(r).toLowerCase().includes(q)) &&
    (!activeKeyword || (r.keywords || []).includes(activeKeyword))
  );
}

function renderIcons() {
  const group = (title, icons, names, attribute) =>
    `<div class="filtergroup">
      <div class="filtergroup-title">${title}</div>
      <div class="filtergroup-buttons">
        ${icons
          .map(
            (icon, i) =>
              `<button class="iconbtn ${
                attribute === "key" && activeKeyword === names[i] ? "active" : ""
              }" title="${names[i]}" data-${attribute}="${names[i]}">${icon}</button>`
          )
          .join("")}
      </div>
    </div>`;

  let html = group("Status", statusIcons, statusNames, "key");
  html += group("Affinity", affinityIcons, affinityNames, "key");
  html += group(
    "Damage type",
    ["⛰️", "〰️", "➤", "X"],
    ["Slash", "Pierce", "Blunt", "No filter"],
    "damage"
  );
  $("iconFilters").innerHTML = html;
}

function renderItemTypes() {
  const types = [...new Set(items.map((item) => item.type).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b)
  );
  const filters = ["", ...types];

  $("itemTypeFilters").innerHTML = `
    <div class="filtergroup">
      <div class="filtergroup-title">Item Type</div>
      <div class="filtergroup-buttons">
        ${filters
          .map(
            (type) => `
              <button class="item-type-btn ${
                activeItemType === type ? "active" : ""
              }" type="button" data-item-type="${esc(type)}">
                ${esc(type || "All")}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderItems() {
  const showcase = $("itemShowcase");
  const backButton = $("itemBackBtn");
  const countTitle = $("itemCountTitle");
  const itemList = $("itemList");

  if (selectedItemIndex !== null && items[selectedItemIndex]) {
    const item = items[selectedItemIndex];
    showcase.innerHTML = `
      <div class="leftcol">
        <div class="lefttitle">${esc(item.name || "Unnamed Item")}</div>
        <div class="relicart item-detail-art">
          ${
            item.image
              ? `<img class="bigimage" src="${esc(item.image)}" alt="${esc(item.name)}">`
              : ""
          }
        </div>
        <div class="rarityline">${esc(item.type || "—")}</div>
      </div>
      <div class="item-description">
        <strong>Description</strong>
        <p>${esc(item.description || "Chưa có mô tả.")}</p>
      </div>
    `;
    showcase.classList.remove("hidden");
    backButton.classList.remove("hidden");
    countTitle.classList.add("hidden");
    itemList.classList.add("hidden");
    return;
  }

  showcase.classList.add("hidden");
  showcase.innerHTML = "";
  backButton.classList.add("hidden");
  countTitle.classList.remove("hidden");
  itemList.classList.remove("hidden");

  const query = (
    $("searchItemName").value +
    " " +
    $("searchItemTrait").value
  )
    .toLowerCase()
    .trim();
  const filteredItems = items.filter(
    (item) =>
      (!query || JSON.stringify(item).toLowerCase().includes(query)) &&
      (!activeItemType || item.type === activeItemType)
  );

  $("itemCountTitle").textContent = `Items (${filteredItems.length})`;
  $("itemList").innerHTML = filteredItems.length
    ? filteredItems
        .map(
          (item) => {
            const index = items.indexOf(item);
            return `
            <article class="item-card" data-item-index="${index}" tabindex="0" role="button" aria-label="Xem ${esc(item.name || "Item")}">
              <div class="item-card-art">
                ${
                  item.image
                    ? `<img src="${esc(item.image)}" alt="${esc(item.name)}">`
                    : ""
                }
              </div>
              <h3>${esc(item.name || "Unnamed Item")}</h3>
              <div class="item-card-type">${esc(item.type || "—")}</div>
              <p>${esc(item.description || "")}</p>
            </article>
          `;
          }
        )
        .join("")
    : '<div class="empty item-empty">Chưa có dữ liệu Item.</div>';
}

function renderItemPage() {
  renderItemTypes();
  renderItems();
}

function renderShowcase() {
  let r = relics.find((x) => x.id === selected) || relics[0];
  if (!r) {
    $("showcase").innerHTML = "";
    return;
  }

  let effects = [
    ["Effect", r.always],
    ["Conditional Effect", r.conditional]
  ]
    .filter((x) => x[1])
    .map((x) => `[${x[0]}]\n${x[1]}`)
    .join("\n\n");

  let improvements =
    upgradeLevel === 1
      ? [r.upgradePlus]
      : upgradeLevel === 2
      ? [r.upgradePlus, r.upgradePlusPlus].filter(Boolean)
      : [];

  let craftResults = relics
    .filter((x) =>
      (x.craftsFrom || []).some(
        (name) => name.toLowerCase() === r.name.toLowerCase()
      )
    )
    .map((x) => x.name);

  $("showcase").innerHTML = `
    <div class="leftcol">
      <div class="lefttitle">${esc(r.name)}</div>
      <div class="upgrades">
        ${["Normal", "+", "++"]
          .map(
            (x, i) =>
              `<button class="${upgradeLevel === i ? "active" : ""}" data-up="${i}" ${
                !r.upgradable && i ? "disabled" : ""
              } title="${i ? "Upgrade " + x : "Base effect"}">${x}</button>`
          )
          .join("")}
      </div>
      <div class="relicart">
        ${
          r.image
            ? `<img class="bigimage" src="${esc(r.image)}" alt="${esc(r.name)}">`
            : ""
        }
        <span class="tierbig">${esc(r.tier || "—")}</span>
      </div>
      <div class="rarityline">
        ${esc(r.rarity)} · Tier ${esc(r.tier || "—")}<br>
        ${(r.keywords || []).map(esc).join(" / ") || "No keyword"}
      </div>
      <div class="actions">
        <button class="smallbtn" id="editSelected">Edit</button>
        <button class="smallbtn" id="deleteSelected">Delete</button>
      </div>
    </div>
    <div class="effectbox">${marked(
        [effects, ...improvements]
          .filter(Boolean)
          .join("\n\n") || "No effects recorded."
      )}
      ${
        r.upgradable
          ? ""
          : '<br><br><span class="cond">[This Relic cannot be upgraded]</span>'
      }
    </div>
    <div class="rightbox">
      <div><strong>Description:</strong><br>${marked(r.description || "—")}</div>
      <div style="margin-top:7px">
        <strong>Rarity / Tier:</strong> ${esc(r.rarity || "—")} / ${esc(r.tier || "—")}
      </div>
      <div><strong>Keyword:</strong> ${esc((r.keywords || []).join(" / ") || "—")}</div>
      <div><strong>Faction:</strong> ${esc(r.faction || "—")}</div>
      <div><strong>Way to obtain:</strong> ${marked(r.obtain || "—")}</div>
      <div><strong>Buy:</strong> ${esc(r.buy || "—")}</div>
      <div>
        <strong>Selling price:</strong>
        ${r.sell !== "" && r.sell != null ? esc(r.sell) + " Siq" : "—"}
      </div>
      <div><strong>Abno:</strong> ${esc(r.abno || "—")}</div>
      <div><strong>Lore:</strong> ${marked(r.lore || "—")}</div>
      <div>
        <strong>Craft materials:</strong>
        ${esc((r.craftsFrom || []).join(", ") || "—")}
      </div>
      <div>
        <strong>Used to craft:</strong>
        ${esc(craftResults.join(", ") || "—")}
      </div>
    </div>
  `;

  $("editSelected").onclick = () => openForm(r);
  $("deleteSelected").onclick = () => {
    if (confirm("Xóa " + r.name + "?")) {
      relics = relics.filter((x) => x.id !== r.id);
      selected = relics[0]?.id || null;
      save();
    }
  };
}

function renderGroups() {
  let list = relics
    .filter(matches)
    .sort((a, b) => roman(b.tier) - roman(a.tier) || a.name.localeCompare(b.name));

  $("countTitle").textContent = `Relics (${list.length})`;

  let groups = {};
  for (let r of list) {
    (groups[r.tier || "—"] ??= []).push(r);
  }

  $("groups").innerHTML =
    Object.keys(groups)
      .sort((a, b) => roman(b) - roman(a))
      .map(
        (t) => `
        <section class="tiergroup">
          <div class="tierhead" data-collapse="${esc(t)}">
            <span class="arrow">${collapsed[t] ? "⌄" : "⌃"}</span>
            ${esc(t)} Tier (${groups[t].length})
          </div>
          <div class="gallery ${collapsed[t] ? "hidden" : ""}">
            ${groups[t]
              .map(
                (r) => `
                <div class="gift" data-select="${esc(r.id)}">
                  <div class="giftart ${selected === r.id ? "selected" : ""}">
                    ${
                      r.image
                        ? `<img class="giftimage" src="${esc(r.image)}" alt="${esc(r.name)}">`
                        : ""
                    }
                    <span class="smalltier">${esc(r.tier)}</span>
                  </div>
                  <div class="giftname">${esc(r.name)}</div>
                </div>
              `
              )
              .join("")}
          </div>
        </section>
      `
      )
      .join("") || '<div class="empty">No Relics found.</div>';
}

function render() {
  renderIcons();
  renderShowcase();
  renderGroups();
  $("newBtn").style.display = "inline-block";
}

function renderCharacters() {
  const list = $("characterList");
  const details = $("characterDetails");
  const hasSelectedCharacter = selectedCharacter !== null;
  list.classList.toggle("hidden", hasSelectedCharacter);
  details.classList.toggle("hidden", !hasSelectedCharacter);

  if (!hasSelectedCharacter) {
    list.innerHTML = characters
      .map(
        (name, index) =>
          `<button class="character-button" data-character="${index}">${esc(name)}</button>`
      )
      .join("");
    details.innerHTML = "";
    return;
  }

  const name = characters[selectedCharacter];
  details.innerHTML = `
    <button class="character-close" type="button" aria-label="Đóng thông tin nhân vật">×</button>
    <h3>${esc(name)}</h3>
    <div class="character-stats">
      <div class="character-stat"><strong>Tên:</strong> ${esc(name)}</div>
      ${characterFields
        .map(
          ([label]) =>
            `<div class="character-stat ${
              label === "Vật dụng mang theo" ? "full" : ""
            }"><strong>${label}:</strong> Chưa cập nhật</div>`
        )
        .join("")}
    </div>
  `;
}

function openForm(r = null) {
  $("form").reset();
  $("formTitle").textContent = r ? "Edit Relic" : "Create Relic";
  $("form").dataset.id = r?.id || "";

  let fields = [
    "name",
    "rarity",
    "tier",
    "keywords",
    "image",
    "faction",
    "description",
    "always",
    "conditional",
    "obtain",
    "upgradePlus",
    "upgradePlusPlus",
    "buy",
    "sell",
    "abno",
    "lore"
  ];

  for (let f of fields) {
    let el = $(f);
    if (!el) continue;
    let val = r?.[f];
    if (f === "keywords") val = (val || []).join(", ");
    el.value =
      val ??
      (f === "rarity" ? "Ancient" : f === "tier" ? "IV" : "");
  }

  $("craftsFrom").value = (r?.craftsFrom || []).join(", ");
  $("upgradable").checked = !!r?.upgradable;
  $("modal").classList.add("show");
}

$("form").onsubmit = (e) => {
  e.preventDefault();
  let old = e.target.dataset.id;
  let r = {
    ...(relics.find((x) => x.id === old) || {}),
    id: old || "relic-" + Date.now()
  };

  for (let f of [
    "name",
    "rarity",
    "tier",
    "image",
    "faction",
    "description",
    "always",
    "conditional",
    "obtain",
    "upgradePlus",
    "upgradePlusPlus",
    "buy",
    "sell",
    "abno",
    "lore"
  ]) {
    r[f] = $(f).value.trim();
  }

  r.keywords = $("keywords")
    .value.split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  r.craftsFrom = $("craftsFrom")
    .value.split(",")
    .map((x) => x.trim())
    .filter(Boolean);
  r.upgradable = $("upgradable").checked;

  if (
    !r.upgradable &&
    (r.upgradePlus || r.upgradePlusPlus)
  ) {
    alert("Hãy bật nâng cấp nếu Relic có hiệu ứng + hoặc ++.");
    return;
  }

  let i = relics.findIndex((x) => x.id === old);
  if (i >= 0) {
    relics[i] = r;
  } else {
    relics.push(r);
  }

  selected = r.id;
  upgradeLevel = 0;
  $("modal").classList.remove("show");
  save();
};

$("newBtn").onclick = () => openForm();
$("closeModal").onclick = $("cancelBtn").onclick = () =>
  $("modal").classList.remove("show");

$("searchFilter").oninput = $("searchTrait").oninput = renderGroups;
$("searchItemName").oninput = $("searchItemTrait").oninput = renderItems;

$("itemTypeFilters").onclick = (e) => {
  const button = e.target.closest("[data-item-type]");
  if (!button) return;
  activeItemType = button.dataset.itemType;
  renderItemPage();
};

$("itemList").onclick = (e) => {
  const card = e.target.closest("[data-item-index]");
  if (!card) return;
  selectedItemIndex = Number(card.dataset.itemIndex);
  renderItemPage();
};

$("itemList").onkeydown = (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest("[data-item-index]");
  if (!card) return;
  e.preventDefault();
  selectedItemIndex = Number(card.dataset.itemIndex);
  renderItemPage();
};

$("itemBackBtn").onclick = () => {
  selectedItemIndex = null;
  renderItemPage();
};

$("iconFilters").onclick = (e) => {
  let b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.key !== undefined) {
    activeKeyword = activeKeyword === b.dataset.key ? "" : b.dataset.key;
  } else if (b.dataset.damage !== undefined) {
    activeKeyword = "";
  }
  render();
};

$("groups").onclick = (e) => {
  let c = e.target.closest("[data-select]");
  let h = e.target.closest("[data-collapse]");
  if (c) {
    selected = c.dataset.select;
    upgradeLevel = 0;
    render();
  }
  if (h) {
    let t = h.dataset.collapse;
    collapsed[t] = !collapsed[t];
    renderGroups();
  }
};

const statusEffectModal = $("statusEffectModal");
const statusEffectClose = $("closeStatusEffectModal");

function closeStatusEffectDetails() {
  statusEffectModal.classList.remove("show");
  statusEffectModal.setAttribute("aria-hidden", "true");
}

document.addEventListener("click", (e) => {
  if (e.target.closest(".status-effect")) {
    statusEffectModal.classList.add("show");
    statusEffectModal.setAttribute("aria-hidden", "false");
    statusEffectClose.focus();
    return;
  }

  if (e.target === statusEffectModal) {
    closeStatusEffectDetails();
  }
});

statusEffectClose.onclick = closeStatusEffectDetails;

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && statusEffectModal.classList.contains("show")) {
    closeStatusEffectDetails();
  }
});

$("showcase").onclick = (e) => {
  let b = e.target.closest("[data-up]");
  if (b && !b.disabled) {
    upgradeLevel = +b.dataset.up;
    renderShowcase();
  }
};

$("exportBtn").onclick = () => {
  let a = document.createElement("a");
  a.href = URL.createObjectURL(
    new Blob([JSON.stringify(relics, null, 2)], { type: "application/json" })
  );
  a.download = "relic-archive.json";
  a.click();
  URL.revokeObjectURL(a.href);
};

$("importBtn").onclick = () => $("importFile").click();

$("importFile").onchange = async (e) => {
  try {
    let d = JSON.parse(await e.target.files[0].text());
    if (Array.isArray(d) && confirm("Thay thế toàn bộ Relic archive bằng file này?")) {
    relics = d.filter((r) => !REMOVED_RELIC_IDS.has(r.id));
    removeObsoleteFields(relics);
    selected = relics[0]?.id || null;
    save();
    } else if (!Array.isArray(d)) {
      throw 0;
    }
  } catch (err) {
    alert("JSON không hợp lệ.");
  }
  e.target.value = "";
};

document.querySelector(".tabs").onclick = (e) => {
  const tab = e.target.closest("[data-view]");
  if (!tab) return;

  activeView = tab.dataset.view;
  document.querySelectorAll(".tabs .tab").forEach((item) => {
    item.classList.toggle("active", item === tab);
  });
  document.querySelectorAll("main > section[id]").forEach((section) => {
    section.classList.toggle("hidden", section.id !== activeView);
  });
  if (activeView === "characterPage") renderCharacters();
};

$("characterList").onclick = (e) => {
  const button = e.target.closest("[data-character]");
  if (!button) return;
  selectedCharacter = Number(button.dataset.character);
  renderCharacters();
};

$("characterDetails").onclick = (e) => {
  if (!e.target.closest(".character-close")) return;
  selectedCharacter = null;
  renderCharacters();
};

render();
renderItemPage();
