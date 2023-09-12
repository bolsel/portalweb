export const kategoryText = (category) => {
  if (category === 'dokumen-perencanaan') return 'Dokumen Perencanaan';
  else if (category === 'laporan-keuangan') return 'Dokumen Laporan Keuangan';
  else if (category === 'lainnya') return 'Dokumen Lainnya';
  else return category;
};
