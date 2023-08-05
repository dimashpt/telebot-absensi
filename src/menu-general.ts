import { createBackMainMenuButtons } from 'grammy-inline-menu';
import { MainContext } from './context';

export const backButtons = createBackMainMenuButtons<MainContext>(
  (ctx) => 'Back',
  (ctx) => 'Main Menu',
);
