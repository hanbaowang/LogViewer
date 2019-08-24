package server

import (
	"log"
	"net/http"

	"github.com/hanbaowang/LogViewer/src/service/crawler"
	"github.com/hanbaowang/LogViewer/src/service/io"
	"github.com/hanbaowang/LogViewer/src/service/model"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// Serve serve the server
func Serve() {
	e := echo.New()

	e.Use(middleware.Logger())
	e.Use(middleware.Recover())

	e.GET("/log", getLog)
	e.GET("/services", getServices)
	e.GET("/config", getConfig)
	e.POST("/config", updateConfig)

	e.Logger.Fatal(e.Start(":1323"))
}

func getLog(c echo.Context) (err error) {
	req := new(model.LogRequest)
	err = c.Bind(req)
	if err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, err)
	}

	fileName := req.Service
	if req.Log != "" {
		fileName += req.Log
	}
	reader := &io.FileReader{
		FileName: fileName,
	}

	rs := reader.ReadLog()
	return c.JSON(http.StatusOK, rs)
}

func getServices(c echo.Context) (err error) {
	reader := &io.FileReader{
		FileName: "../../demo/services.json",
	}

	services, err := reader.ReadServices()
	if services == nil {
		fr := &io.FileReader{
			FileName: "../../demo/servers.json",
		}
		servers, err := fr.ReadServer()
		if err != nil {
			log.Print("ReadServer err, ", err)
		}
		services = crawler.CrawlServices(servers)
	}

	return c.JSON(http.StatusOK, services)
}

func getConfig(c echo.Context) (err error) {
	reader := &io.FileReader{
		FileName: "../../demo/config.json",
	}
	return c.JSON(http.StatusOK, reader.ReadConfig())
}

func updateConfig(c echo.Context) (err error) {
	cfg := new(model.Config)
	err = c.Bind(cfg)

	if err != nil {
		log.Print("config params err, ", err)
		return c.JSON(http.StatusBadRequest, err)
	}

	fw := &io.FileWriter{
		FileName: "../../demo/config.json",
	}
	err = fw.WriteJSON(cfg)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, fw)
}
