package main

import (
	"github.com/hanbaowang/LogViewer/src/service/crawler"
	"github.com/hanbaowang/LogViewer/src/service/server"
)

func main() {
	crawler.Run()
	server.Serve()
}
