#!/usr/bin/env bash

npm run build \
    && rsync --archive \
        --progress \
        --verbose \
        dist/ \
        barneyb.com:/vol/www/barneyb.com/eventlog/apps/el-tag-editor/
