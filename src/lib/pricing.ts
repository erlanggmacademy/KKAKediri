import { WAVES, type Wave } from '../data/competition';

/**
 * Mendapatkan gelombang yang sedang aktif saat ini.
 * Default ke Gelombang yang ditandai isActive atau gelombang pertama.
 */
export function getActiveWave(customDate: Date = new Date()): Wave {
  // Cek apakah ada gelombang yang secara eksplisit aktif atau sesuai rentang tanggal
  const dateStr = customDate.toISOString().slice(0, 10);
  const matchedWave = WAVES.find(
    (w) => dateStr >= w.startDate && dateStr <= w.endDate
  );

  if (matchedWave) {
    return matchedWave;
  }

  // Fallback: wave dengan isActive: true atau gelombang pertama
  return WAVES.find((w) => w.isActive) || WAVES[0];
}

/**
 * Menghitung harga pendaftaran berdasarkan jenjang dan gelombang.
 */
export function getPriceForLevel(
  levelId: 'sd' | 'smp' | 'sma' | string,
  wave?: Wave
): number {
  const targetWave = wave || getActiveWave();
  const key = levelId.toLowerCase() as 'sd' | 'smp' | 'sma';
  return targetWave.prices[key] || targetWave.prices.sd;
}

/**
 * Format angka ke mata uang Rupiah (contoh: Rp25.000).
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}
