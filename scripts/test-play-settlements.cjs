const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
function load(name, dependencies = {}) {
	const source = fs.readFileSync(
		'src/components/pages/play/' + name + '.ts',
		'utf8',
	);
	const code = ts.transpileModule(source, {
		compilerOptions: {
			module: ts.ModuleKind.CommonJS,
			target: ts.ScriptTarget.ES2022,
		},
	}).outputText;
	const module = { exports: {} };
	new Function('require', 'module', 'exports', code)(
		(path) => {
			assert(path in dependencies);
			return dependencies[path];
		},
		module,
		module.exports,
	);
	return module.exports;
}
const terrain = load('terrain');
const { getSettlement } = load('settlements', { './terrain': terrain });
let villages = 0,
	houses = 0;
for (let seed = 1; seed <= 100; seed++)
	for (let cx = -4; cx <= 4; cx++)
		for (let cz = -4; cz <= 4; cz++) {
			const settlement = getSettlement(cx, cz, seed);
			assert.deepEqual(settlement, getSettlement(cx, cz, seed));
			if (!settlement) continue;
			villages++;
			assert(settlement.houses.length >= 3 && settlement.houses.length <= 6);
			for (const h of settlement.houses) {
				houses++;
				assert(h.base > 1.6);
				assert(h.y > h.base && h.y - h.base <= 1.6);
				assert(h.x - h.width / 2 >= cx * 48 && h.x + h.width / 2 <= (cx + 1) * 48);
				assert(h.z - h.depth / 2 >= cz * 48 && h.z + h.depth / 2 <= (cz + 1) * 48);
				for (const [dx, dz] of [
					[-h.width / 2, -h.depth / 2],
					[h.width / 2, -h.depth / 2],
					[-h.width / 2, h.depth / 2],
					[h.width / 2, h.depth / 2],
				]) {
					assert(terrain.groundHeight(h.x + dx, h.z + dz, seed) < h.y);
				}
			}
		}
assert(villages > 400 && villages < 2200);
console.log(
	JSON.stringify({
		testedChunks: 8100,
		villages,
		houses,
		deterministic: true,
		dryGround: true,
		foundations: true,
		withinChunk: true,
	}),
);
