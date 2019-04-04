#!/bin/sh -e

usage() {
  echo "OVERVIEW: Build apps according to BUILD_ENV value. Meant to be used for Heroku deployment"
  exit
}

if [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  usage
fi

(
  PROJECT_ROOT="$(cd $(dirname $0)/..; pwd)"

  # cd $PROJECT_ROOT

  if [ "$BUILD_ENV" = "api" ]; then
    cd packages/api
    yarn install --production=false
    yarn build
  elif [ "$BUILD_ENV" = "web" ]; then
    cd packages/next
    yarn install --production=false
    yarn build
  else
    echo "Error: no build config for BUILD_ENV value '$BUILD_ENV'"
    exit 1
  fi
)