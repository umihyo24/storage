"use strict";

const CONFIG = Object.freeze({
  VALUES: {
    ZERO: 0, ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9, TEN: 10,
    ELEVEN: 11, TWELVE: 12, FIFTEEN: 15, EIGHTEEN: 18, TWENTY: 20, TWENTY_FOUR: 24, TWENTY_EIGHT: 28,
    THIRTY: 30, THIRTY_TWO: 32, THIRTY_SIX: 36, FORTY: 40, FORTY_EIGHT: 48, FIFTY: 50, SIXTY: 60,
    SIXTY_FOUR: 64, SEVENTY: 70, EIGHTY: 80, NINETY: 90, ONE_HUNDRED: 100, ONE_TWENTY: 120,
    ONE_FORTY: 140, ONE_SIXTY: 160, ONE_EIGHTY: 180, TWO_HUNDRED: 200, TWO_FORTY: 240,
    THREE_HUNDRED: 300, FOUR_HUNDRED: 400, FIVE_HUNDRED: 500, SEVEN_HUNDRED: 700, ONE_THOUSAND: 1000,
    ROAD_COST: 90, ROUTE_COST: 150, EXPLORER_COST: 65, START_TREASURY: 1250, START_FAME: 0, DISCOVER_GOAL_RATIO: 0.8,
    CIRCUIT_GOAL: 5, NEGATIVE_LOSS_TURNS: 10, CIRCUIT_ACTIVE_TURNS: 10, CIRCUIT_DELIVERY_GRACE: 4, EXPLORATION_TURNS: 3,
    BASE_DEMAND: 18, FACILITY_DEMAND: 12, DEMAND_SATISFY_UNLOCK: 24, DEMAND_GROWTH: 1, FACILITY_DEMAND_GROWTH: 1, TAX_RATE: 0.16, TOLL_INCOME: 7,
    MARKET_TAX: 9, CARAVAN_CAPACITY: 4, MAX_ROUTES: 6, MAX_EXPLORERS: 3, FPS_INTERVAL: 1000 / 30,
    SELECT_RADIUS: 36, ROAD_WIDTH: 8, NODE_RADIUS: 31, SMALL_NODE_RADIUS: 23, PI_TWO: Math.PI * 2,
    HALF: 0.5, QUARTER: 0.25, ALPHA_FAINT: 0.18, ALPHA_MED: 0.45, ALPHA_STRONG: 0.78,
    PRICE_WOOD_BUY: 8, PRICE_FOOD_BUY: 7, PRICE_IRON_BUY: 11, PRICE_TOOLS_BUY: 19, PRICE_WINE_BUY: 17,
    PRICE_WOOD_SELL: 18, PRICE_FOOD_SELL: 16, PRICE_IRON_SELL: 23, PRICE_TOOLS_SELL: 42, PRICE_WINE_SELL: 38,
    WOOD_RATE: 10, FOOD_RATE: 10, IRON_RATE: 10, PROCESS_RATE: 5, INITIAL_STOCK: 8, HOME_STOCK: 4,
    CANVAS_WIDTH: 1120, CANVAS_HEIGHT: 720, MAP_PAD: 32, TEXT_PAD: 10, BUTTON_W: 210, BUTTON_H: 46
  },
  COLORS: {
    backgroundTop: "#2f4b3c", backgroundBottom: "#b89d63", water: "#285f75", coast: "#d3bd86", forest: "#375f37",
    desert: "#b78d55", road: "#cdb481", roadShadow: "#4c3821", selected: "#6fd3ff", discovered: "#f6df9a",
    hidden: "#141a18", home: "#9d7141", forestNode: "#498c42", farm: "#c49a35", mine: "#7f7b73", market: "#b98a2e",
    port: "#3b89a5", city: "#8e4c42", white: "#fff6d6", black: "#17120c", green: "#72d36d", red: "#e47362",
    blue: "#75c9f4", gold: "#d9b56a", panel: "rgba(18,16,12,0.82)", overlay: "rgba(0,0,0,0.72)"
  },
  RESOURCE_LABELS: { Wood: "木材", Food: "食料", Iron: "鉄", Tools: "道具", Wine: "ワイン" },
  RESOURCE_ICONS: { Wood: "🪵", Food: "🌾", Iron: "⛓", Tools: "🛠", Wine: "🍷" },
  SETTLEMENT_LABELS: { HOME: "本国", FOREST: "森の集落", FARM: "農村", MINE: "鉱山町", MARKET: "市場町", PORT: "港町", CITY: "交易都市" },
  PRODUCTION: { FOREST: { resource: "Wood", amount: 10 }, FARM: { resource: "Food", amount: 10 }, MINE: { resource: "Iron", amount: 10 } },
  FACILITIES: {
    BLACKSMITH: { label: "鍛冶屋", input: { Wood: 1, Iron: 1 }, output: "Tools", amount: 5, demand: { Wood: 12, Iron: 12 } },
    WINERY: { label: "酒場", input: { Food: 1 }, output: "Wine", amount: 5, demand: { Food: 12 } },
    MARKET_HALL: { label: "市場", demand: { Wood: 10, Food: 10, Iron: 10 } },
    DOCK: { label: "取引所", demand: { Tools: 10, Wine: 10 } }
  },
  TYPE_DEMAND: {
    HOME: { Food: 18, Tools: 16, Wine: 12 }, FOREST: { Food: 14, Tools: 10 }, FARM: { Wood: 12, Tools: 8 },
    MINE: { Wood: 14, Food: 12, Tools: 10 }, MARKET: { Wood: 16, Food: 16, Iron: 12, Wine: 10 },
    PORT: { Wood: 12, Food: 10, Tools: 14, Wine: 14 }, CITY: { Wood: 18, Food: 18, Iron: 16, Tools: 18, Wine: 18 }
  },
  PRICES: {
    Wood: { buy: 8, sell: 18 }, Food: { buy: 7, sell: 16 }, Iron: { buy: 11, sell: 23 }, Tools: { buy: 19, sell: 42 }, Wine: { buy: 17, sell: 38 }
  },
  MAP: {
    nodes: [
      { id: "home", type: "HOME", name: "本国", x: 340, y: 585, facilities: ["MARKET_HALL"], discovered: true },
      { id: "forest", type: "FOREST", name: "森の集落", x: 310, y: 160, facilities: [], discovered: false },
      { id: "farm", type: "FARM", name: "農村", x: 330, y: 390, facilities: [], discovered: true },
      { id: "mine", type: "MINE", name: "鉱山町", x: 545, y: 205, facilities: [], discovered: false },
      { id: "city", type: "CITY", name: "交易都市", x: 555, y: 420, facilities: ["BLACKSMITH"], discovered: true },
      { id: "market", type: "MARKET", name: "市場町", x: 785, y: 355, facilities: [], discovered: false },
      { id: "port", type: "PORT", name: "港町", x: 795, y: 175, facilities: ["DOCK"], discovered: false },
      { id: "oasis", type: "FARM", name: "オアシス", x: 650, y: 570, facilities: ["WINERY"], discovered: false },
      { id: "northCity", type: "CITY", name: "北方都市", x: 930, y: 270, facilities: [], discovered: false },
      { id: "westPort", type: "PORT", name: "西の港塞", x: 150, y: 555, facilities: [], discovered: false },
      { id: "deepMine", type: "MINE", name: "深層鉱山", x: 870, y: 520, facilities: [], discovered: false },
      { id: "vineFarm", type: "FARM", name: "葡萄村", x: 180, y: 310, facilities: ["WINERY"], discovered: false }
    ],
    edges: [
      ["home", "farm"], ["farm", "city"], ["city", "mine"], ["mine", "forest"], ["mine", "port"], ["city", "market"],
      ["market", "port"], ["home", "city"], ["home", "oasis"], ["oasis", "deepMine"], ["market", "northCity"],
      ["forest", "vineFarm"], ["vineFarm", "farm"], ["home", "westPort"], ["westPort", "vineFarm"], ["port", "northCity"], ["deepMine", "northCity"]
    ],
    starterRoads: [["home", "farm"], ["farm", "city"]]
  },
  CIRCUIT_TEMPLATES: [
    { id: "tools-city", raw: ["Wood", "Iron"], processor: "BLACKSMITH", final: "Tools", consumerTypes: ["CITY"] },
    { id: "tools-port", raw: ["Wood", "Iron"], processor: "BLACKSMITH", final: "Tools", consumerTypes: ["PORT"] },
    { id: "tools-market", raw: ["Wood", "Iron"], processor: "BLACKSMITH", final: "Tools", consumerTypes: ["MARKET"] },
    { id: "wine-city", raw: ["Food"], processor: "WINERY", final: "Wine", consumerTypes: ["CITY"] },
    { id: "wine-port", raw: ["Food"], processor: "WINERY", final: "Wine", consumerTypes: ["PORT"] },
    { id: "wine-market", raw: ["Food"], processor: "WINERY", final: "Wine", consumerTypes: ["MARKET"] }
  ],
  UI: { nodeFont: "16px Georgia", smallFont: "13px Georgia", bigFont: "34px Georgia", routeDash: [12, 8], shadowBlur: 14 }
});

