export interface Employee {
  error: boolean;
  message: string;
  nip: string;
  username: string;
  nama_pegawai: string;
  jabatan: string;
  gaji_pokok: number;
  tunjangan: number;
  total_gaji: number;
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
