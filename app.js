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
    always: "[Bắt đầu trận] Nhận 2 Hard As An Reptile. Nhận thêm 1 nếu máu dưới 10%",
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
    r.image = "assets/crocodiles-tears.png";
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
let selectedPet = 0;
let selectedPetInfoTab = "general";
let selectedPetSkill = 0;
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
const pets = ["Leviathan", "Jörmungandr"];
const petProfiles = {
  Leviathan: {
    epithet: "Tyrant of the Origin Sea",
    image: "assets/leviathan.png",
    description:
      "Quái vật biển khổng lồ trong thần thoại cổ đại, được xem là hiện thân của đại dương sâu thẳm và sự hủy diệt vô tận, sở hữu sức mạnh điều khiển sóng thần, vực nước và nỗi sợ của biển cả.",
    sections: [
      {
        title: "Thông tin cơ bản",
        content: `Tên: Leviathan / La'r Ayau de Levi
Giới tính: Cái
Loài: Leviathan / Sea Dragon / Primordial Dragon
Biệt danh: Tyrant of the Origin Sea
Thần tính: Force of Envy
Thần lõi: Prince of Envy, Primordial Serpent
Nơi sinh: Biển Nguyên Thể (Origin Sea)`
      },
      {
        title: "Các thể phát triển",
        content: `Thể 1 — Dạng trứng (1 ngày đến 2 tháng tuổi)
Tuổi: 1 ngày – 2 tháng | Cân nặng: 100 tấn | Kích thước: 50 m²

Thể 2 — Dạng em bé (2 tháng đến 1.000 tuổi)
Tuổi: 2 tháng – 1.000 tuổi | Cân nặng: 10.000 tấn | Kích thước: 6.000 km²

Thể 3 — Dạng niên thiếu (1.000 đến 2.000.000 tuổi)
Tuổi: 1.000 – 2.000.000 tuổi | Cân nặng: 200.000 tấn | Kích thước: 10.000 km²

Thể 4 — Trưởng thành (2.000.000 tuổi đến khi chết)
Tuổi: 2.000.000 tuổi trở lên | Cân nặng: 200.000.000 tấn – vô hạn | Kích thước: 40.075 km²`
      },
      {
        title: "Thông tin chiến đấu",
        content: `Dạng Baby — Level 1
❤️ Máu: 10.000 | 💪 Sức mạnh: 6.000 | 🛡️ Phòng thủ: 17.000

Dạng niên thiếu — Level 40
❤️ Máu: 15.000 | 💪 Sức mạnh: 8.000 | 🛡️ Phòng thủ: 20.000

Dạng trưởng thành — Level 100
❤️ Máu: 20.000 | 💪 Sức mạnh: 10.000 | 🛡️ Phòng thủ: 25.000`
      },
      {
        title: "Nội tại — Envious Adapting",
        content: `Nội tại được cường hóa theo số kẻ địch nhiều hơn 1; tối đa 9 kẻ địch.
Khi tấn công 1/2/3 lần trong một lượt, nhận lần lượt 1/2/3 stack [Envious Adapting].
Khi gây sát thương, sao chép 5% chỉ số của toàn bộ kẻ địch trên sân trong phần còn lại của trận (mỗi trận một lần). Tỉ lệ sao chép tăng lên 7%/9%/11% khi có 3/6/9 kẻ địch trên sân.
Nếu chủ nhân nhận sát thương vượt quá 50% máu tối đa của bản thân, tiêu hao 1 stack [Envious Adapting] của Leviathan và nhận [Scales Serpent].`
      },
      {
        title: "Nội tại — Hate, Hate, Hate, HATE...!!!",
        content: `Nếu có boss phụ hoặc boss chính trên sân, Leviathan nhận thêm 3 stack [Hatred] cho mỗi boss; tối đa cộng thêm 15 stack.
Khi tiêu diệt kẻ địch, áp [Drowning Abyss] lên toàn bộ kẻ địch trên sân.
Khi kẻ địch có [Drowning Abyss], Leviathan gây thêm sát thương chuẩn bằng 10% sức mạnh của bản thân.
Cuối mỗi lượt, ngẫu nhiên nhận một hiệu ứng chưa nhận: Protection, Damage Up, Speed Up, Defense Up hoặc Increase Health Maximum. Nhận tối đa 3 hiệu ứng ngẫu nhiên.`
      },
      {
        title: "Nội tại — Last of Its Kind",
        content: `Nội tại được cường hóa theo mỗi stack [Till They All Buried In Hell!!!], tối đa 6 stack.
Khi có [Till They All Buried In Hell!!!], nhận khiên bằng 20% máu bản thân cho mỗi 2 stack [Hell Fire], tối đa 60% máu (tối đa 6 potency [Hell Fire]).
Với mỗi 2 stack [Till They All Buried In Hell!!!], chuyển 50% máu bản thân thành sức mạnh mỗi lần sử dụng kỹ năng.
Với mỗi stack [Till They All Buried In Hell!!!], máu tăng 5%.
Nếu có [Hell Fire], giảm Defense của bản thân một lượng bằng (phần trăm khiên nhận được / số potency [Hell Fire] trên bản thân)% để nhận ít hơn 50% sát thương từ mọi nguồn.
Nếu có 6 stack [Till They All Buried In Hell!!!], chuyển kỹ năng đơn mục tiêu thành kỹ năng đánh toàn bộ mục tiêu trên sân; hiệu ứng này sử dụng một lần mỗi 4 lượt.
Nhận thêm 20% sát thương từ vũ khí có thuộc tính Thần.`
      },
      {
        title: "Kỹ năng S1 — Oceanic Collapse",
        content: `Mục tiêu: 1 | Sát thương: 20% sức mạnh bản thân

Khi sử dụng:
• Nhận [Poise] 10 potency và 5 count.
• Nếu gây sát thương chí mạng, lần sử dụng kế tiếp gây thêm 100% sát thương.

Khi đánh trúng:
• Áp [Bleeding Hemorrhage] 2 potency và 1 count.
• Nhận 1 Fragile.
• Nhận 10 stack [Hatred].
• Nhận 1 stack [Till They All Buried In Hell!!!].`
      },
      {
        title: "Kỹ năng S1-1 — Crushing Tide (Follow Up Attack)",
        content: `Mục tiêu: 3 | Sát thương: 5% sức mạnh bản thân

Trước khi tấn công:
• Nhận 5 stack [Water Damage Up].
• Nếu bản thân có trên 5 Fragile, số mục tiêu tăng lên 5.
• Nếu đòn này không được thực hiện, Leviathan nhận 2 stack Damage Up.

Khi sử dụng:
• Nếu gây sát thương chí mạng, sử dụng lại kỹ năng này thêm 1 lần.

Khi đánh trúng:
• Áp [Water Weakness].
• Áp [Tremor] 2 potency và 2 count.
• Chuyển [Tremor] 2 potency và 2 count thành [Abyssal Echoes].`
      },
      {
        title: "Kỹ năng S2 — Jaw of the Deep Abyss",
        content: `Mục tiêu: 2 | Sát thương: 35% sức mạnh bản thân

Khi sử dụng:
• Tiêu hao tối đa 25 stack [Hatred]. Mỗi stack tiêu hao tăng 2% sát thương, tối đa 50%.
• Với mỗi 5 stack [Hatred] tiêu hao, nhận 1 [Blind Obsession], tối đa 5 stack nhận được.
• Tiêu hao [Poise] 2 potency; nếu thành công, tỉ lệ chí mạng tăng 50%.
• Tiêu hao [Poise] 20 potency để nhận [World Tyrant] 1 potency.

Khi đánh trúng:
• Kích hoạt [Abyssal Echoes] 2 lần, sau đó giảm 1 potency [Abyssal Echoes].
• Áp [Nightmare] và 1 Fragile lên kẻ địch.
• Nhận 3 stack [Till They All Buried In Hell!!!].`
      },
      {
        title: "Kỹ năng S3 — To Tell Them. I HATE HATE HATE HATE...THEM ALL!!!!",
        content: `Mục tiêu: toàn bộ kẻ địch trên sân | Sát thương: 100% sức mạnh bản thân

Trước khi tấn công:
• Tiêu hao tối đa 50 stack [Hatred] và 50 stack [Envious Adapting]. Mỗi 5 stack tiêu hao của từng hiệu ứng tăng sát thương theo số stack [Nightmare] trên kẻ địch; tổng mức tăng tối đa 200%.
• Tiêu hao toàn bộ [Blind Obsession]. Với mỗi 2 stack tiêu hao, gây sát thương chuẩn bằng 100% sức mạnh bản thân nhân với số stack [Till They All Buried In Hell!!!].
• Kích hoạt [Abyssal Echoes] 20 lần trên kẻ địch; mỗi lần kích hoạt áp [Mark of Tyrant's] lên kẻ địch.

Khi sử dụng:
• Sát thương luôn được đặt bằng 100% sức mạnh bản thân, bao gồm cả sức mạnh sau khi được tăng cường.
• Đòn đánh luôn chí mạng và không thể bị ảnh hưởng bởi hiệu ứng bất lợi làm giảm tỉ lệ chí mạng.
• Sát thương chí mạng được đặt thành 10x.
• Áp 5 stack [HP Decreased] lên kẻ địch.
• Trong lúc sử dụng kỹ năng, Leviathan không thể chết và không thể bị dính hiệu ứng bất lợi.

Khi đánh trúng:
• Bỏ qua toàn bộ chỉ số phòng thủ và xóa toàn bộ buff của kẻ địch.
• Áp [Stun], [Nightmare], [Freeze], [Drowning] và [Drowning Abyss] 20 potency, 25 count.
• Kích hoạt toàn bộ [Abyssal Echoes] trên kẻ địch. Mỗi 5 lần kích hoạt, gây sát thương bằng potency [Abyssal Echoes] nhân với potency [Drowning Abyss]; hiệu ứng sát thương này tối đa 2 lần.

Khi kết thúc:
• Đặt toàn bộ kẻ địch vào trạng thái [Between-Line Death].
• Leviathan không thể tấn công trong 10 lượt tiếp theo.`
      },
      {
        title: "Hiệu ứng — Envious Adapting",
        content: `Tối đa 100 stack.
• Mỗi 10 stack: sức mạnh +0,5%, phòng thủ +1%, máu +5%.
• Ở số stack tối đa, toàn bộ sát thương của Leviathan trở thành sát thương chuẩn.
• Khi đánh trúng kẻ địch có hiệu ứng có lợi, có 50% sao chép và 50% xóa hiệu ứng đó; tối đa sao chép 20 hiệu ứng.
• Nếu kẻ địch là boss phụ hoặc boss chính, toàn bộ sát thương gây lên kẻ địch đó trở thành sát thương chuẩn.
• Mất 5 stack vào cuối mỗi lượt.`
      },
      {
        title: "Hiệu ứng — Hatred",
        content: `Tối đa 100 stack.
• Mỗi 20 stack: sức mạnh +0,5%.
• Mỗi 25 stack: [Poise] potency và count nhận được tăng thêm 5.
• Khi Leviathan nhận sát thương, phản lại lượng sát thương bằng sát thương nhận nhân với số stack trên bản thân; tối đa 5 lần phản đòn.
• Mất 5 stack vào cuối mỗi lượt.`
      },
      {
        title: "Hiệu ứng — Drowning Abyss",
        content: `Tối đa 100 potency và 100 count.
• Khi bị tấn công, giảm Defense theo (số lần bị tấn công × mỗi 25 potency [Drowning Abyss])%; tính cả đòn đánh của Leviathan và đồng minh.
• Mỗi 10 count, giảm 1% máu của kẻ địch.
• Mất 20 count vào cuối mỗi lượt.`
      },
      {
        title: "Hiệu ứng — Between-Line Death",
        content: `Tối đa 1 stack.
• Không thể bị xóa.
• Nhận thêm 100% sát thương từ mọi nguồn.
• Không thể nhận hiệu ứng có lợi.
• Hiệu ứng kết thúc khi mục tiêu chết.`
      },
      {
        title: "Hiệu ứng — Till They All Buried In Hell!!!",
        content: `Tối đa 6 stack.
• Mỗi stack: Leviathan nhận 1 [Protection].
• Mỗi 2 stack: Leviathan và đồng minh nhận [Double Damage Up].
• Mỗi lần tấn công, áp [Hell Fire] 1 potency và 2 count lên kẻ địch.`
      },
      {
        title: "Hiệu ứng — Hell Fire",
        content: `Tối đa 100 potency và 100 count.
• Mỗi 20 potency: nhận 1 [Fragile].
• Mỗi 25 count: nhận 2 [Weakness].
• Cuối mỗi lượt, nhận sát thương lửa bằng potency nhân với 5 count.
• Mất 10 count vào cuối mỗi lượt.`
      },
      {
        title: "Hiệu ứng — Drowning Abyss (cường hóa nguyên tố)",
        content: `Tối đa 75 potency và count.
• Sát thương hệ nước tăng 1% mỗi 10 potency.
• Sát thương hệ bóng tối tăng 5% mỗi 20 count.
• Mỗi 5 stack, khi kẻ địch tấn công, sát thương gây ra giảm 1%.`
      },
      {
        title: "Hiệu ứng — Abyssal Echoes",
        content: `Tối đa 75 potency và count.
• Mỗi 15 stack, độ chính xác giảm 4%.
• Mỗi lần kích hoạt, gây sát thương nước và bóng tối bằng tổng count nhân với tổng potency.
• Mỗi lần kích hoạt, thanh choáng của kẻ địch tăng bằng số count.
• Nếu bị S3 của Leviathan tiêu thụ toàn bộ, hoàn trả một nửa potency và count.`
      }
    ]
  }
};

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

