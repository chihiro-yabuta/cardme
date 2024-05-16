package post

import (
	"bytes"
	"compress/flate"
	"encoding/base64"
)

func (d *Data) encode(element string) {
	base, _ := base64.StdEncoding.DecodeString(element)
	var enc bytes.Buffer
	w, _ := flate.NewWriter(&enc, flate.BestCompression)
	w.Write(base)
	w.Close()
	d.svg = base64.StdEncoding.EncodeToString(enc.Bytes())
}