const V = CONFIG.VALUES;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const ui = {
  guildName: document.getElementById("guildName"), treasury: document.getElementById("treasury"), turnLabel: document.getElementById("turnLabel"),
  endTurnButton: document.getElementById("endTurnButton"), exploreButton: document.getElementById("exploreButton"), buildRoadButton: document.getElementById("buildRoadButton"),
  routeButton: document.getElementById("routeButton"), explorationPanel: document.getElementById("explorationPanel"), rumorList: document.getElementById("rumorList"),
  goalList: document.getElementById("goalList"), selectedName: document.getElementById("selectedName"), selectedPanel: document.getElementById("selectedPanel"),
  caravanPanel: document.getElementById("caravanPanel"), circuitPanel: document.getElementById("circuitPanel"), tradePanel: document.getElementById("tradePanel"),
  revenuePanel: document.getElementById("revenuePanel"), productionPanel: document.getElementById("productionPanel"), messageBar: document.getElementById("messageBar")
};

function createImage(assetKey) {
  const image = new Image();
  const path = String(assetKey || "").replace(".", "/");
  image.src = `assets/${path}.png`;
  image.dataset.ready = "false";
  image.onload = () => { image.dataset.ready = "true"; };
  image.onerror = () => { image.dataset.ready = "false"; };
  return image;
}

const assets = {
  HOME: createImage("cards.home"), FOREST: createImage("cards.forest"), FARM: createImage("cards.farm"), MINE: createImage("cards.mine"),
  MARKET: createImage("cards.market"), PORT: createImage("cards.port"), CITY: createImage("cards.city"), caravan: createImage("cards.caravan")
};

