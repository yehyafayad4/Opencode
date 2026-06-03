package main

import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"time"
)

type Entry struct {
	ID        int64     `json:"id"`
	Metric    string    `json:"metric"`
	Value     float64   `json:"value"`
	Note      string    `json:"note,omitempty"`
	Timestamp time.Time `json:"timestamp"`
	Date      string    `json:"date"`
}

type Goal struct {
	Metric string  `json:"metric"`
	Target float64 `json:"target"`
}

type Store struct {
	Entries []Entry `json:"entries"`
	Goals   []Goal  `json:"goals"`
	NextID  int64   `json:"next_id"`
}

var store Store

func dataPath() (string, error) {
	dir := os.Getenv("PERF_DATA_DIR")
	if dir == "" {
		home, err := os.UserHomeDir()
		if err != nil {
			return "", err
		}
		dir = filepath.Join(home, ".perf-tracker")
	}
	if err := os.MkdirAll(dir, 0o755); err != nil {
		return "", err
	}
	return filepath.Join(dir, "data.json"), nil
}

func load() error {
	path, err := dataPath()
	if err != nil {
		return err
	}
	f, err := os.ReadFile(path)
	if err != nil {
		if errors.Is(err, os.ErrNotExist) {
			store = Store{}
			return nil
		}
		return err
	}
	if len(f) == 0 {
		store = Store{}
		return nil
	}
	return json.Unmarshal(f, &store)
}

func save() error {
	path, err := dataPath()
	if err != nil {
		return err
	}
	b, err := json.MarshalIndent(store, "", "  ")
	if err != nil {
		return err
	}
	tmp := path + ".tmp"
	if err := os.WriteFile(tmp, b, 0o644); err != nil {
		return err
	}
	return os.Rename(tmp, path)
}

func today() string {
	return time.Now().Format("2006-01-02")
}

func parseDate(s string) (time.Time, error) {
	return time.Parse("2006-01-02", s)
}

func cmdLog(args []string) error {
	if len(args) < 2 {
		return errors.New("usage: perf log <metric> <value> [--note \"...\"] [--date YYYY-MM-DD]")
	}
	metric := strings.ToLower(strings.TrimSpace(args[0]))
	valueStr := args[1]
	note := ""
	date := today()

	for i := 2; i < len(args); i++ {
		switch args[i] {
		case "--note", "-n":
			if i+1 < len(args) {
				note = args[i+1]
				i++
			}
		case "--date", "-d":
			if i+1 < len(args) {
				date = args[i+1]
				i++
			}
		}
	}

	if _, err := parseDate(date); err != nil {
		return fmt.Errorf("invalid date %q (expected YYYY-MM-DD)", date)
	}

	value, err := strconv.ParseFloat(valueStr, 64)
	if err != nil {
		return fmt.Errorf("invalid value %q: %w", valueStr, err)
	}

	entry := Entry{
		ID:        store.NextID,
		Metric:    metric,
		Value:     value,
		Note:      note,
		Date:      date,
		Timestamp: time.Now(),
	}
	store.Entries = append(store.Entries, entry)
	store.NextID++

	if err := save(); err != nil {
		return err
	}
	fmt.Printf("logged #%d  %s = %.2f  (%s)\n", entry.ID, entry.Metric, entry.Value, entry.Date)
	return nil
}

func cmdList(args []string) error {
	metric := ""
	limit := 20
	for i := 0; i < len(args); i++ {
		switch args[i] {
		case "--metric", "-m":
			if i+1 < len(args) {
				metric = strings.ToLower(args[i+1])
				i++
			}
		case "--limit", "-l":
			if i+1 < len(args) {
				n, err := strconv.Atoi(args[i+1])
				if err == nil {
					limit = n
				}
				i++
			}
		}
	}

	entries := make([]Entry, 0, len(store.Entries))
	for _, e := range store.Entries {
		if metric != "" && e.Metric != metric {
			continue
		}
		entries = append(entries, e)
	}
	sort.Slice(entries, func(i, j int) bool { return entries[i].Timestamp.After(entries[j].Timestamp) })

	if len(entries) > limit {
		entries = entries[:limit]
	}

	if len(entries) == 0 {
		fmt.Println("no entries found")
		return nil
	}

	fmt.Printf("%-5s %-14s %-10s %-8s  %s\n", "ID", "DATE", "METRIC", "VALUE", "NOTE")
	fmt.Println(strings.Repeat("-", 60))
	for _, e := range entries {
		note := e.Note
		if len(note) > 30 {
			note = note[:27] + "..."
		}
		fmt.Printf("%-5d %-14s %-10s %-8.2f  %s\n", e.ID, e.Date, e.Metric, e.Value, note)
	}
	return nil
}

