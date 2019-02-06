#!/usr/bin/env bash

npm run build \
    && rsync --archive \
        --progress \
        --verbose \
        --delete-after \
        dist/ \
        barneyb@barneyb.com:/vol/www/barneyb.com/eventlog/apps/el-tag-editor/
