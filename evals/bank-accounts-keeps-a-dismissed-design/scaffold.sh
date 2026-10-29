#!/usr/bin/env bash
# Puts the design of an earlier session in the workspace, so that the case
# starts at the stage that the design has reached.
set -euo pipefail
cp -R "$(dirname "$0")/../fixtures/walked-design/." .