func cmdToday() error {
	return showRange(today(), today(), "today")
}

func cmdWeek() error {
	end := time.Now()
	start := end.AddDate(0, 0, -6)
	return showRange(start.Format("2006-01-02"), end.Format("2006-01-02"), "last 7 days")
}

func showRange(from, to, label string) error {
	fromT, _ := parseDate(from)
	toT, _ := parseDate(to)

	type agg struct {
		sum   float64
		count int
	}
	bucket := map[string]*agg{}
	for _, e := range store.Entries {
		d, err := parseDate(e.Date)
		if err != nil {
			continue
		}
		if d.Before(fromT) || d.After(toT) {
			continue
		}
		if _, ok := bucket[e.Metric]; !ok {
			bucket[e.Metric] = &agg{}
		}
		bucket[e.Metric].sum += e.Value
		bucket[e.Metric].count++
	}

	if len(bucket) == 0 {
		fmt.Printf("no entries for %s\n", label)
		return nil
	}

	metrics := make([]string, 0, len(bucket))
	for m := range bucket {
		metrics = append(metrics, m)
	}
	sort.Strings(metrics)

	fmt.Printf("%s (%s -> %s)\n", strings.ToUpper(label), from, to)
	fmt.Printf("%-14s %-8s %-10s %-12s\n", "METRIC", "TOTAL", "COUNT", "AVG")
	fmt.Println(strings.Repeat("-", 50))
	for _, m := range metrics {
		a := bucket[m]
		avg := a.sum / float64(a.count)
		target, hasGoal := lookupGoal(m)
		status := ""
		if hasGoal {
			if a.sum >= target {
				status = "  goal met"
			} else {
				pct := int((a.sum / target) * 100)
				status = fmt.Sprintf("  %d%% of goal", pct)
			}
		}
		fmt.Printf("%-14s %-8.2f %-10d %-12.2f%s\n", m, a.sum, a.count, avg, status)
	}
	return nil
}

func cmdStats() error {
	if len(store.Entries) == 0 {
		fmt.Println("no entries yet")
		return nil
	}

	type metricStats struct {
		count int
		sum   float64
		min   float64
		max   float64
		dates map[string]float64
	}
	stats := map[string]*metricStats{}

	for _, e := range store.Entries {
		if _, ok := stats[e.Metric]; !ok {
			stats[e.Metric] = &metricStats{
				min:   e.Value,
				max:   e.Value,
				dates: map[string]float64{},
			}
		}
		s := stats[e.Metric]
		s.count++
		s.sum += e.Value
		if e.Value < s.min {
			s.min = e.Value
		}
		if e.Value > s.max {
			s.max = e.Value
		}
		s.dates[e.Date] += e.Value
	}

	metrics := make([]string, 0, len(stats))
	for m := range stats {
		metrics = append(metrics, m)
	}
	sort.Strings(metrics)

	fmt.Printf("%-14s %-6s %-10s %-10s %-10s %-10s %-10s %-10s\n",
		"METRIC", "N", "TOTAL", "AVG", "MIN", "MAX", "STREAK", "BEST DAY")
	fmt.Println(strings.Repeat("-", 90))
	for _, m := range metrics {
		s := stats[m]
		avg := s.sum / float64(s.count)
		streak := bestStreak(s.dates)
		best := bestDay(s.dates)
		fmt.Printf("%-14s %-6d %-10.2f %-10.2f %-10.2f %-10.2f %-10d %-10s\n",
			m, s.count, s.sum, avg, s.min, s.max, streak, best)
	}
	return nil
}

