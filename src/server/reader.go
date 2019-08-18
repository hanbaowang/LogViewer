package main

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"strconv"
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
	log.Print(line)
	return &Record{
		Timestamp: strconv.FormatInt(time.Now().UnixNano(), 10),
		Level:     "WARN",
		Content:   "test",
	}
}
