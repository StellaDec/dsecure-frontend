
import { PAGE_SEO } from './src/utils/seo';

Object.entries(PAGE_SEO).forEach(([key, value]) => {
  if (value.title) {
    if (value.title.length > 60) {
      console.log(`[LONG] ${key}: ${value.title.length} chars - "${value.title}"`);
    } else if (value.title.length < 30) {
      console.log(`[SHORT] ${key}: ${value.title.length} chars - "${value.title}"`);
    } else {
      console.log(`[OK] ${key}: ${value.title.length} chars - "${value.title}"`);
    }
  }
});
