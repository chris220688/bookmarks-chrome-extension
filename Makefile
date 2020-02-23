build:
	ajv compile -s src/schema/schema.json -o src/schema/validateSchema.js --all-errors
	npm run build
