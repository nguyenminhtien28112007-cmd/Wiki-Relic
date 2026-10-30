const seed = [
  {
    id: "unbroken-form",
    name: "The Unbroken Form",
    rarity: "Ancient",
    tier: "IV",
    icon: "🗡️",
    keywords: ["Poise"],
    faction: "",
    description: "Một thanh kiếm gỗ cũ kỹ, không hoa văn trang trí. Càng tập trung vào chuyển động, thanh kiếm càng nhẹ nhàng và chính xác.",
    always: "+10% Poise Power.\\nĐòn đánh chính xác nhận +5% Critical Chance.",
    conditional: "[Perfect Alignment] — Sau 3 đòn đánh liên tiếp không hụt và không bị gián đoạn, đòn kế tiếp nhận +20% Critical Chance. Đánh hụt hoặc bị gián đoạn sẽ đặt lại bộ đếm.",
    unique: "",
    obtain: "Có tỷ lệ xuất hiện sau thử thách đòi hỏi độ chính xác.",
    upgrade: "",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: "“A blade does not need to be sharp to cut.”"
  },
  {
    id: "unwritten-truth",
    name: "The Unwritten Truth",
    rarity: "Ancient",
    tier: "IV",
    icon: "📖",
    keywords: ["Poise", "Light"],
    faction: "",
    description: "Một cuốn sách cũ kỹ với bìa da bong tróc, trang giấy ố vàng và những trang trắng tự viết lại sau mỗi trận chiến.",
    always: "Mỗi lượt, đòn đánh đầu tiên gây thêm 1 Poise Count.\\nKhi đồng minh có Poise đánh trúng, hồi 2 SP.",
    conditional: "[Read Between the Lines] — Cần ít nhất 5 Poise. Kỹ năng tiếp theo nhận +1 Final Power.",
    unique: "",
    obtain: "Thưởng từ sự kiện khám phá thư viện cổ.",
    upgrade: "",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: "Sự thật không được viết ra vẫn có thể được nhìn thấy."
  },
  {
    id: "one-with-the-mind",
    name: "One With The Mind",
    rarity: "Mythical",
    tier: "VIII",
    icon: "🧠",
    keywords: ["Poise", "Light"],
    faction: "Crafted Relic",
    description: "Relic kết hợp giữa The Unbroken Form và The Unwritten Truth, đại diện cho sự thống nhất giữa hành động và nhận thức.",
    always: "+10% Poise Power.\\nKhi đánh chính xác, nhận 1 [Clarity], tối đa 3.",
    conditional: "[Unified Focus] — Cần 3 [Clarity]. Đòn tiếp theo nhận +20% Critical Chance; sau khi kích hoạt, đặt lại Clarity.",
    unique: "[Mind and Motion] — Đòn chí mạng tiêu thụ 1 Clarity để gây thêm 15% sát thương.",
    obtain: "Craft từ The Unbroken Form và The Unwritten Truth.",
    upgrade: "",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: "Hành động và nhận thức không còn đối lập."
  },
  {
    id: "last-audience",
    name: "The Last Audience",
    rarity: "Mythical",
    tier: "VIII",
    icon: "🎭",
    keywords: ["Poise", "Dark"],
    faction: "",
    description: "Một chiếc mặt nạ sân khấu màu trắng ngà, với những vết nứt và nụ cười hoàn hảo đến đáng sợ.",
    always: "+15% Critical Chance.\\n+10% Poise Power.\\nĐòn chí mạng cho 1 cộng dồn [Applause], mỗi cộng dồn tăng 2% Critical Damage, tối đa 5.",
    conditional: "[Flawless Performance] — Sau 3 đòn liên tiếp không hụt và không bị gián đoạn, đòn kế tiếp nhận +20% Critical Chance.",
    unique: "[The Audience Is Silent] — Khi đạt 5 [Applause], đòn chí mạng kế tiếp tiêu thụ toàn bộ cộng dồn để nhận +30% Critical Damage.",
    obtain: "Có tỷ lệ xuất hiện khi hoàn thành trận chiến mà không nhận sát thương.",
    upgrade: "Không thể nâng cấp.",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: ""
  },
  {
    id: "crimson-carousel",
    name: "Crimson Carousel",
    rarity: "Mythical",
    tier: "VIII",
    icon: "🎠",
    keywords: ["Bleed", "Dark"],
    faction: "Bloodfiend-exclusive",
    description: "Một mô hình vòng quay ngựa gỗ thu nhỏ với rèm đỏ thẫm, đường viền vàng xỉn và những con ngựa gỗ kỳ dị.",
    always: "Khi bắt đầu trận: nhận 300 Bloodfeast.\\nBloodfeast nhận từ Bleed tăng gấp đôi.\\nKhi Bloodfiend dùng kỹ năng tiêu thụ Bloodfeast, cuối lượt tấn công tiêu thụ thêm lượng bằng lượng kỹ năng đã tiêu thụ.",
    conditional: "[A Feast for the Family] — Cần ít nhất 2 Bloodfiend đang tham chiến. Khi Bloodfiend gây Bleed, tăng Bloodfeast từ đòn đó thêm 25%.",
    unique: "[The Carousel's Chosen] \n Cần ít nhất 3 Bloodfiend và 1.000 Bloodfeast. Khi dùng kỹ năng tiêu thụ Bloodfeast: +1 Final Power và +15% sát thương nếu mục tiêu có Bleed.",
    obtain: "Có tỷ lệ xuất hiện khi đánh bại Bloodfiend Boss.",
    upgrade: "Không thể nâng cấp.",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: "“Round and round, the feast goes on.”"
  },
  {
    id: "eternal-banquet",
    name: "The Eternal Banquet",
    rarity: "Pillar",
    tier: "XX",
    icon: "🕯️",
    keywords: ["Bleed", "Dark"],
    faction: "Bloodfiend-exclusive",
    description: "Một chiếc bàn tiệc thu nhỏ bằng gỗ mun, trang trí đường chạm khắc đỏ thẫm, đĩa bạc và nến đỏ.",
    always: "Khi bắt đầu trận: nhận 500 Bloodfeast.\\nBloodfeast nhận từ Bleed tăng 100%.\\nBloodfiend gây +10% sát thương lên mục tiêu đang có Bleed.",
    conditional: "[A Toast to the Blood] — Cần ít nhất 3 Bloodfiend và 1.500 Bloodfeast. Khi dùng kỹ năng tiêu thụ Bloodfeast: +1 Final Power và +20% sát thương nếu mục tiêu có Bleed.",
    unique: "[The Feast That Never Ends] — Cần ít nhất 3 Bloodfiend và 2.000 Bloodfeast để kích hoạt [Grand Banquet]. Khi hoạt động, kỹ năng tiêu thụ ít nhất 300 Bloodfeast nhận +30% Critical Damage và thêm +15% sát thương nếu mục tiêu có Bleed.",
    obtain: "Craft từ Crimson Carousel và một Relic Bloodfiend chuyên về Bloodfeast.",
    upgrade: "Không thể nâng cấp.",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: "“A feast without an ending. A family without a grave.”"
  },
  {
    id: "malevolent-shrine",
    name: "Malevolent Shrine",
    rarity: "Mythic",
    tier: "XII",
    icon: "⛩️",
    keywords: ["Bleed", "Dark"],
    faction: "Ryomen Sukuna-exclusive",
    description: "Một mảnh cổng đền thờ cổ phủ máu khô và những đường vân đen đỏ. Khi kích hoạt, không gian dường như bị chia cắt bởi những đường chém vô hình.",
    always: "[The Disgraced] — +15% Critical Chance; +20% sát thương lên mục tiêu có Bleed. Gây sát thương lên mục tiêu có Bleed nhận 1 [Dismantle], tối đa 5.\\n[Cleave] — Tấn công mục tiêu có Bleed nhận +10% Critical Damage.",
    conditional: "[The King of Curses] — Sau khi gây Bleed lên ít nhất 3 mục tiêu: kỹ năng tiếp theo +1 Final Power và +20% sát thương lên mục tiêu có Bleed.",
    unique: "[Malevolent Shrine: Open] — Cần ít nhất 3 [Dismantle] và 2 mục tiêu có Bleed. Kích hoạt trong một lượt, tăng sát thương lên mục tiêu có Bleed; cuối trạng thái tiêu thụ Dismantle để gây thêm sát thương.",
    obtain: "Chỉ nhận khi sử dụng Ryomen Sukuna và hoàn thành thử thách [The King Above All].",
    upgrade: "Không thể nâng cấp.",
    buy: "",
    sell: "",
    floor: "",
    abno: "",
    lore: ""
  }
];