function safeDrawImage(context, image, x, y, width, height, fallback) {
  if (image && image.dataset && image.dataset.ready === "true") {
    context.drawImage(image, x, y, width, height);
    return true;
  }
  if (typeof fallback === "function") fallback();
  return false;
}

const gameState = {
  phase: "start", turn: V.ZERO, fame: V.START_FAME, treasury: V.START_TREASURY, negativeTurns: V.ZERO,
  selectedNodeId: "home", pendingAction: null, selectingRoadFrom: null, lastFrame: V.ZERO, needsDom: true, routeSerial: V.ZERO,
  nodes: [], roads: [], routes: [], caravans: [], explorers: [], circuits: [], revenue: { trade: V.ZERO, tolls: V.ZERO, taxes: V.ZERO },
  lastRevenue: { trade: V.ZERO, tolls: V.ZERO, taxes: V.ZERO }, deliveredThisTurn: [], messages: ["交易ギルドを設立しました。"], images: assets
};

function cloneStock(stock) { return Object.assign({ Wood: V.ZERO, Food: V.ZERO, Iron: V.ZERO, Tools: V.ZERO, Wine: V.ZERO }, stock || {}); }
function edgeKey(a, b) { return [a, b].sort().join("-"); }
function getNode(id) { return gameState.nodes.find(node => node.id === id) || null; }
function getDiscoveredNodes() { return gameState.nodes.filter(node => node.discovered); }
function getRoadKeys() { return new Set(gameState.roads.map(road => edgeKey(road.a, road.b))); }
function hasRoad(a, b) { return gameState.roads.some(road => edgeKey(road.a, road.b) === edgeKey(a, b)); }
function pushMessage(message) { gameState.messages.unshift(message); gameState.messages = gameState.messages.slice(V.ZERO, V.FIVE); }
function money(value) { return Math.round(value).toLocaleString("ja-JP"); }
function resourceLabel(resource) { return `${CONFIG.RESOURCE_ICONS[resource] || "□"} ${CONFIG.RESOURCE_LABELS[resource] || resource}`; }
function routeName(route) { return (route?.nodeIds || []).map(id => getNode(id)?.name || id).join(" → "); }

function initGame() {
  gameState.phase = "playing"; gameState.turn = V.ONE; gameState.fame = V.START_FAME; gameState.treasury = V.START_TREASURY;
  gameState.negativeTurns = V.ZERO; gameState.selectedNodeId = "home"; gameState.selectingRoadFrom = null; gameState.pendingAction = null; gameState.routeSerial = V.ZERO;
  gameState.nodes = CONFIG.MAP.nodes.map(node => ({
    ...node, stock: cloneStock(node.type === "HOME" ? { Wood: V.HOME_STOCK, Food: V.HOME_STOCK, Iron: V.HOME_STOCK } : {}),
    demand: Object.assign({}, CONFIG.TYPE_DEMAND[node.type] || {}), satisfied: {}, unlocked: {}, known: node.discovered
  }));
  gameState.roads = CONFIG.MAP.starterRoads.map(([a, b]) => ({ a, b }));
  gameState.routes = [createRoute(["home", "farm", "city", "farm", "home"], true)].filter(Boolean);
  gameState.caravans = gameState.routes.map((route, index) => createCaravan(route.id, index));
  gameState.explorers = [{ id: "explorer-1", targetId: null, remaining: V.ZERO }];
  gameState.circuits = CONFIG.CIRCUIT_TEMPLATES.map(template => ({ ...template, activeTurns: V.ZERO, deliveryGrace: V.ZERO, completed: false }));
  gameState.revenue = { trade: V.ZERO, tolls: V.ZERO, taxes: V.ZERO }; gameState.lastRevenue = { trade: V.ZERO, tolls: V.ZERO, taxes: V.ZERO };
  gameState.deliveredThisTurn = []; gameState.messages = ["交易網の開拓を開始しました。農村と交易都市への道は利用可能です。"];
  gameState.needsDom = true;
}

function createRoute(nodeIds, free) {
  const usable = nodeIds.every(id => getNode(id)?.discovered || CONFIG.MAP.nodes.find(node => node.id === id)?.discovered || free);
  if (!usable) return null;
  gameState.routeSerial += V.ONE;
  const id = `route-${gameState.routeSerial}`;
  return { id, nodeIds: nodeIds.slice(), active: true };
}

function createCaravan(routeId, index) {
  return { id: `caravan-${index + V.ONE}`, routeId, routeIndex: V.ZERO, direction: V.ONE, cargo: [], capacity: V.CARAVAN_CAPACITY, wait: V.ZERO };
}

function startExploration() {
  const explorer = gameState.explorers.find(item => !item.targetId);
  if (!explorer) { pushMessage("空いている探検隊がありません。"); return; }
  const source = getNode(gameState.selectedNodeId) || getNode("home");
  const candidates = CONFIG.MAP.edges
    .filter(([a, b]) => (a === source.id && !getNode(b)?.discovered) || (b === source.id && !getNode(a)?.discovered))
    .map(([a, b]) => a === source.id ? b : a);
  const targetId = candidates[V.ZERO] || CONFIG.MAP.nodes.find(node => !getNode(node.id)?.discovered)?.id;
  if (!targetId) { pushMessage("すべての拠点が発見済みです。"); return; }
  explorer.targetId = targetId; explorer.remaining = V.EXPLORATION_TURNS;
  pushMessage(`${source.name}から${CONFIG.MAP.nodes.find(node => node.id === targetId)?.name || "未知の土地"}へ探索隊を派遣しました。`);
  gameState.needsDom = true;
}

