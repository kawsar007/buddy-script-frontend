import { STORAGE_KEYS } from "../constants/storage";

export function getThemeInitScript(): string {
  return `(function(){try{var k="${STORAGE_KEYS.theme}";var s=localStorage.getItem(k);var t=(s==="light"||s==="dark"||s==="system")?s:"system";var r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t;if(r==="dark"){document.documentElement.classList.add("dark");}}catch(e){}})();`;
}
