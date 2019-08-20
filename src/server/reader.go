package main

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"
	"time"
)

// LogReader Log Reader
type LogReader interface {
	ReadLog() []*Record
}

// ConfigReader Config Reader
type ConfigReader interface {
	ReadConfig() *Config
}

// ServiceReader Service Reader
type ServiceReader interface {
	ReadService() *Service
}

// FileReader File Reader
type FileReader struct {
	fileName string
}

// ReadLog Read Log
func (fr *FileReader) ReadLog() (records []*Record) {

	f, _ := os.Open(fr.fileName)
	defer f.Close()
	r := bufio.NewReader(f)
	for {
		record, err := readLine(r)
		if err != nil {
			break
		}
		records = append(records, recordify(record))
	}

	return records
}

// ReadConfig Read Config
func (fr *FileReader) ReadConfig() *Config {
	configByte, err := ioutil.ReadFile(fr.fileName)
	if err != nil {
		log.Print(err)
	}

	config := new(Config)
	json.Unmarshal(configByte, config)
	if err != nil {
		log.Print("Unmarshal config err, ", err)
	}

	return config
}

// ReadServices Read Services
func (fr *FileReader) ReadServices() []*Service {
	serviceByte, err := ioutil.ReadFile(fr.fileName)
	if err != nil {
		log.Print(err)
	}

	var services []*Service
	json.Unmarshal(serviceByte, &services)
	if err != nil {
		log.Print("Unmarshal config err, ", err)
	}

	return services
}

func readLine(r *bufio.Reader) (string, error) {
	line, isprefix, err := r.ReadLine()
	for isprefix && err == nil {
		var bs []byte
		bs, isprefix, err = r.ReadLine()
		line = append(line, bs...)
	}
	return string(line), err
}

func recordify(line string) *Record {
	lineSlice := strings.SplitN(line, " ", 4)
	date, err := time.Parse("2006-01-02 15:04:05", lineSlice[0]+" "+lineSlice[1])
	if err != nil {
		log.Print("parse time error, ", err)
		return nil
	}
	return &Record{
		Timestamp: strconv.FormatInt(date.Unix()*1000, 10),
		Level:     lineSlice[2],
		Content:   strings.Trim(lineSlice[3], " "),
	}
}
