package post

import (
	"bytes"
	"compress/flate"
	"encoding/base64"
)

func (s *Svg) Encode(element string) {
	base, _ := base64.StdEncoding.DecodeString(element)
	var enc bytes.Buffer
	w, _ := flate.NewWriter(&enc, flate.BestCompression)
	w.Write(base)
	w.Close()
	s.EncSvg = base64.StdEncoding.EncodeToString(enc.Bytes())
}