function colorPetTriggers(text = "") {
  return esc(text)
    .replace(
      /Khi đánh trúng/g,
      '<span class="trigger-hit">Khi đánh trúng</span>'
    )
    .replace(
      /Trước khi tấn công/g,
      '<span class="trigger-before">Trước khi tấn công</span>'
    )
    .replace(
      /Khi sử dụng/g,
      '<span class="trigger-use">Khi sử dụng</span>'
    )
    .replace(
      /Khi kết thúc/g,
      '<span class="trigger-end">Khi kết thúc</span>'
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

function renderPets() {
  const list = $("petList");
  const showcase = $("petShowcase");
  const query = (
    $("searchPetName").value +
    " " +
    $("searchPetTrait").value
  )
    .toLowerCase()
    .trim();
  const filteredPets = pets
    .map((name, index) => ({ name, index, profile: petProfiles[name] }))
    .filter(
      ({ name, profile }) =>
        !query || JSON.stringify({ name, profile }).toLowerCase().includes(query)
    );
  const currentPet = pets[selectedPet] ? selectedPet : 0;
  const name = pets[currentPet];
  const profile = petProfiles[name];
  const sections = profile?.sections || [];
  const infoSection = sections.find((section) => section.title === "Thông tin cơ bản");
  const growthSection = sections.find((section) => section.title === "Các thể phát triển");
  const statsSection = sections.find((section) => section.title === "Thông tin chiến đấu");
  const skills = sections.filter((section) => section.title.startsWith("Kỹ năng"));
  const passives = sections.filter(
    (section) =>
      section.title.startsWith("Nội tại") || section.title.startsWith("Hiệu ứng")
  );
  const skill = skills[selectedPetSkill] || skills[0];
  const infoContent =
    selectedPetInfoTab === "general"
      ? [infoSection, growthSection]
      : [statsSection];

  showcase.innerHTML = name
    ? `
      <div class="pet-wiki">
        <div class="pet-wiki-left">
          <div class="pet-portrait">
            ${
              profile?.image
                ? `<img class="pet-portrait-image" src="${esc(profile.image)}" alt="${esc(name)}">`
                : '<div class="pet-portrait-art" aria-hidden="true">🐉</div>'
            }
            <div class="pet-portrait-caption">${esc(name)}</div>
          </div>
          <div class="pet-info-tabs" role="tablist" aria-label="Thông tin Pet">
            <button type="button" class="pet-wiki-tab ${selectedPetInfoTab === "general" ? "active" : ""}" data-pet-info-tab="general" role="tab" aria-selected="${selectedPetInfoTab === "general"}">Thông tin chung</button>
            <button type="button" class="pet-wiki-tab ${selectedPetInfoTab === "combat" ? "active" : ""}" data-pet-info-tab="combat" role="tab" aria-selected="${selectedPetInfoTab === "combat"}">Chiến đấu</button>
          </div>
          <div class="pet-info-panel" role="tabpanel">
            <div class="pet-red-heading">Thông tin</div>
            <div class="pet-info-content">
              <div class="pet-info-row"><strong>Tên</strong><span>${esc(name)}</span></div>
              <div class="pet-info-row"><strong>Biệt danh</strong><span>${esc(profile?.epithet || "—")}</span></div>
              ${
                infoContent
                  .filter(Boolean)
                  .map(
                    ({ title, content }) => `
                      <section class="pet-info-section">
                        <div class="pet-red-heading">${esc(title)}</div>
                        <div class="pet-info-copy">${esc(content)}</div>
                      </section>
                    `
                  )
                  .join("") ||
                '<div class="pet-info-copy">Thông tin chưa được cập nhật.</div>'
              }
            </div>
          </div>
          <div class="pet-description-box">
            <div class="pet-red-heading">Mô tả</div>
            <p>${esc(profile?.description || "Thông tin chưa được cập nhật.")}</p>
          </div>
        </div>
        <div class="pet-wiki-right">
          <div class="pet-skill-tabs" role="tablist" aria-label="Nhóm kỹ năng">
            <button type="button" class="pet-wiki-tab ${selectedPetSkill < 2 ? "active" : ""}" data-pet-skill-main="1" role="tab" aria-selected="${selectedPetSkill < 2}">Skill 1</button>
            <button type="button" class="pet-wiki-tab ${selectedPetSkill === 2 ? "active" : ""}" data-pet-skill-main="2" role="tab" aria-selected="${selectedPetSkill === 2}">Skill 2</button>
            <button type="button" class="pet-wiki-tab ${selectedPetSkill === 3 ? "active" : ""}" data-pet-skill-main="3" role="tab" aria-selected="${selectedPetSkill === 3}">Skill 3</button>
            <button type="button" class="pet-wiki-tab ${selectedPetSkill === 4 ? "active" : ""}" data-pet-skill-main="defense" role="tab" aria-selected="${selectedPetSkill === 4}">Defense</button>
          </div>
          ${
            selectedPetSkill < 2
              ? `
                <div class="pet-skill-subtabs" role="tablist" aria-label="Skill 1">
                  <button type="button" class="pet-wiki-tab ${selectedPetSkill === 0 ? "active" : ""}" data-pet-skill="0" role="tab" aria-selected="${selectedPetSkill === 0}">Skill 1 - 1</button>
                  <button type="button" class="pet-wiki-tab ${selectedPetSkill === 1 ? "active" : ""}" data-pet-skill="1" role="tab" aria-selected="${selectedPetSkill === 1}">Skill 1 - 2</button>
                </div>
              `
              : ""
          }
          <div class="pet-skill-panel" role="tabpanel">
            ${
              selectedPetSkill === 4
                ? '<div class="pet-skill-copy">Chưa có thông tin phòng thủ.</div>'
                : skill
                ? `<div class="pet-skill-heading">${esc(skill.title)}</div><div class="pet-skill-copy">${colorPetTriggers(skill.content)}</div>`
                : '<div class="pet-skill-copy">Chưa có thông tin kỹ năng.</div>'
            }
          </div>
          <div class="pet-red-heading pet-passive-heading">Nội tại chiến đấu</div>
          <div class="pet-passives">
            ${
              passives
                .map(
                  ({ title, content }, index) => `
                    <details class="pet-passive" ${index === 0 ? "open" : ""}>
                      <summary>${esc(title)}</summary>
                      <div class="pet-passive-copy">${colorPetTriggers(content)}</div>
                    </details>
                  `
                )
                .join("") || '<div class="pet-passive-copy">Chưa có nội tại.</div>'
            }
          </div>
        </div>
      </div>
    `
    : "";

  $("petCountTitle").textContent = `Pets (${filteredPets.length})`;
  list.innerHTML = filteredPets
    .map(
      ({ name: petName, index }) => `
        <div class="gift pet-card" data-pet="${index}" tabindex="0" role="button" aria-label="Xem ${esc(petName)}">
          <div class="giftart pet-card-art ${currentPet === index ? "selected" : ""}">
            ${
              petProfiles[petName]?.image
                ? `<img class="pet-card-image" src="${esc(petProfiles[petName].image)}" alt="${esc(petName)}" loading="lazy">`
                : '<span aria-hidden="true">🐉</span>'
            }
          </div>
          <div class="giftname">${esc(petName)}</div>
        </div>
      `
    )
    .join("") || '<div class="empty">Không tìm thấy Pet phù hợp.</div>';
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
$("searchPetName").oninput = $("searchPetTrait").oninput = renderPets;

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
  if (activeView === "petPage") renderPets();
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

$("petList").onclick = (e) => {
  const button = e.target.closest("[data-pet]");
  if (!button) return;
  selectedPet = Number(button.dataset.pet);
  selectedPetInfoTab = "general";
  selectedPetSkill = 0;
  renderPets();
};

$("petList").onkeydown = (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const card = e.target.closest("[data-pet]");
  if (!card) return;
  e.preventDefault();
  selectedPet = Number(card.dataset.pet);
  selectedPetInfoTab = "general";
  selectedPetSkill = 0;
  renderPets();
};

$("petShowcase").onclick = (e) => {
  const infoTab = e.target.closest("[data-pet-info-tab]");
  const skillTab = e.target.closest("[data-pet-skill]");
  const skillMainTab = e.target.closest("[data-pet-skill-main]");
  if (infoTab) selectedPetInfoTab = infoTab.dataset.petInfoTab;
  if (skillTab) selectedPetSkill = Number(skillTab.dataset.petSkill);
  if (skillMainTab) {
    const mainSkill = skillMainTab.dataset.petSkillMain;
    selectedPetSkill = { 1: 0, 2: 2, 3: 3, defense: 4 }[mainSkill];
  }
  if (infoTab || skillTab || skillMainTab) renderPets();
};

render();
renderItemPage();
