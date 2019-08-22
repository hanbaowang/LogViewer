package main

import (
	"github.com/hanbaowang/LogViewer/src/service/crawler"
	"github.com/hanbaowang/LogViewer/src/service/server"
)

func main() {
	fr := &server.FileReader{
		FileName: "../../demo/server.json",
	}
	crawler.Run(fr.ReadServer())
	server.Serve()
}