function buildRoadAction() {
  const selected = getNode(gameState.selectedNodeId);
  if (!selected || !selected.discovered) return;
  if (!gameState.selectingRoadFrom) { gameState.selectingRoadFrom = selected.id; pushMessage("接続先の発見済み拠点を選択してください。"); return; }
  const from = gameState.selectingRoadFrom; const to = selected.id;
  gameState.selectingRoadFrom = null;
  if (from === to || hasRoad(from, to)) { pushMessage("その道路は建設済み、または無効です。"); return; }
  const allowed = CONFIG.MAP.edges.some(([a, b]) => edgeKey(a, b) === edgeKey(from, to));
  if (!allowed) { pushMessage("地形が険しく、その二点間には道路を建てられません。"); return; }
  if (gameState.treasury < V.ROAD_COST) { pushMessage("道路建設の資金が不足しています。"); return; }
  gameState.treasury -= V.ROAD_COST; gameState.roads.push({ a: from, b: to });
  pushMessage(`${getNode(from)?.name}と${getNode(to)?.name}を結ぶ街道を建設しました。`);
  gameState.needsDom = true;
}

function createTradeRouteAction() {
  const selected = getNode(gameState.selectedNodeId);
  if (!selected || !selected.discovered) return;
  if (gameState.routes.length >= V.MAX_ROUTES) { pushMessage("交易路の管理上限に達しています。"); return; }
  if (gameState.treasury < V.ROUTE_COST) { pushMessage("交易路を組織する資金が不足しています。"); return; }
  const path = findPath("home", selected.id, true);
  if (!path || path.length < V.TWO) { pushMessage("本国から道路でつながっていません。"); return; }
  gameState.treasury -= V.ROUTE_COST;
  const route = createRoute(path.concat(path.slice(V.ONE, path.length - V.ONE).reverse()), true);
  if (route) { gameState.routes.push(route); gameState.caravans.push(createCaravan(route.id, gameState.caravans.length)); pushMessage(`${routeName(route)} の交易路を開設しました。`); }
  gameState.needsDom = true;
}

function findPath(start, goal, roadsOnly) {
  const queue = [[start]]; const visited = new Set([start]); const roadKeys = getRoadKeys();
  while (queue.length) {
    const path = queue.shift(); const current = path[path.length - V.ONE];
    if (current === goal) return path;
    CONFIG.MAP.edges.forEach(([a, b]) => {
      if (roadsOnly && !roadKeys.has(edgeKey(a, b))) return;
      const next = a === current ? b : b === current ? a : null;
      if (!next || visited.has(next) || !getNode(next)?.discovered) return;
      visited.add(next); queue.push(path.concat(next));
    });
  }
  return null;
}

function update() {
  if (gameState.phase !== "playing") return;
  cleanupArrays();
  if (gameState.pendingAction === "endTurn") {
    gameState.pendingAction = null;
    advanceTurn();
  }
  checkWinLoss();
}

function cleanupArrays() {
  gameState.nodes = gameState.nodes.filter(Boolean);
  gameState.roads = gameState.roads.filter(road => road && road.a && road.b);
  gameState.routes = gameState.routes.filter(route => route && route.active && Array.isArray(route.nodeIds) && route.nodeIds.length >= V.TWO);
  gameState.caravans = gameState.caravans.filter(caravan => caravan && gameState.routes.some(route => route.id === caravan.routeId));
  gameState.explorers = gameState.explorers.filter(Boolean);
  gameState.deliveredThisTurn = gameState.deliveredThisTurn.filter(Boolean);
}

function advanceTurn() {
  gameState.turn += V.ONE;
  gameState.lastRevenue = { trade: V.ZERO, tolls: V.ZERO, taxes: V.ZERO };
  gameState.deliveredThisTurn = [];
  updateExploration();
  updateProduction();
  updateDemandGeneration();
  updateProcessing();
  updateCaravans();
  updateDemandUnlocks();
  updateCircuits();
  gameState.fame = getDiscoveredNodes().length * V.FIVE + gameState.circuits.filter(c => c.completed).length * V.TWENTY;
  gameState.negativeTurns = gameState.treasury < V.ZERO ? gameState.negativeTurns + V.ONE : V.ZERO;
  gameState.needsDom = true;
}

function updateExploration() {
  gameState.explorers.forEach(explorer => {
    if (!explorer.targetId) return;
    explorer.remaining -= V.ONE;
    if (explorer.remaining <= V.ZERO) {
      const target = getNode(explorer.targetId);
      if (target) { target.discovered = true; target.known = true; pushMessage(`${target.name}を発見しました。需要と交易機会が増えます。`); }
      explorer.targetId = null; explorer.remaining = V.ZERO;
    }
  });
}

function updateProduction() {
  gameState.nodes.forEach(node => {
    if (!node.discovered) return;
    const production = CONFIG.PRODUCTION[node.type];
    if (production) node.stock[production.resource] = (node.stock[production.resource] || V.ZERO) + production.amount;
  });
}

function updateDemandGeneration() {
  gameState.nodes.forEach(node => {
    if (!node.discovered) return;
    Object.keys(CONFIG.TYPE_DEMAND[node.type] || {}).forEach(resource => {
      node.demand[resource] = (node.demand[resource] || V.ZERO) + V.DEMAND_GROWTH;
    });
    (node.facilities || []).forEach(facilityId => {
      Object.keys(CONFIG.FACILITIES[facilityId]?.demand || {}).forEach(resource => {
        node.demand[resource] = (node.demand[resource] || V.ZERO) + V.FACILITY_DEMAND_GROWTH;
      });
    });
  });
}

