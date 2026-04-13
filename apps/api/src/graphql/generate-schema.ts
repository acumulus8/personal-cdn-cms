import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { printSchema, lexicographicSortSchema } from 'graphql';
import { schema } from './schema';


const sortedSchema = lexicographicSortSchema(schema);
const schemaString = printSchema(sortedSchema);
const outputPath = resolve(__dirname, '../../schema.graphql');

if (!outputPath) {
  throw new Error('Output path is not defined');
}

console.log('Schema generated successfully:', outputPath);

try {
  writeFileSync(outputPath, schemaString);
  console.log('Schema file written successfully:', outputPath);
} catch (error) {
  console.error('Error writing schema file:', error);
  throw error;
}