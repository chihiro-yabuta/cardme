package get

import (
	"bytes"
	"compress/flate"
	"encoding/base64"
)

func (d *Data) decode() {
	base, _ := base64.StdEncoding.DecodeString(d.svg)
	var dec bytes.Buffer
	r := flate.NewReader(bytes.NewReader(base))
	dec.ReadFrom(r)
	r.Close()
	d.svg = dec.String()
}