import {
  AttackDistribution, HitDistribution, Hitsplat, WeightedHit,
} from '@/lib/HitDist';

export const crimsonKistenSpec = (acc: number, max: number): AttackDistribution => {
  const dist = new HitDistribution([]);

  const exactlyK = (k: number): number => {
    const choose4 = [1, 4, 6, 4, 1];
    return choose4[k] * (acc ** k) * ((1 - acc) ** (4 - k));
  };

  // 1 successful roll: 70-110% of max
  const low1 = Math.trunc(max * 7 / 10);
  const high1 = Math.trunc(max * 11 / 10);
  const chancePerDmg1 = exactlyK(1) / (high1 - low1 + 1);
  for (let dmg = low1; dmg <= high1; dmg++) {
    dist.addHit(new WeightedHit(chancePerDmg1, [new Hitsplat(dmg)]));
  }

  // 2 successful rolls: 90-130% of max
  const low2 = Math.trunc(max * 9 / 10);
  const high2 = Math.trunc(max * 13 / 10);
  const chancePerDmg2 = exactlyK(2) / (high2 - low2 + 1);
  for (let dmg = low2; dmg <= high2; dmg++) {
    dist.addHit(new WeightedHit(chancePerDmg2, [new Hitsplat(dmg)]));
  }

  // 3 successful rolls: 110-150% of max
  const low3 = Math.trunc(max * 11 / 10);
  const high3 = Math.trunc(max * 15 / 10);
  const chancePerDmg3 = exactlyK(3) / (high3 - low3 + 1);
  for (let dmg = low3; dmg <= high3; dmg++) {
    dist.addHit(new WeightedHit(chancePerDmg3, [new Hitsplat(dmg)]));
  }

  // 4 successful rolls: 130-170% of max, max hit reduced by 1
  const low4 = Math.trunc(max * 13 / 10);
  const high4 = Math.trunc(max * 17 / 10) - 1;
  const chancePerDmg4 = exactlyK(4) / (high4 - low4 + 1);
  for (let dmg = low4; dmg <= high4; dmg++) {
    dist.addHit(new WeightedHit(chancePerDmg4, [new Hitsplat(dmg)]));
  }

  // All 4 rolls fail: complete miss
  dist.addHit(new WeightedHit(exactlyK(0), [Hitsplat.INACCURATE]));

  return new AttackDistribution([dist]);
};
