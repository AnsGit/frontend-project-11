install:
	npm ci

develop:
	npx webpack serve --mode development --hot --open

build:
	NODE_ENV=production npx webpack

publish:
	npm publish --dry-run

test:
	npx jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .