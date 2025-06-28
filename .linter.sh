#!/bin/bash
cd /home/kavia/workspace/code-generation/reacttodolite-115189-bb4d8ca8/frontend_todo_app
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

