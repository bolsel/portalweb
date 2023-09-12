import { promises as fs } from 'fs';
import {
  importDirectory,
  cleanupSVG,
  runSVGO,
  parseColors,
  isEmptyColor,
} from '@iconify/tools';
import * as path from 'path';

(async () => {
  // Import icons
  const iconSet = await importDirectory(path.resolve('svg'), {
    prefix: 'base',
  });
  const iconNames = [];
  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
    if (type !== 'icon') {
      return;
    }
    iconNames.push(`'${name}'`);
    const svg = iconSet.toSVG(name);
    if (!svg) {
      // Invalid icon
      iconSet.remove(name);
      return;
    }

    // Clean up and optimise icons
    try {
      // Clean up icon code
      await cleanupSVG(svg);

      // Assume icon is monotone: replace color with currentColor, add if missing
      // If icon is not monotone, remove this code
      // await parseColors(svg, {
      //   // defaultColor: 'currentColor',
      //   callback: (attr, colorStr, color) => {
      //     return !color || isEmptyColor(color) ? colorStr : 'currentColor';
      //   },
      // });

      // Optimise
      await runSVGO(svg);
    } catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err);
      iconSet.remove(name);
      return;
    }

    // Update icon
    iconSet.fromSVG(name, svg);
  });

  // Export as IconifyJSON
  const exported = JSON.stringify(iconSet.export(), null, '\t') + '\n';
  const tsfile = `const icons = ${exported};\nexport default icons;`;
  // Save to file
  await fs.writeFile(`../src/components/icons/collections.ts`, tsfile, 'utf8');
})();
