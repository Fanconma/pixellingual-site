"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getMostRecentPacks = exports.getLanguageDisplayName = exports.getPacksByTag = exports.getPacksByStudio = exports.getPacksByAuthor = exports.getPackById = exports.getStudioById = exports.getSectionTitleById = exports.getSectionById = exports.getPacksBySectionId = exports.STUDIO_PACKS = exports.TAG_PACKS = exports.ALL_PACKS = exports.generateAuthorPacks = exports.generateStudioPacks = exports.generateTagPacks = exports.FEATURED_PACKS = exports.getPackStatus = exports.formatDate = exports.SECTIONS = exports.STUDIOS = exports.TAGS = void 0;
var packs_json_1 = require("./packs.json");
// All available tags
exports.TAGS = [
    "冒险",
    "生存",
    "小游戏",
    "RPG",
    "解密",
    "PvP",
    "休闲",
    "教育",
    "主题公园",
];
// All available studios
exports.STUDIOS = [
    {
        id: "mojang",
        name: "Mojang Studios",
        logo: ""
    },
    {
        id: "everbloom",
        name: "Everbloom Games",
        logo: "/placeholder.svg?height=200&width=200&text=Everbloom"
    },
    {
        id: "gamemode-one",
        name: "Gamemode One",
        logo: "/placeholder.svg?height=200&width=200&text=Gamemode One"
    },
    {
        id: "noxcrew",
        name: "Noxcrew",
        logo: "/images/studios/Noxcrew.avif"
    },
    {
        id: "shapescapre",
        name: "Shapescape",
        logo: "/placeholder.svg?height=200&width=200&text=Blockworks"
    },
    {
        id: "spark-universe",
        name: "Spark Universe",
        logo: "/placeholder.svg?height=200&width=200&text=PixelHeads"
    },
];
// Available sections for data-driven content
exports.SECTIONS = [
    {
        id: "dlc-content",
        title: "联动地图",
        description: "查看所有 Minecraft 联动地图的翻译包！"
    },
    {
        id: "popular-translations",
        title: "必须玩的地图！！",
        description: "个人认为最好玩的地图合集~"
    },
    {
        id: "free-maps",
        title: "免费地图一览",
        description: "免费的地图不得玩一玩？"
    },
    {
        id: "new-version-mc-explore",
        title: "Minecraft版本主题地图",
        description: "通过这些地图以任务的形式快速了解对应的 Minecraft 版本更新了哪些内容？"
    },
    {
        id: "educational-content",
        title: "教育地图",
        description: "在游玩的过程中学习。"
    },
    {
        id: "leisure",
        title: "养老休闲地图",
        description: "试一试慢节奏的游戏地图吧！"
    },
];
// Helper function to format date for display
exports.formatDate = function (dateString) {
    if (!dateString || dateString.length !== 8)
        return "Unknown Date";
    var year = dateString.substring(0, 4);
    var month = dateString.substring(4, 6);
    var day = dateString.substring(6, 8);
    var monthNames = [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
    ];
    var monthIndex = Number.parseInt(month, 10) - 1;
    var monthName = monthNames[monthIndex];
    return year + "\u5E74" + monthName + Number.parseInt(day, 10) + "\u65E5 ";
};
// Helper function to check if a pack is new or updated
exports.getPackStatus = function (pack) {
    var currentDate = new Date();
    var createdDate = new Date(Number.parseInt(pack.createdAt.substring(0, 4)), Number.parseInt(pack.createdAt.substring(4, 6)) - 1, Number.parseInt(pack.createdAt.substring(6, 8)));
    var updatedDate = new Date(Number.parseInt(pack.updatedAt.substring(0, 4)), Number.parseInt(pack.updatedAt.substring(4, 6)) - 1, Number.parseInt(pack.updatedAt.substring(6, 8)));
    // Check if created within last 7 days
    var isNew = (currentDate.getTime() - createdDate.getTime()) / (1000 * 3600 * 24) <= 7;
    // Check if updated within last 7 days (and not new)
    var isUpdated = !isNew && (currentDate.getTime() - updatedDate.getTime()) / (1000 * 3600 * 24) <= 7;
    return { isNew: isNew, isUpdated: isUpdated };
};
// Common features for translation packs
var COMMON_FEATURES = [
    "Complete translation of all in-game text",
    "Translated custom items and their descriptions",
    "Translated quest dialogues and objectives",
    "Translated achievements and their descriptions",
    "Translated game mechanics explanations",
    "Optimized for Minecraft Bedrock Edition",
];
// Additional features by type
var ADVENTURE_FEATURES = [
    "Fully translated storyline and character dialogue",
    "Translated custom quest system",
    "Localized NPC interactions",
    "Translated custom lore books and scrolls",
];
var SURVIVAL_FEATURES = [
    "Translated custom survival mechanics",
    "Localized crafting guides",
    "Translated custom biome descriptions",
    "Localized survival tips and tutorials",
];
var EDUCATIONAL_FEATURES = [
    "Curriculum-aligned content translated with educational accuracy",
    "Translated learning objectives and assessments",
    "Localized educational guides for teachers",
    "Culturally adapted educational content",
];
// packs|| DUE TO THE Historical issue, THE NAME OF PACKS IS FEATURED_PACKS, BUT IT REFERS TO ALL PACKS!!
exports.FEATURED_PACKS = packs_json_1["default"];
// Helper function to generate mock packs
var generateMockPacks = function (count, startId) {
    if (startId === void 0) { startId = 6; }
    var studios = exports.STUDIOS.map(function (s) { return s.name; });
    var sectionIds = exports.SECTIONS.map(function (s) { return s.id; });
    var authors = [
        "PixelLingual Team",
        "TranslationCrew",
        "RedstoneExperts",
        "IslandCreators",
        "MedievalCrafters",
        "ChineseMinecraft",
        "TranslationMasters",
        "BilingualGamers",
    ];
    return Array.from({ length: count }, function (_, i) {
        var id = startId + i;
        var studioIndex = Math.floor(Math.random() * studios.length);
        var authorIndex = Math.floor(Math.random() * authors.length);
        var isDLC = Math.random() > 0.8;
        var price = isDLC || Math.random() > 0.7 ? Math.floor(Math.random() * 10) * 100 + 90 : 0;
        // Generate random dates within the last year
        var createdMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
        var createdDay = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
        var createdAt = "2023" + createdMonth + createdDay;
        // Updated date is either same as created or later
        var updatedMonth = Math.random() > 0.3
            ? String(Math.min(Number.parseInt(createdMonth) + Math.floor(Math.random() * 3), 12)).padStart(2, "0")
            : createdMonth;
        var updatedDay = updatedMonth === createdMonth && Math.random() > 0.5
            ? String(Math.min(Number.parseInt(createdDay) + Math.floor(Math.random() * 15), 28)).padStart(2, "0")
            : String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
        var updatedAt = "2023" + updatedMonth + updatedDay;
        // Randomly assign 0-2 sections
        var packSectionIds = [];
        var sectionCount = Math.floor(Math.random() * 3);
        for (var j = 0; j < sectionCount; j++) {
            var randomSection = sectionIds[Math.floor(Math.random() * sectionIds.length)];
            if (!packSectionIds.includes(randomSection)) {
                packSectionIds.push(randomSection);
            }
        }
        // Generate a random rating between 3.0 and 5.0
        var rating = 3 + Math.random() * 2;
        // Generate random languages
        var languageOptions = ["cn", "hk", "tw"];
        var languages = [];
        var languageCount = Math.floor(Math.random() * 3) + 1; // At least one language
        for (var j = 0; j < languageCount; j++) {
            var lang = languageOptions[Math.floor(Math.random() * languageOptions.length)];
            if (!languages.includes(lang)) {
                languages.push(lang);
            }
        }
        // Determine features based on tags
        var packFeatures = __spreadArrays(COMMON_FEATURES);
        var randomTags = [
            exports.TAGS[Math.floor(Math.random() * exports.TAGS.length)],
            exports.TAGS[Math.floor(Math.random() * exports.TAGS.length)],
        ].filter(function (v, i, a) { return a.indexOf(v) === i; });
        if (randomTags.includes("Adventure") || randomTags.includes("RPG") || randomTags.includes("Story")) {
            packFeatures = __spreadArrays(packFeatures, ADVENTURE_FEATURES);
        }
        if (randomTags.includes("Survival") || randomTags.includes("Skyblock") || randomTags.includes("Challenge")) {
            packFeatures = __spreadArrays(packFeatures, SURVIVAL_FEATURES);
        }
        if (randomTags.includes("Education") || randomTags.includes("Tutorial")) {
            packFeatures = __spreadArrays(packFeatures, EDUCATIONAL_FEATURES);
        }
        // Add some random specific features
        var specificFeatures = [
            "Translated custom user interface",
            "Localized sound effects and audio cues",
            "Culturally adapted references and jokes",
            "Translated custom entity names and behaviors",
            "Localized custom game mechanics",
            "Translated custom world generation settings",
        ];
        // Add 1-3 specific features
        var specificCount = Math.floor(Math.random() * 3) + 1;
        for (var j = 0; j < specificCount; j++) {
            var feature = specificFeatures[Math.floor(Math.random() * specificFeatures.length)];
            if (!packFeatures.includes(feature)) {
                packFeatures.push(feature);
            }
        }
        return {
            id: id,
            title: "Translation Pack " + id,
            description: "A complete translation of Minecraft content with custom items, quests, and more. Pack number " + id + ".",
            image: "/placeholder.svg?height=400&width=600&text=Pack " + id,
            tags: [exports.TAGS[Math.floor(Math.random() * exports.TAGS.length)], exports.TAGS[Math.floor(Math.random() * exports.TAGS.length)]].filter(function (v, i, a) { return a.indexOf(v) === i; }),
            updatedAt: updatedAt,
            createdAt: createdAt,
            author: authors[authorIndex],
            studio: studios[studioIndex],
            isDLC: isDLC,
            sectionIds: packSectionIds,
            rating: rating,
            price: price,
            downloadLink: "https://example.com/download/pack-" + id,
            languages: languages,
            features: packFeatures
        };
    });
};
// Generate tag-specific packs
exports.generateTagPacks = function (tag, count) {
    if (count === void 0) { count = 8; }
    return generateMockPacks(count).map(function (pack) { return (__assign(__assign({}, pack), { tags: __spreadArrays([tag], pack.tags.filter(function (t) { return t !== tag; })) })); });
};
// Generate studio-specific packs
exports.generateStudioPacks = function (studio, count) {
    if (count === void 0) { count = 8; }
    return generateMockPacks(count).map(function (pack) { return (__assign(__assign({}, pack), { studio: studio })); });
};
// Generate author-specific packs
exports.generateAuthorPacks = function (author, count) {
    if (count === void 0) { count = 8; }
    return generateMockPacks(count).map(function (pack) { return (__assign(__assign({}, pack), { author: author })); });
};
// All translation packs
exports.ALL_PACKS = __spreadArrays(exports.FEATURED_PACKS, generateMockPacks(30));
// Pre-generated tag packs for common tags
exports.TAG_PACKS = {
    adventure: exports.generateTagPacks("Adventure"),
    survival: exports.generateTagPacks("Survival"),
    education: exports.generateTagPacks("Education"),
    building: exports.generateTagPacks("Building"),
    rpg: exports.generateTagPacks("RPG"),
    minigame: exports.generateTagPacks("Minigame")
};
// Pre-generated studio packs
exports.STUDIO_PACKS = Object.fromEntries(exports.STUDIOS.map(function (studio) { return [studio.id, exports.generateStudioPacks(studio.name)]; }));
// Get packs by section ID
exports.getPacksBySectionId = function (sectionId) {
    return exports.ALL_PACKS.filter(function (pack) { var _a; return (_a = pack.sectionIds) === null || _a === void 0 ? void 0 : _a.includes(sectionId); });
};
// Get section by ID
exports.getSectionById = function (sectionId) {
    return exports.SECTIONS.find(function (s) { return s.id === sectionId; });
};
// Get section title by ID
exports.getSectionTitleById = function (sectionId) {
    var section = exports.SECTIONS.find(function (s) { return s.id === sectionId; });
    return section ? section.title : "";
};
// Get studio by ID
exports.getStudioById = function (studioId) {
    return exports.STUDIOS.find(function (s) { return s.id === studioId; });
};
// Get pack by ID
exports.getPackById = function (packId) {
    return exports.ALL_PACKS.find(function (pack) { return pack.id === packId; });
};
// Get packs by author
exports.getPacksByAuthor = function (author, excludeId) {
    return exports.ALL_PACKS.filter(function (pack) { return pack.author === author && (excludeId === undefined || pack.id !== excludeId); });
};
// Get packs by studio
exports.getPacksByStudio = function (studio, excludeId) {
    return exports.ALL_PACKS.filter(function (pack) { return pack.studio === studio && (excludeId === undefined || pack.id !== excludeId); });
};
// Get packs by tag
exports.getPacksByTag = function (tag, excludeId) {
    return exports.ALL_PACKS.filter(function (pack) { return pack.tags.includes(tag) && (excludeId === undefined || pack.id !== excludeId); });
};
// Get language display name
exports.getLanguageDisplayName = function (code) {
    switch (code) {
        case "cn":
            return "简体中文";
        case "hk":
            return "繁體中文（香港）";
        case "tw":
            return "繁體中文（台灣）";
        default:
            return code;
    }
};
// Get most recent packs
exports.getMostRecentPacks = function (count) {
    if (count === void 0) { count = 3; }
    return __spreadArrays(exports.ALL_PACKS).sort(function (a, b) {
        // Sort by created date (newest first)
        return Number.parseInt(b.createdAt) - Number.parseInt(a.createdAt);
    })
        .slice(0, count);
};
