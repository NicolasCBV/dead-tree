#!/bin/bash

. ./tools/globals/flags.sh

echo -e "${INFO_FLAG} BENCHMARK PIPELINE"

echo -e "${INFO_FLAG} Executing build..."

pnpm tsup ./**/*.bench.ts -d ./dist

collection_targets=(2000 200000 2000000)
for i in ${collection_targets[@]}; do
	echo -e "${INFO_FLAG} Collection target is ${i}"

	echo -e "${INFO_FLAG} Running iteration.bench.js"
	COLLECTION_TARGET=collection_target \
		node ./dist/iteration.bench.js

	echo -e "${INFO_FLAG} Running delete.bench.js"
	COLLECTION_TARGET=collection_target \
		node ./dist/delete.bench.js

	echo -e "${INFO_FLAG} Running insert.bench.js"
	COLLECTION_TARGET=collection_target \
		node ./dist/insert.bench.js

	echo -e "${INFO_FLAG} Running search.bench.js"
	COLLECTION_TARGET=collection_target \
		node ./dist/search.bench.js
	echo -e "\n===========================\n"
done
