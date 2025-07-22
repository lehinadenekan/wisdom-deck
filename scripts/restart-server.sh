#!/bin/bash

# Function to kill process using a port
kill_port() {
    local port=$1
    local pid=$(lsof -ti:$port)
    if [ ! -z "$pid" ]; then
        echo "Killing process $pid on port $port"
        kill -9 $pid
    else
        echo "No process found on port $port"
    fi
}

echo "Killing any process on port 3000..."
kill_port 3000

echo "Killing any process on port 3001..."
kill_port 3001

echo "Killing any process on port 3002..."
kill_port 3002

echo "Waiting for processes to stop..."
sleep 2

echo "Starting server on port 3000..."
npm run dev:force 