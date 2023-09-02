export interface Employee {
  error: boolean;
  message: string;
  nip: string;
  username: string;
  nama_pegawai: string;
  jabatan: string;
  gaji: number;
  masa_kerja: Date | string;
  aktif: boolean;
  sisa_cuti: number;
}

export interface EmployeeDetails {
  error: boolean;
  message: string;
  nama_lengkap: string;
  jenis_kelamin: string;
  tempat_lahir: string;
  tanggal_lahir: Date | string;
  telepon: string;
  agama: string;
  menikah: boolean;
  alamat: string;
  no_ktp: string;
  no_npwp: string;
  isi_detail: boolean;
}

export interface Cuti {
  username: string;
  tanggal_cuti: Date | string;
  tanggal_akhir_cuti: Date | string;
  jumlah_hari: number;
  alasan_cuti: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface CutiResponse {
  sisa_cuti: number;
  history_cuti: Cuti[];
}

export interface PresensiResponse {
  error?: boolean;
  message?: string;
}

export interface Presensi {
  username: string;
  nama: string;
  tanggal: Date | string;
  jam_datang: string;
  jam_pulang: string;
  koordinat_datang: string;
  koordinat_pulang: string;
  status: string;
  keterangan: string;
}

export interface PresensiHistoryResponse {
  history_presensi: Presensi[];
}

export interface Pengaturan {
  nama_perusahaan: string;
  jam_kedatangan: string;
  jam_pulang: string;
  latitude: string;
  longitud: string;
  radius: number;
  cuti_tahunan: number;
  alamat_kantor: string;
  username_portal?: string;
  password_portal?: string;
}