function updateProcessing() {
  gameState.nodes.forEach(node => {
    if (!node.discovered) return;
    (node.facilities || []).forEach(facilityId => {
      const facility = CONFIG.FACILITIES[facilityId];
      if (!facility?.input || !facility?.output) return;
      const canProcess = Object.entries(facility.input).every(([resource, amount]) => (node.stock[resource] || V.ZERO) >= amount);
      if (!canProcess) return;
      Object.entries(facility.input).forEach(([resource, amount]) => { node.stock[resource] -= amount; });
      node.stock[facility.output] = (node.stock[facility.output] || V.ZERO) + facility.amount;
    });
  });
}

function updateCaravans() {
  gameState.caravans.forEach(caravan => {
    const route = gameState.routes.find(item => item.id === caravan.routeId);
    if (!route) return;
    const currentNode = getNode(route.nodeIds[caravan.routeIndex]);
    if (currentNode) tradeAtNode(caravan, currentNode);
    caravan.routeIndex += caravan.direction;
    if (caravan.routeIndex >= route.nodeIds.length - V.ONE || caravan.routeIndex <= V.ZERO) caravan.direction *= -V.ONE;
    const nextNode = getNode(route.nodeIds[caravan.routeIndex]);
    if (currentNode && nextNode && hasRoad(currentNode.id, nextNode.id)) {
      gameState.treasury += V.TOLL_INCOME; gameState.lastRevenue.tolls += V.TOLL_INCOME;
    }
  });
  gameState.revenue.trade += gameState.lastRevenue.trade; gameState.revenue.tolls += gameState.lastRevenue.tolls; gameState.revenue.taxes += gameState.lastRevenue.taxes;
}

function tradeAtNode(caravan, node) {
  sellCargo(caravan, node);
  buyCargo(caravan, node);
}

function sellCargo(caravan, node) {
  caravan.cargo = caravan.cargo.filter(slot => {
    const need = node.demand?.[slot.resource] || V.ZERO;
    if (need <= V.ZERO) return true;
    const amount = Math.min(slot.amount, need);
    node.demand[slot.resource] -= amount;
    node.satisfied[slot.resource] = (node.satisfied[slot.resource] || V.ZERO) + amount;
    slot.amount -= amount;
    const profit = amount * (CONFIG.PRICES[slot.resource]?.sell || V.ZERO);
    const tax = Math.round(profit * V.TAX_RATE) + (node.type === "MARKET" ? V.MARKET_TAX : V.ZERO);
    gameState.treasury += profit + tax; gameState.lastRevenue.trade += profit; gameState.lastRevenue.taxes += tax;
    gameState.deliveredThisTurn.push({ resource: slot.resource, nodeId: node.id, amount });
    if (slot.amount <= V.ZERO) return false;
    return true;
  });
}

function buyCargo(caravan, node) {
  const openSlots = caravan.capacity - caravan.cargo.length;
  if (openSlots <= V.ZERO) return;
  const resources = Object.keys(node.stock || {}).filter(resource => (node.stock[resource] || V.ZERO) > V.INITIAL_STOCK);
  resources.slice(V.ZERO, openSlots).forEach(resource => {
    const buyAmount = Math.min(V.FOUR, Math.max(V.ZERO, node.stock[resource] - V.INITIAL_STOCK));
    const cost = buyAmount * (CONFIG.PRICES[resource]?.buy || V.ZERO);
    if (buyAmount <= V.ZERO || gameState.treasury < cost) return;
    node.stock[resource] -= buyAmount; gameState.treasury -= cost;
    caravan.cargo.push({ resource, amount: buyAmount, originId: node.id });
  });
}

function updateDemandUnlocks() {
  gameState.nodes.forEach(node => {
    if (!node.discovered) return;
    const totalSatisfied = Object.values(node.satisfied || {}).reduce((sum, value) => sum + value, V.ZERO);
    if (totalSatisfied >= V.DEMAND_SATISFY_UNLOCK && !node.unlocked?.facility) {
      const unlock = node.type === "CITY" || node.type === "MINE" ? "BLACKSMITH" : node.type === "FARM" || node.type === "PORT" ? "WINERY" : "MARKET_HALL";
      if (!node.facilities.includes(unlock)) node.facilities.push(unlock);
      node.unlocked.facility = true;
      const facility = CONFIG.FACILITIES[unlock];
      Object.entries(facility?.demand || {}).forEach(([resource, amount]) => { node.demand[resource] = (node.demand[resource] || V.ZERO) + amount; });
      pushMessage(`${node.name}で${facility?.label || "新施設"}が解禁され、新たな需要が生まれました。`);
    }
  });
}

function productionExists(resources) {
  return resources.every(resource => gameState.nodes.some(node => node.discovered && CONFIG.PRODUCTION[node.type]?.resource === resource));
}

function processingExists(facilityId) {
  return gameState.nodes.some(node => node.discovered && (node.facilities || []).includes(facilityId));
}