func bestStreak(dailyTotals map[string]float64) int {
	if len(dailyTotals) == 0 {
		return 0
	}
	dates := make([]time.Time, 0, len(dailyTotals))
	for d := range dailyTotals {
		t, err := parseDate(d)
		if err == nil {
			dates = append(dates, t)
		}
	}
	sort.Slice(dates, func(i, j int) bool { return dates[i].Before(dates[j]) })

	best, cur := 0, 0
	var prev time.Time
	for _, d := range dates {
		if !prev.IsZero() && d.Sub(prev) == 24*time.Hour {
			cur++
		} else {
			cur = 1
		}
		if cur > best {
			best = cur
		}
		prev = d
	}
	return best
}

func bestDay(dailyTotals map[string]float64) string {
	bestDate := ""
	bestVal := -1.0
	for d, v := range dailyTotals {
		if v > bestVal {
			bestVal = v
			bestDate = d
		}
	}
	if bestDate == "" {
		return "-"
	}
	return fmt.Sprintf("%s (%.0f)", bestDate, bestVal)
}

func lookupGoal(metric string) (float64, bool) {
	for _, g := range store.Goals {
		if g.Metric == metric {
			return g.Target, true
		}
	}
	return 0, false
}

func cmdGoal(args []string) error {
	if len(args) == 0 {
		if len(store.Goals) == 0 {
			fmt.Println("no goals set")
			return nil
		}
		fmt.Printf("%-14s %s\n", "METRIC", "TARGET")
		fmt.Println(strings.Repeat("-", 30))
		for _, g := range store.Goals {
			fmt.Printf("%-14s %.2f\n", g.Metric, g.Target)
		}
		return nil
	}
	if len(args) < 2 {
		return errors.New("usage: perf goal <metric> <target>  (or just `perf goal` to list)")
	}
	metric := strings.ToLower(args[0])
	target, err := strconv.ParseFloat(args[1], 64)
	if err != nil {
		return fmt.Errorf("invalid target: %w", err)
	}
	found := false
	for i, g := range store.Goals {
		if g.Metric == metric {
			store.Goals[i].Target = target
			found = true
			break
		}
	}
	if !found {
		store.Goals = append(store.Goals, Goal{Metric: metric, Target: target})
	}
	if err := save(); err != nil {
		return err
	}
	fmt.Printf("goal set: %s >= %.2f per day\n", metric, target)
	return nil
}

func cmdDelete(args []string) error {
	if len(args) == 0 {
		return errors.New("usage: perf delete <id>")
	}
	id, err := strconv.ParseInt(args[0], 10, 64)
	if err != nil {
		return fmt.Errorf("invalid id: %w", err)
	}
	idx := -1
	for i, e := range store.Entries {
		if e.ID == id {
			idx = i
			break
		}
	}
	if idx < 0 {
		return fmt.Errorf("entry #%d not found", id)
	}
	store.Entries = append(store.Entries[:idx], store.Entries[idx+1:]...)
	if err := save(); err != nil {
		return err
	}
	fmt.Printf("deleted entry #%d\n", id)
	return nil
}

func cmdPath() error {
	p, err := dataPath()
	if err != nil {
		return err
	}
	fmt.Println(p)
	return nil
}

func usage() {
	fmt.Println(`perf - personal performance tracker

Usage:
  perf log <metric> <value> [--note "..."] [--date YYYY-MM-DD]
  perf list [--metric <name>] [--limit N]
  perf today
  perf week
  perf stats
  perf goal [<metric> <target>]
  perf delete <id>
  perf path

Examples:
  perf log focus 6 --note "deep work block"
  perf log tasks 12
  perf goal focus 8
  perf today
  perf stats`)
}

func main() {
	if err := load(); err != nil {
		fmt.Fprintf(os.Stderr, "load error: %v\n", err)
		os.Exit(1)
	}

	args := os.Args[1:]
	if len(args) == 0 {
		usage()
		return
	}

	var err error
	switch args[0] {
	case "log":
		err = cmdLog(args[1:])
	case "list", "ls":
		err = cmdList(args[1:])
	case "today":
		err = cmdToday()
	case "week":
		err = cmdWeek()
	case "stats":
		err = cmdStats()
	case "goal":
		err = cmdGoal(args[1:])
	case "delete", "rm":
		err = cmdDelete(args[1:])
	case "path":
		err = cmdPath()
	case "help", "-h", "--help":
		usage()
	default:
		usage()
		os.Exit(1)
	}

	if err != nil {
		fmt.Fprintf(os.Stderr, "error: %v\n", err)
		os.Exit(1)
	}
}
