package model

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

// File log info
type File struct {
	Name string `json:"log_name"`
	Path string `json:"log_path"`
}

// Service service info
type Service struct {
	Name  string `json:"name"`
	Files []File `json:"logs"`
}

// Servers server config
type Servers struct {
	Servers []Server `json:"servers"`
	Base    string   `json:"base"`
}

// Server server info
type Server struct {
	IP       string `json:"ip"`
	Port     string `json:"port"`
	User     string `json:"user"`
	Password string `json:"password"`
	Role     string `json:"role"`
	Active   bool   `json:"active"`
}
