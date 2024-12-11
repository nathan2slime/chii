#!/bin/sh

set -e

echo "running database default migration"
pnpm db:migrate:deploy --filter=@db/default

echo "running database store migration"
pnpm db:migrate

pnpm install
exec pnpm start
