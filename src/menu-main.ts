import { MenuTemplate } from "grammy-inline-menu";
import { MainContext } from "./context";
import menuPresensi from "./presensi";

const menu = new MenuTemplate<MainContext>(ctx => 'Main menu');

menu.submenu(() => '✅ Presensi', 'presensi', menuPresensi);
menu.submenu(() => '📝 Riwayat Kehadiran', 'riwayat', menuPresensi);
menu.submenu(() => '🙎‍♂️ Informasi Umum', 'informasi', menuPresensi);
menu.submenu(() => '⚙️ Pengaturan', 'pengaturan', menuPresensi);

export default menu;