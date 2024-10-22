#!/bin/bash

# Get all versions except the latest
versions=$(npm view webpack-plugin-responsive-app versions --json | jq -r '.[]' | grep -v $(npm view webpack-plugin-responsive-app version))

# Loop through the versions and deprecate them
for version in $versions
do
  npm deprecate webpack-plugin-responsive-app@$version "This version is deprecated. Please use the latest version."
done
