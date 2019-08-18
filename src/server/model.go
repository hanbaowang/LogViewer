package main

// LogRequest Log Request
type LogRequest struct {
	Service   string `json:"service"`
	Log       string `json:"log"`
	StartTime string `json:"start_time"`
	EndTime   string `json:"end_time"`
	Contain   string `json:"contain"`
}

// Config Config
type Config struct {
	RefreshTime string `json:"refresh_time"`
}

// Record one record in log
type Record struct {
	Timestamp string `json:"timestamp"`
	Level     string `json:"level"`
	Content   string `json:"content"`
}

// LogInfo log info
type LogInfo struct {
	Name string `json:"log_name"`
	Path string `json:"log_path"`
}

// Service service info
type Service struct {
	Name string    `json:"name"`
	Logs []LogInfo `json:"logs"`
}
