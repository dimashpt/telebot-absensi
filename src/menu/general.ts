import { createBackMainMenuButtons } from 'grammy-inline-menu';
import { MainContext } from '../context';

export default createBackMainMenuButtons<MainContext>(
  (ctx) => 'Back',
  (ctx) => 'Main Menu',
);
