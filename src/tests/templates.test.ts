/**
 * Template Integrity Tests for All 24 Master Templates
 */
import { TEMPLATES_LIBRARY } from '../templates/templatesData.ts';

export function testTemplatesLibrary(): boolean {
  if (TEMPLATES_LIBRARY.length !== 24) {
    throw new Error(`Expected 24 templates, found ${TEMPLATES_LIBRARY.length}`);
  }

  const ids = new Set<string>();
  for (const t of TEMPLATES_LIBRARY) {
    if (ids.has(t.id)) {
      throw new Error(`Duplicate template ID found: ${t.id}`);
    }
    ids.add(t.id);

    if (!t.elements || t.elements.length < 15) {
      throw new Error(`Template ${t.id} has insufficient element density (${t.elements.length})`);
    }
  }

  return true;
}

testTemplatesLibrary();
