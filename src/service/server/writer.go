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

// FileWriter File Writer
type FileWriter struct {
	FileName string
}

// WriteJSON Write Config
func (fw *FileWriter) WriteJSON(v interface{}) (err error) {

	vBytes, err := json.Marshal(v)
	if err != nil {
		log.Fatal("config marshal failed, ", err)
		return err
	}

	err = ioutil.WriteFile(fw.FileName, vBytes, 0644)
	if err != nil {
		log.Fatal("write file failed, ", err)
		return err
	}

	return nil
}
