export interface Employee {
  nik: string;
  username: string;
  nama_pegawai: string;
  jabatan: string;
  gaji_pokok: number;
  tunjangan: number;
  total_gaji: number;
  masa_kerja: Date | string;
  aktif: boolean;
}
