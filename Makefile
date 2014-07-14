REPORTER=spec #dot #nyan #tap #list #progress #json #json-stream #min #doc

build: components index.js
				@component build

components:
	@Component install

clean:
	rm -Rf build components

test:
	 @NODE_ENV=test ./node_modules/.bin/mocha	\
		--require should \
		--reporter $(REPORTER) \

.PHONY: clean test