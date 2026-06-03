# perf - personal performance tracker

A simple CLI tool to track daily metrics (focus, tasks, habits, etc.).

## Build

    go build -o perf .

## Usage

    perf log <metric> <value> [--note "..."] [--date YYYY-MM-DD]
    perf list [--metric <name>] [--limit N]
    perf today
    perf week
    perf stats
    perf goal [<metric> <target>]
    perf delete <id>
    perf path

## Examples

    perf log focus 6 --note "deep work block"
    perf log tasks 12
    perf goal focus 8
    perf today
    perf stats

Data is stored in ~/.perf-tracker/data.json (configurable via PERF_DATA_DIR).