const KEY = "relicArchiveMirrorDungeon_v3";

let relics;
try {
  relics = JSON.parse(localStorage.getItem(KEY)) || seed;
} catch (e) {
  relics = seed;
}

const activeRelics = relics.filter(
  (r) => r.id !== "carousel-figurine" && r.name !== "Carousel Figurine"
);

if (activeRelics.length !== relics.length) {
  relics = activeRelics;
  localStorage.setItem(KEY, JSON.stringify(relics));
}

for (const r of relics) {
  if (r.id === "crimson-carousel" && !r.image) {
    r.image = "assets/crimson-carousel.png";
  }
  if (r.id === "eternal-banquet" && !r.image) {
    r.image = "assets/eternal-banquet.png";
  }
}

const upgradeProfiles = {
  "unbroken-form": {
    upgradable: true,
    upgradePlus: "+15% Poise Power; đòn đánh chính xác nhận +8% Critical Chance.",
    upgradePlusPlus: "+20% Poise Power; đòn đánh chính xác nhận +12% Critical Chance."
  },
  "one-with-the-mind": {
    upgradable: true,
    upgradePlus: "Poise Power tăng lên +15%; mỗi cộng dồn Clarity tăng thêm +2% Critical Chance.",
    upgradePlusPlus: "Poise Power tăng lên +20%; mỗi cộng dồn Clarity tăng thêm +3% Critical Chance.",
    uniquePlusPlus: "[Perfect Understanding] — Khi có 3 Clarity, đòn chí mạng gây thêm 30% sát thương và không tiêu thụ Clarity.",
    craftsFrom: ["The Unbroken Form", "The Unwritten Truth"]
  },
  "last-audience": {
    upgradable: true,
    upgradePlus: "+20% Critical Chance; mỗi Applause tăng 3% Critical Damage.",
    upgradePlusPlus: "+25% Critical Chance; mỗi Applause tăng 4% Critical Damage.",
    uniquePlusPlus: "[Standing Ovation] — Khi đạt 5 Applause, đòn chí mạng kế tiếp nhận +50% Critical Damage và không tiêu thụ cộng dồn."
  },
  "eternal-banquet": {
    upgradable: true,
    upgradePlus: "Nhận 650 Bloodfeast khi bắt đầu trận; Bloodfiend gây +15% sát thương lên mục tiêu có Bleed.",
    upgradePlusPlus: "Nhận 800 Bloodfeast khi bắt đầu trận; hiệu ứng tăng Bloodfeast từ Bleed được nâng lên 150%.",
    uniquePlusPlus: "[The Feast Without End] — Cần 3 Bloodfiend và 2.500 Bloodfeast. Grand Banquet tăng sát thương thêm 25% và không tiêu thụ Bloodfeast trong lượt kích hoạt.",
    craftsFrom: ["Crimson Carousel"]
  },
  "malevolent-shrine": {
    upgradable: true,
    upgradePlus: "+20% Critical Chance và +25% sát thương lên mục tiêu có Bleed.",
    upgradePlusPlus: "Tối đa 7 Dismantle; các đòn đánh lên mục tiêu có Bleed gây thêm 15% sát thương.",
    uniquePlusPlus: "[Malevolent Shrine: Open] — Khi kích hoạt, gây thêm sát thương lên mọi mục tiêu có Bleed và tiêu thụ toàn bộ Dismantle."
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

const oldTruth = relics.find((r) => r.id === "unwritten-truth");
if (oldTruth?.always?.startsWith("Chưa xác định")) {
  oldTruth.always =
    "Mỗi lượt, đòn đánh đầu tiên gây thêm 1 Poise Count.\\nKhi đồng minh có Poise đánh trúng, hồi 2 SP.";
  oldTruth.conditional =
    "[Read Between the Lines] — Cần ít nhất 5 Poise. Kỹ năng tiếp theo nhận +1 Final Power.";
  oldTruth.obtain = "Thưởng từ sự kiện khám phá thư viện cổ.";
}

const oldMind = relics.find((r) => r.id === "one-with-the-mind");
if (oldMind?.always === "Chưa thiết kế.") {
  oldMind.always =
    "+10% Poise Power.\\nKhi đánh chính xác, nhận 1 [Clarity], tối đa 3.";
  oldMind.conditional =
    "[Unified Focus] — Cần 3 [Clarity]. Đòn tiếp theo nhận +20% Critical Chance; sau khi kích hoạt, đặt lại Clarity.";
  oldMind.unique =
    "[Mind and Motion] — Đòn chí mạng tiêu thụ 1 Clarity để gây thêm 15% sát thương.";
  oldMind.obtain = "Craft từ The Unbroken Form và The Unwritten Truth.";
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

function rank(r) {
  return (
    {
      Common: 1,
      Uncommon: 2,
      Rare: 3,
      Epic: 4,
      Ancient: 5,
      Mythical: 6,
      Mythic: 7,
      Pillar: 8
    }[r] || 0
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
        .replace(/\[(.*?)\]/g, '<span class="cond">[$1]</span>')
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

function renderShowcase() {
  let r = relics.find((x) => x.id === selected) || relics[0];
  if (!r) {
    $("showcase").innerHTML = "";
    return;
  }

  let effects = [
    ["Effect", r.always],
    ["Conditional Effect", r.conditional],
    ["Unique Effect", r.unique]
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

  let uniqueUpgrade =
    upgradeLevel === 2 && rank(r.rarity) >= 6 && r.uniquePlusPlus
      ? [`[Unique Effect]\n${r.uniquePlusPlus}`]
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
      <div class="relicart">
        ${
          r.image
            ? `<img class="bigimage" src="${esc(r.image)}" alt="${esc(r.name)}">`
            : `<span class="bigicon">${esc(r.icon || "✦")}</span>`
        }
        <span class="tierbig">${esc(r.tier || "—")}</span>
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
        [effects, ...improvements, ...uniqueUpgrade]
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
      <div><strong>Way to obtain:</strong> ${marked(r.obtain || "—")}</div>
      <div>
        <strong>Selling price:</strong>
        ${r.sell !== "" && r.sell != null ? esc(r.sell) + " siq" : "—"}
      </div>
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
                        : `<span class="emoji">${esc(r.icon || "✦")}</span>`
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
    "unique",
    "obtain",
    "upgradePlus",
    "upgradePlusPlus",
    "uniquePlusPlus",
    "buy",
    "sell",
    "floor",
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
    "unique",
    "obtain",
    "upgradePlus",
    "upgradePlusPlus",
    "uniquePlusPlus",
    "buy",
    "sell",
    "floor",
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

  if (r.uniquePlusPlus && rank(r.rarity) < 6) {
    alert("Unique Effect ở ++ chỉ dành cho Relic từ Mythic trở lên.");
    return;
  }

  if (
    !r.upgradable &&
    (r.upgradePlus || r.upgradePlusPlus || r.uniquePlusPlus)
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
      relics = d;
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
  $("relicPage").classList.toggle("hidden", activeView !== "relicPage");
  $("characterPage").classList.toggle("hidden", activeView !== "characterPage");
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
