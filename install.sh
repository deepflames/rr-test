#!/bin/bash
set -e

echo "Register npm server"
npm set registry https://registry.npmjs.org && \

echo "Install modules..."
npm install
