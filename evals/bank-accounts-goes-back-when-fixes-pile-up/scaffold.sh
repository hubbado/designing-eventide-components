#!/usr/bin/env bash
# Puts the design of an earlier session in the workspace, so that the case
# starts at the stage that the design has reached. The case's own files add
# two later changes to the walked design.
set -euo pipefail
cp -R "$(dirname "$0")/../fixtures/walked-design/." .
cp -R "$(dirname "$0")/workspace/." .