function updateCircuits() {
  gameState.circuits.forEach(circuit => {
    const delivery = gameState.deliveredThisTurn.some(item => item.resource === circuit.final && circuit.consumerTypes.includes(getNode(item.nodeId)?.type));
    circuit.deliveryGrace = delivery ? V.CIRCUIT_DELIVERY_GRACE : Math.max(V.ZERO, circuit.deliveryGrace - V.ONE);
    const active = productionExists(circuit.raw) && processingExists(circuit.processor) && circuit.deliveryGrace > V.ZERO;
    circuit.activeTurns = active ? circuit.activeTurns + V.ONE : V.ZERO;
    if (!circuit.completed && circuit.activeTurns >= V.CIRCUIT_ACTIVE_TURNS) {
      circuit.completed = true; gameState.treasury += V.FIVE_HUNDRED; pushMessage(`${CONFIG.RESOURCE_LABELS[circuit.final]}の経済回路が完成しました。報奨金を獲得。`);
    }
  });
}

function checkWinLoss() {
  const discoveredRatio = getDiscoveredNodes().length / gameState.nodes.length;
  const completed = gameState.circuits.filter(circuit => circuit.completed).length;
  if (discoveredRatio >= V.DISCOVER_GOAL_RATIO && completed >= V.CIRCUIT_GOAL) {
    gameState.phase = "gameover"; pushMessage("勝利！世界の交易網はあなたの手で結ばれました。");
  }
  if (gameState.negativeTurns >= V.NEGATIVE_LOSS_TURNS) {
    gameState.phase = "gameover"; pushMessage("敗北。債務超過が長期化し、ギルドは解散しました。");
  }
}

function render() {
  drawMap();
  drawRoads();
  drawRoutesAndCaravans();
  drawNodes();
  if (gameState.phase === "start") drawStartOverlay();
  if (gameState.phase === "gameover") drawGameOverOverlay();
  if (gameState.needsDom) renderDom();
}

function drawMap() {
  const gradient = ctx.createLinearGradient(V.ZERO, V.ZERO, V.ZERO, canvas.height);
  gradient.addColorStop(V.ZERO, CONFIG.COLORS.backgroundTop); gradient.addColorStop(V.ONE, CONFIG.COLORS.backgroundBottom);
  ctx.fillStyle = gradient; ctx.fillRect(V.ZERO, V.ZERO, canvas.width, canvas.height);
  ctx.fillStyle = CONFIG.COLORS.water; ctx.beginPath(); ctx.ellipse(V.ONE_HUNDRED, V.SIX_HUNDRED, V.TWO_HUNDRED, V.ONE_FORTY, V.ZERO, V.ZERO, V.PI_TWO); ctx.fill();
  ctx.beginPath(); ctx.ellipse(V.EIGHT_HUNDRED, V.ONE_HUNDRED, V.TWO_FORTY, V.ONE_SIXTY, V.ZERO, V.ZERO, V.PI_TWO); ctx.fill();
  ctx.fillStyle = CONFIG.COLORS.forest;
  for (let i = V.ZERO; i < V.EIGHTEEN; i += V.ONE) drawTree(V.SIXTY + i * V.FORTY, V.ONE_HUNDRED + (i % V.FIVE) * V.TWENTY_EIGHT);
  ctx.fillStyle = CONFIG.COLORS.desert; ctx.globalAlpha = V.ALPHA_MED; ctx.beginPath(); ctx.ellipse(V.EIGHT_HUNDRED, V.FIVE_HUNDRED, V.TWO_FORTY, V.ONE_FORTY, V.ZERO, V.ZERO, V.PI_TWO); ctx.fill(); ctx.globalAlpha = V.ONE;
}

function drawTree(x, y) { ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - V.TWELVE, y + V.TWENTY_FOUR); ctx.lineTo(x + V.TWELVE, y + V.TWENTY_FOUR); ctx.closePath(); ctx.fill(); }

function drawRoads() {
  CONFIG.MAP.edges.forEach(([a, b]) => {
    const nodeA = getNode(a); const nodeB = getNode(b); if (!nodeA || !nodeB) return;
    ctx.strokeStyle = hasRoad(a, b) ? CONFIG.COLORS.roadShadow : CONFIG.COLORS.hidden; ctx.lineWidth = V.ROAD_WIDTH; ctx.globalAlpha = hasRoad(a, b) ? V.ONE : V.ALPHA_FAINT;
    drawLine(nodeA, nodeB); ctx.strokeStyle = hasRoad(a, b) ? CONFIG.COLORS.road : CONFIG.COLORS.white; ctx.lineWidth = V.TWO; drawLine(nodeA, nodeB); ctx.globalAlpha = V.ONE;
  });
}

function drawLine(a, b) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }

function drawRoutesAndCaravans() {
  ctx.setLineDash(CONFIG.UI.routeDash); ctx.strokeStyle = CONFIG.COLORS.blue; ctx.lineWidth = V.THREE;
  gameState.routes.forEach(route => { for (let i = V.ZERO; i < route.nodeIds.length - V.ONE; i += V.ONE) { const a = getNode(route.nodeIds[i]); const b = getNode(route.nodeIds[i + V.ONE]); if (a && b) drawLine(a, b); } });
  ctx.setLineDash([]);
  gameState.caravans.forEach(caravan => {
    const route = gameState.routes.find(item => item.id === caravan.routeId); const node = getNode(route?.nodeIds?.[caravan.routeIndex]); if (!node) return;
    safeDrawImage(ctx, assets.caravan, node.x - V.TWENTY_FOUR, node.y - V.SIXTY, V.FORTY_EIGHT, V.THIRTY_TWO, () => { ctx.font = `${V.THIRTY}px serif`; ctx.fillText("🐎", node.x - V.EIGHTEEN, node.y - V.FORTY); });
  });
}

