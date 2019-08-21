package server

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

// LogWriter Log Writer
type LogWriter interface {
	Write()
}

// ConfigWriter File Writer
type ConfigWriter struct {
	fileName string
}

func (cw *ConfigWriter) Write(cfg *Config) (err error) {

	configByte, err := json.Marshal(cfg)
	if err != nil {
		log.Fatal("config marshal failed, ", err)
		return err
	}

	err = ioutil.WriteFile(cw.fileName, configByte, 0644)
	if err != nil {
		log.Fatal("write file failed, ", err)
		return err
	}

	return nil
}
