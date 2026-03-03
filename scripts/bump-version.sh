#!/bin/bash

# Get current version from package.json
CURRENT_VERSION=$(node -p "require('./package.json').version")

# Split version into components
IFS='.' read -ra VERSION_PARTS <<< "$CURRENT_VERSION"
MAJOR=${VERSION_PARTS[0]}
MINOR=${VERSION_PARTS[1]}
PATCH=${VERSION_PARTS[2]}

# Increment patch version
NEW_PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$NEW_PATCH"

# Update package.json
npm version $NEW_VERSION --no-git-tag-version

echo "Version bumped from $CURRENT_VERSION to $NEW_VERSION"