package server

import (
	"log"
	"net/http"

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
	req := new(LogRequest)
	err = c.Bind(req)
	if err != nil {
		log.Print(err)
		return c.JSON(http.StatusBadRequest, err)
	}

	fileName := req.Service
	if req.Log != "" {
		fileName += req.Log
	}
	reader := &FileReader{
		FileName: fileName,
	}

	rs := reader.ReadLog()
	return c.JSON(http.StatusOK, rs)
}

func getServices(c echo.Context) (err error) {
	reader := &FileReader{
		FileName: "../../demo/service.json",
	}

	services := reader.ReadServices()

	return c.JSON(http.StatusOK, services)
}

func getConfig(c echo.Context) (err error) {
	reader := &FileReader{
		FileName: "../../demo/config.json",
	}
	return c.JSON(http.StatusOK, reader.ReadConfig())
}

func updateConfig(c echo.Context) (err error) {
	cfg := new(Config)
	err = c.Bind(cfg)

	if err != nil {
		log.Print("config params err, ", err)
		return c.JSON(http.StatusBadRequest, err)
	}

	fw := new(FileWriter)
	fw.FileName = "../../demo/config.json"
	err = fw.WriteJSON(cfg)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}
	return c.JSON(http.StatusOK, fw)
}
