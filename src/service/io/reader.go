package io

import (
	"bufio"
	"encoding/json"
	"io/ioutil"
	"log"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/hanbaowang/LogViewer/src/service/model"
)

// LogReader Log Reader
type LogReader interface {
	ReadLog() []*model.Record
}

// ConfigReader Config Reader
type ConfigReader interface {
	ReadConfig() *model.Config
}

// ServiceReader Service Reader
type ServiceReader interface {
	ReadService() []*model.Service
}

// SrvReader Server Reader
type SrvReader interface {
	ReadServer() []*model.Server
}

// FileReader File Reader
type FileReader struct {
	FileName string
}

// ReadLog Read Log
func (fr *FileReader) ReadLog() (records []*model.Record) {

	f, _ := os.Open(fr.FileName)
	r := bufio.NewReader(f)

	for {
		record, err := readLine(r)
		if err != nil {
			break
		}
		records = append(records, recordify(record))
	}

	f.Close()
	return records
}

// ReadConfig Read Config
func (fr *FileReader) ReadConfig() *model.Config {
	configByte, err := ioutil.ReadFile(fr.FileName)
	if err != nil {
		log.Print(err)
	}

	config := new(model.Config)
	json.Unmarshal(configByte, config)
	if err != nil {
		log.Print("Unmarshal config err, ", err)
	}

	return config
}

// ReadServices Read Services
func (fr *FileReader) ReadServices() (services []*model.Service, err error) {
	serviceByte, err := ioutil.ReadFile(fr.FileName)
	if err != nil {
		log.Print(err)
		return nil, err
	}

	json.Unmarshal(serviceByte, &services)
	if err != nil {
		log.Print("Unmarshal services err, ", err)
		return nil, err
	}

	return services, nil
}

// ReadServer Read Server
func (fr *FileReader) ReadServer() (servers model.Servers, err error) {
	serviceByte, err := ioutil.ReadFile(fr.FileName)
	if err != nil {
		log.Print(err)
		return servers, err
	}

	json.Unmarshal(serviceByte, &servers)
	if err != nil {
		log.Print("Unmarshal server err, ", err)
	}

	return servers, err
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

func recordify(line string) *model.Record {
	lineSlice := strings.SplitN(line, " ", 4)
	lineSlice[1] = strings.Replace(lineSlice[1], ",", ".", -1)
	date, err := time.Parse("2006-01-02 15:04:05.000", lineSlice[0]+" "+lineSlice[1])
	if err != nil {
		log.Print("parse time error, ", err)
		return nil
	}
	return &model.Record{
		Timestamp: strconv.FormatInt(date.UnixNano()/1000000, 10),
		Level:     lineSlice[2],
		Content:   strings.Trim(lineSlice[3], " "),
	}
}