function drawNodes() {
  gameState.nodes.forEach(node => {
    if (!node.discovered) { drawHiddenNode(node); return; }
    const radius = node.type === "HOME" || node.type === "CITY" ? V.NODE_RADIUS : V.SMALL_NODE_RADIUS;
    ctx.save(); ctx.shadowColor = CONFIG.COLORS.black; ctx.shadowBlur = CONFIG.UI.shadowBlur;
    ctx.fillStyle = CONFIG.COLORS[`${node.type.toLowerCase()}Node`] || CONFIG.COLORS[node.type.toLowerCase()] || CONFIG.COLORS.home;
    ctx.beginPath(); ctx.arc(node.x, node.y, radius, V.ZERO, V.PI_TWO); ctx.fill(); ctx.strokeStyle = gameState.selectedNodeId === node.id ? CONFIG.COLORS.selected : CONFIG.COLORS.discovered; ctx.lineWidth = V.THREE; ctx.stroke();
    safeDrawImage(ctx, assets[node.type], node.x - radius, node.y - radius, radius * V.TWO, radius * V.TWO, () => { ctx.font = `${radius}px serif`; ctx.fillText(nodeIcon(node.type), node.x - radius * V.HALF, node.y + radius * V.HALF); });
    ctx.restore(); drawNodeLabel(node);
  });
}

function drawHiddenNode(node) { ctx.fillStyle = CONFIG.COLORS.overlay; ctx.beginPath(); ctx.arc(node.x, node.y, V.SMALL_NODE_RADIUS, V.ZERO, V.PI_TWO); ctx.fill(); ctx.strokeStyle = CONFIG.COLORS.gold; ctx.stroke(); ctx.font = CONFIG.UI.bigFont; ctx.fillStyle = CONFIG.COLORS.white; ctx.fillText("?", node.x - V.TEN, node.y + V.TWELVE); }
function nodeIcon(type) { return { HOME: "🏰", FOREST: "🌲", FARM: "🌾", MINE: "⛏", MARKET: "⚖", PORT: "⚓", CITY: "🏙" }[type] || "◆"; }
function drawNodeLabel(node) { ctx.font = CONFIG.UI.nodeFont; ctx.fillStyle = CONFIG.COLORS.panel; const text = node.name; const width = ctx.measureText(text).width + V.TEXT_PAD * V.TWO; ctx.fillRect(node.x - width * V.HALF, node.y - V.FIFTY, width, V.TWENTY_EIGHT); ctx.strokeStyle = CONFIG.COLORS.gold; ctx.strokeRect(node.x - width * V.HALF, node.y - V.FIFTY, width, V.TWENTY_EIGHT); ctx.fillStyle = CONFIG.COLORS.white; ctx.fillText(text, node.x - width * V.HALF + V.TEXT_PAD, node.y - V.THIRTY); }

function drawStartOverlay() { drawOverlay("交易路開拓シミュレーション", "クリックしてギルドを創設"); }
function drawGameOverOverlay() { drawOverlay(gameState.messages[V.ZERO] || "ゲーム終了", "クリックで新しい交易網を開始"); }
function drawOverlay(title, subtitle) { ctx.fillStyle = CONFIG.COLORS.overlay; ctx.fillRect(V.ZERO, V.ZERO, canvas.width, canvas.height); ctx.textAlign = "center"; ctx.fillStyle = CONFIG.COLORS.gold; ctx.font = CONFIG.UI.bigFont; ctx.fillText(title, canvas.width * V.HALF, canvas.height * V.HALF - V.THIRTY); ctx.fillStyle = CONFIG.COLORS.white; ctx.font = CONFIG.UI.nodeFont; ctx.fillText(subtitle, canvas.width * V.HALF, canvas.height * V.HALF + V.TWENTY); ctx.textAlign = "start"; }

function renderDom() {
  ui.guildName.textContent = `名声 ${money(gameState.fame)}`; ui.treasury.textContent = money(gameState.treasury); ui.turnLabel.textContent = `ターン ${gameState.turn}`;
  ui.messageBar.textContent = gameState.messages[V.ZERO] || "";
  renderExplorationPanel(); renderSelectedPanel(); renderCaravanPanel(); renderGoalPanel(); renderRumors(); renderCircuitPanel(); renderTradePanel(); renderRevenuePanel(); renderProductionPanel();
  ui.endTurnButton.disabled = gameState.phase !== "playing"; ui.exploreButton.disabled = gameState.phase !== "playing"; ui.buildRoadButton.disabled = gameState.phase !== "playing"; ui.routeButton.disabled = gameState.phase !== "playing";
  gameState.needsDom = false;
}

