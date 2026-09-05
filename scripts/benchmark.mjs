/**
 * Benchmark Script for CMAKER Template Deserialization & Batch Cloning
 */
import { performance } from 'node:perf_hooks';

console.log('=== CMAKER Batch Performance Benchmark ===');
const samplePayload = JSON.stringify({
  id: 'bench-cert',
  title: 'Executive Certificate of High Performance',
  recipient: 'Dr. Benchmark Test',
  date: '2026-09-05',
  elements: Array.from({ length: 25 }, (_, i) => ({
    id: `elem-${i}`,
    type: 'text',
    x: 100 + i * 10,
    y: 100 + i * 15,
    width: 300,
    height: 40,
    content: `Element sample text row ${i}`
  }))
});

const iterations = 5000;
const start = performance.now();

for (let i = 0; i < iterations; i++) {
  const parsed = JSON.parse(samplePayload);
  parsed.recipient = `Recipient #${i}`;
  parsed.id = `CERT-BENCH-${i}`;
  JSON.stringify(parsed);
}

const elapsed = performance.now() - start;
console.log(`Processed ${iterations} template clones in ${elapsed.toFixed(2)}ms`);
console.log(`Throughput: ${Math.round((iterations / elapsed) * 1000)} templates/sec`);
console.log('=== Benchmark Complete ===');