function renderExplorationPanel() { ui.explorationPanel.innerHTML = gameState.explorers.map(explorer => { const target = getNode(explorer.targetId); const progress = explorer.targetId ? (V.EXPLORATION_TURNS - explorer.remaining) / V.EXPLORATION_TURNS * V.ONE_HUNDRED : V.ZERO; return `<div class="stat"><span>探検隊</span><strong>${explorer.targetId ? target?.name || "未知" : "待機中"}</strong></div><div class="progress"><span style="width:${progress}%"></span></div><div>残りターン ${explorer.remaining}</div>`; }).join(""); }
function renderSelectedPanel() { const node = getNode(gameState.selectedNodeId); ui.selectedName.textContent = node?.name || "未選択"; if (!node) { ui.selectedPanel.innerHTML = ""; return; } const demand = Object.entries(node.demand || {}).map(([res, amount]) => `<div class="stat"><span>${resourceLabel(res)}</span><strong class="${amount > V.ZERO ? "bad" : "good"}">${amount}</strong></div>`).join(""); const stock = Object.entries(node.stock || {}).map(([res, amount]) => `<span class="badge">${resourceLabel(res)} ${amount}</span>`).join(""); const facilities = (node.facilities || []).map(id => `<span class="badge">${CONFIG.FACILITIES[id]?.label || id}</span>`).join(""); ui.selectedPanel.innerHTML = `<div class="stat"><span>種別</span><strong>${CONFIG.SETTLEMENT_LABELS[node.type]}</strong></div><div class="stat"><span>発見</span><strong>${node.discovered ? "済" : "未"}</strong></div><h2>施設</h2>${facilities || "なし"}<h2>需要</h2>${demand || "なし"}<h2>在庫</h2>${stock || "なし"}`; }
function renderCaravanPanel() { ui.caravanPanel.innerHTML = gameState.caravans.map(caravan => { const route = gameState.routes.find(item => item.id === caravan.routeId); const cargo = caravan.cargo.map(slot => `<span class="badge">${resourceLabel(slot.resource)} ${slot.amount}</span>`).join("") || "空荷"; return `<div class="stat"><span>${caravan.id}</span><strong>${caravan.cargo.length}/${caravan.capacity}</strong></div><div>${cargo}</div><small>${routeName(route)}</small>`; }).join(""); }
function renderGoalPanel() { const discovered = Math.round(getDiscoveredNodes().length / gameState.nodes.length * V.ONE_HUNDRED); const circuits = gameState.circuits.filter(c => c.completed).length; ui.goalList.innerHTML = `<li>発見率 ${discovered}% / ${V.EIGHTY}% 以上</li><li>経済回路 ${circuits} / ${V.CIRCUIT_GOAL} 完成</li><li>債務超過 ${gameState.negativeTurns} / ${V.NEGATIVE_LOSS_TURNS} ターン</li>`; }
function renderRumors() { const hidden = CONFIG.MAP.nodes.filter(node => !getNode(node.id)?.discovered).slice(V.ZERO, V.THREE); ui.rumorList.innerHTML = hidden.map(node => `<li>${node.name}には${CONFIG.SETTLEMENT_LABELS[node.type]}があるらしい</li>`).join("") || "<li>未知の噂はありません。</li>"; }
function renderCircuitPanel() { ui.circuitPanel.innerHTML = gameState.circuits.map(c => `<div class="stat"><span>${c.raw.map(resourceLabel).join(" + ")} → ${CONFIG.RESOURCE_LABELS[c.final]}</span><strong class="${c.completed ? "good" : ""}">${c.activeTurns}/${V.CIRCUIT_ACTIVE_TURNS}</strong></div>`).join(""); }
function renderTradePanel() { const last = gameState.deliveredThisTurn.slice(V.ZERO, V.FOUR).map(item => `${resourceLabel(item.resource)} → ${getNode(item.nodeId)?.name || "?"}`).join("<br>"); ui.tradePanel.innerHTML = last || "キャラバンが余剰品を探しています。"; }
function renderRevenuePanel() { ui.revenuePanel.innerHTML = `<div class="stat"><span>交易利益</span><strong>+${money(gameState.lastRevenue.trade)}</strong></div><div class="stat"><span>街道利用料</span><strong>+${money(gameState.lastRevenue.tolls)}</strong></div><div class="stat"><span>市場税</span><strong>+${money(gameState.lastRevenue.taxes)}</strong></div><div class="stat"><span>累計</span><strong>${money(gameState.revenue.trade + gameState.revenue.tolls + gameState.revenue.taxes)}</strong></div>`; }
function renderProductionPanel() { ui.productionPanel.innerHTML = getDiscoveredNodes().map(node => { const production = CONFIG.PRODUCTION[node.type]; const processed = (node.facilities || []).map(id => CONFIG.FACILITIES[id]).filter(f => f?.output).map(f => `${CONFIG.RESOURCE_LABELS[f.output]} +${f.amount}`).join(" / "); return production || processed ? `<div class="stat"><span>${node.name}</span><strong>${production ? `${CONFIG.RESOURCE_LABELS[production.resource]} +${production.amount}` : processed}</strong></div>` : ""; }).join(""); }

function handleCanvasClick(event) {
  if (gameState.phase === "start" || gameState.phase === "gameover") { initGame(); return; }
  const rect = canvas.getBoundingClientRect(); const scaleX = canvas.width / rect.width; const scaleY = canvas.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX; const y = (event.clientY - rect.top) * scaleY;
  const clicked = gameState.nodes.find(node => Math.hypot(node.x - x, node.y - y) <= V.SELECT_RADIUS);
  if (clicked) { gameState.selectedNodeId = clicked.id; gameState.needsDom = true; }
}

ui.endTurnButton.addEventListener("click", () => { gameState.pendingAction = "endTurn"; });
ui.exploreButton.addEventListener("click", startExploration);
ui.buildRoadButton.addEventListener("click", buildRoadAction);
ui.routeButton.addEventListener("click", createTradeRouteAction);
canvas.addEventListener("click", handleCanvasClick);

function gameLoop(timestamp) {
  if (timestamp - gameState.lastFrame >= V.FPS_INTERVAL) { gameState.lastFrame = timestamp; update(); render(); }
  requestAnimationFrame(gameLoop);
}

render();
requestAnimationFrame(gameLoop);
